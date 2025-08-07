// app/api/gemini/route.js (caso use app router do Next.js)

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent";

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json({ 
        error: 'Parâmetro "message" é obrigatório.' 
      }, { status: 400 });
    }

    const prompt = `Você é um adicto em recuperação com anos de sobriedade e também um terapeuta experiente. Seu papel é acolher e orientar pessoas em crise, oferecendo uma mensagem de força, fé e esperança. Responda com empatia, utilizando trechos relevantes da literatura dos 12 Passos de AA (Alcoólicos Anônimos) e NA (Narcóticos Anônimos) que estejam relacionados diretamente com a dificuldade compartilhada pelo usuário. ${message} , Sua resposta deve ser inspiradora não precisa ser longa e nem muito curta  uma resposta assertiva e com apatia, respeitosa e alinhada com os princípios espirituais da recuperação.
    
    o texto precisa ser melhor formatado sem markdown e caracteres especiais, apenas texto simples, sem formatação, e sem emojis
    `;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'API key não configurada.' 
      }, { status: 500 });
    }

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!response.ok) {
      throw new Error(`Erro na API do Gemini: ${response.status}`);
    }

    const result = await response.json();
    let text = result?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Limpeza básica do texto
    text = text.replace(/^\s*(>\s*)?/gm, '').trim();

    return NextResponse.json({ 
      coaching: text
    });

  } catch (error) {
    console.error('Erro na API do coach:', error);
    return NextResponse.json({ 
      error: 'Falha ao gerar o coaching pessoal.' 
    }, { status: 500 });
  }
}
