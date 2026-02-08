"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Settings2, 
  ArrowUp, 
  Calendar, 
  Map, 
  Search, 
  PencilLine, 
  BrainCircuit 
} from "lucide-react";

export default function ChatBotPage() {
  const [inputValue, setInputValue] = useState("");

  const quickActions = [
    { icon: <Calendar size={14} className="text-red-400" />, label: "Schedule planner" },
    { icon: <Map size={14} className="text-blue-400" />, label: "Roadmap" },
    { icon: <Search size={14} className="text-cyan-400" />, label: "Deep dive" },
    { icon: <PencilLine size={14} className="text-amber-400" />, label: "Quiz Gen" },
    { icon: <BrainCircuit size={14} className="text-pink-400" />, label: "Flashcards gen" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-6 font-sans">
      
      {/* --- Greeting Section --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl font-medium mb-2">
          Hi <span className="text-blue-400">Mohamed</span>
        </h2>
        <h1 className="text-5xl font-bold tracking-tight text-white/90">
          Where should we start?
        </h1>
      </motion.div>

      {/* --- Chat Input Container --- */}
      <div className="w-full max-w-3xl">
        <div className="bg-[#171717] rounded-[28px] p-4 border border-white/5 shadow-2xl">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask Fifi"
            className="w-full bg-transparent resize-none outline-none px-4 py-2 text-lg text-white placeholder-gray-500 min-h-[60px]"
          />
          
          <div className="flex items-center justify-between mt-4 px-2">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400">
                <Plus size={20} />
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/5 rounded-full transition-colors text-gray-400 text-sm font-medium">
                <Settings2 size={18} />
                Tools
                <span className="text-[10px] ml-1 opacity-50">▼</span>
              </button>
            </div>

            <button 
              disabled={!inputValue.trim()}
              className={`p-3 rounded-full transition-all ${
                inputValue.trim() 
                  ? "bg-white text-black" 
                  : "bg-[#2A2A2A] text-gray-500 cursor-not-allowed"
              }`}
            >
              <ArrowUp size={20} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* --- Quick Action Pills --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mt-8"
        >
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              className="flex items-center gap-2.5 px-4 py-2 bg-[#1A1A1A] border border-white/5 rounded-full hover:bg-[#252525] hover:border-white/10 transition-all text-xs font-medium text-gray-300"
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* --- Sidebar Branding (Optional - top left as per screenshot) --- */}
      <div className="fixed top-6 left-8">
        <span className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase">Fifi</span>
      </div>
    </div>
  );
}