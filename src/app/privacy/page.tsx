"use client";

import React from "react";
import Link from "next/link";
import { Blocks } from "lucide-react";

const PrivacyPolicy = () => {
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
    <main className="min-h-screen text-white p-6 mt-7">
        
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-white">Privacy Policy</h1>
        <p className="mb-4 text-white">
          At <strong>CodeHorizon</strong>, your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Basic account details (name, email address)</li>
          <li>Usage data and preferences</li>
          <li>IP address and device information</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside mb-4">
          <li>To provide and maintain the service</li>
          <li>To personalize your experience</li>
          <li>To improve our platform and tools</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
        <p className="mb-4">
          We use industry-standard security measures to protect your information. However, no method of transmission over the Internet is 100% secure.
        </p>

       

       
      </div>
    </main>
     </>
  );
};

export default PrivacyPolicy;
