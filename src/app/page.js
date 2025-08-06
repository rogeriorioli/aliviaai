"use client";
import Image from "next/image";
import React, { useState } from 'react';
import { Send, Heart, Shield, Sparkles } from 'lucide-react';

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch("/api/terapeuta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });
      const data = await res.json();
      if (data.coaching) {
        setAiResponse(data.coaching);
         setTimeout(() => {
          const anchor = document.getElementById("anchor");
          console.log("Scrolling to anchor:", anchor);
          if (anchor) {
            anchor.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        setAiResponse(data.error || "Erro ao buscar orientação.");
      }
    } catch (err) {
      setAiResponse("Erro de conexão com o servidor.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-blue-100">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="AliviaAí Logo"
                width={160}
                height={160}/>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Seção Descritiva */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Seu Companheiro na Jornada de Recuperação
            </h2>
          </div>
          
          <div className="prose prose-lg max-w-none text-center text-gray-700">
            <p className="mb-4">
              O <strong>AliviaAí</strong> é um agente de inteligência artificial especializado em apoio à recuperação, 
              baseado na experiência de anos de sobriedade e na sabedoria dos programas de 12 passos.
            </p>
            <p className="mb-4">
              Compartilhe suas dificuldades, medos ou momentos de fraqueza. Receba mensagens de força, 
              fé e esperança, junto com trechos inspiradores da literatura de AA e NA.
            </p>
            <p className="text-blue-600 font-semibold">
              Lembre-se: você não está sozinho nessa jornada. Um dia de cada vez. 🙏
            </p>
          </div>
        </div>

        {/* Interface de Interação */}
        <div className="flex flex-wrap justify-center">
          {/* Input Area */}
          <div className="bg-white/70 w-full mb-8 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Send className="w-5 h-5 mr-2 text-blue-600" />
              Compartilhe sua dificuldade
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
                  O que você está enfrentando hoje?
                </label>
                <textarea
                  id="difficulty"
                  rows={6}
                  className="w-full px-4 py-3 border text-gray-800 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                  placeholder="Descreva o que está sentindo, suas preocupações, medos ou dificuldades do momento. Seja honesto consigo mesmo..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              <button
                type="submit"
                disabled={!userInput.trim() || isLoading}
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Buscando orientação...
                  </span>
                ) : (
                  'Buscar Orientação e Força'
                )}
              </button>
            </form>
          </div>

          {/* Output Area */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100" id="anchor" >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-purple-600" />
              Mensagem de Força e Esperança
            </h3>
            
            <div className="min-h-[300px]">
              {aiResponse ? (
                <div className="prose prose-sm max-w-none">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border-l-4 border-blue-400">
                    <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                      {aiResponse}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Heart className="w-8 h-8 text-blue-400" />
                    </div>
                    <p className="text-lg font-medium">Aguardando sua mensagem</p>
                    <p className="text-sm">Compartilhe o que está em seu coração</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer com Mensagem Inspiradora */}
        <div className="mt-8 text-center">
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-blue-100">
            <p className="text-gray-600 text-sm font-medium">
              "A coragem não é a ausência do medo, mas a decisão de que algo é mais importante que o medo."
            </p>
            <p className="text-blue-600 text-xs mt-2">
              - Literatura dos 12 Passos
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
