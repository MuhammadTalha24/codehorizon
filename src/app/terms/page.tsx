"use client";

import React from "react";
import Link from "next/link";
import { Blocks } from "lucide-react";

const TermsAndConditions = () => {
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
    <main className="min-h-screen text-white p-6 mt-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
        <p className="mb-4">
          By accessing and using <strong>DevFlow</strong>, you agree to the following terms and conditions. Please read them carefully.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of the Service</h2>
        <p className="mb-4">
          You must be at least 13 years old to use our platform. You agree not to misuse or disrupt the service.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Intellectual Property</h2>
        <p className="mb-4">
          All content, code, and assets provided on DevFlow are protected by copyright and may not be copied or reused without permission.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. User Content</h2>
        <p className="mb-4">
          You retain rights to your code and content. However, by submitting content to DevFlow, you grant us permission to display and store it.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Termination</h2>
        <p className="mb-4">
          We reserve the right to suspend or terminate access to users who violate our terms or abuse the platform.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Changes to Terms</h2>
        <p className="mb-4">
          We may update these terms at any time. Continued use of the service means you accept any new changes.
        </p>

        
      </div>
    </main>
    </>
    
  );
};

export default TermsAndConditions;
