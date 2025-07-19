"use client";

import React from "react";
import Link from "next/link";
import { Blocks } from "lucide-react";

const AboutPage = () => {
  return (
    <>
    <header className="w-full bg-gray-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-center">
         <Link href="/" className="flex items-center gap-3 group relative">
            {/* Logo hover effect */}

            <div
              className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 
                group-hover:opacity-100 transition-all duration-500 blur-xl"
            />

            {/* Logo */}
            <div
              className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1
              ring-white/10 group-hover:ring-white/20 transition-all"
            >
              <Blocks className="size-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
            </div>

            <div className="flex flex-col">
              <span className="block text-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
                CodeHorizon
              </span>
              <span className="block text-xs text-blue-400/60 font-medium">
                Interactive Code Editor
              </span>
            </div>
          </Link>
      </div>
    </header>
       <main className="min-h-screen p-6 mt-5 text-gray-800">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">About CodeHorizon Editor</h1>
        <p className="text-lg mb-6 text-white">
          <strong>DevFlow</strong> is an intelligent and fast online code editor designed for modern developers. Whether you're prototyping, learning, or testing, DevFlow helps you write cleaner code with the power of AI suggestions — right inside your browser.
        </p>

        <div className="text-left bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">🚀 Key Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Multi-language Support:</strong> Write code in JavaScript, Python, TypeScript, C++, and more.
            </li>
            <li>
              <strong>AI-Powered Suggestions:</strong> Get inline code completions and smart hints powered by CodeGeeX.
            </li>
            <li>
              <strong>Built for Speed:</strong> Minimal UI with Monaco Editor — the same editor that powers VS Code.
            </li>
            <li>
              <strong>Real-Time Sharing:</strong> Share code snippets and collaborate with others instantly.
            </li>
            <li>
              <strong>Theme Customization:</strong> Switch between light and dark themes easily.
            </li>
          </ul>
        </div>

   
      </div>
    </main>
    </>
 
  );
};

export default AboutPage;
