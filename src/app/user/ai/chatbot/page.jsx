
"use client";
import React, { useEffect, useState } from 'react';
import { Plus, Settings2, ArrowUp } from 'lucide-react'; // Using lucide-react for icons

import { motion } from "framer-motion";
import api from '@/lib/Api';

function ThinkingLoader() {
  return (
    <div className="flex flex-col items-start space-y-2 p-4">
      <div className="flex items-center space-x-2">
        {/* The Animated Icon */}
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </div>
        <span className="text-xs text-gray-500 font-medium tracking-tight">Fifi is thinking...</span>
      </div>
      
      {/* Subtle Skeleton Bar */}
      <motion.div 
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="h-3 w-48 bg-[#262626] rounded-full"
      />
    </div>
  );
}

export default function ChatInterface() {
    const [Chat,setChat]=useState([])
    const [loading,setloading]=useState(true)
    const [message,setmessage]=useState("")

    const handlechat=async()=>{
        try {
            const m=message
            setloading(true)
            setChat([...Chat,{id:"me",message:message}])
            setmessage("")
            console.log(m)
            const res = await api.post("/ai/chat", {message:m});
            setChat([...Chat,{id:"ai",message:res.data.message}])
        } catch (error) {
            console.error("API error:", err);
        }finally {
        setloading(false);
      }
    }

    useEffect(()=>{
         const sendQuiz = async () => {
      try {
        setloading(true);
        const stored = localStorage.getItem("aichat");
        if (!stored) {
          route.push("/");
          return;
        }
        const data = JSON.parse(stored);
        setChat(data)
        const res = await api.post("/ai/chat", {message:data[0].message});
        console.log(res.data)
        setChat([...Chat,{id:"ai",message:res.data.message}])
        console.log(Chat)
      } catch (err) {
        console.error("API error:", err);
      } finally {
        setloading(false);
      }
    };
    sendQuiz();
    },[])

  return (
    <div className="flex flex-col h-screen bg-[#0d0d0d] text-gray-200 font-sans p-4">
      {/* Top Header/Brand */}
      <div className="p-4 text-xs font-semibold text-gray-500 tracking-widest">
        FIFI
      </div>

      {/* Message Area */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full space-y-8">
        {/* User Message Bubble */}
        {Chat.map((d)=>{
         if(d.id==="me"){
            <div className='w-full h-auto flex justify-end '>
        <div className="bg-[#262626] px-4 py-2 rounded-2xl text-sm min-w-auto max-w-full">
          {d.message}
        </div>
        </div>
         }
         if(d.id==="ai"){
            <div className='w-full h-auto flex justify-start '>
        <div className="bg-[#262626] px-4 py-2 rounded-2xl text-sm min-w-auto max-w-full">
         {d.message}
        </div>
        </div>
         }
        })}

        {/* AI Response Text */}
        {loading?<div className='w-full h-auto flex justify-start '>
        <div className="bg-[#262626] px-4 py-2 rounded-2xl text-sm min-w-auto max-w-full">
          <ThinkingLoader/>
        </div>
        </div>:null}
      </div>

      {/* Input Section */}
      <div className="max-w-3xl mx-auto w-full pb-10">
        <div className="relative bg-[#1a1a1a] rounded-3xl border border-[#2d2d2d] focus-within:border-[#404040] transition-all p-2">
          {/* Text Input */}
          <textarea
            rows={1}
            placeholder="Ask Fifi"
            value={message}
            onChange={(e)=>setmessage(e.target.value)}
            className="w-full bg-transparent border-none focus:ring-0 text-gray-100 placeholder-gray-500 py-3 px-4 resize-none min-h-[56px] outline-none"
          />

          {/* Bottom Toolbar */}
          <div className="flex items-center justify-between px-2 pb-1">
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-[#2d2d2d] rounded-full transition text-gray-400">
                <Plus size={18} />
              </button>
              <button className="flex items-center gap-1.5 p-2 hover:bg-[#2d2d2d] rounded-lg transition text-gray-400 text-xs font-medium">
                <Settings2 size={16} />
                Tools
                <span className="text-[10px] ml-0.5 opacity-50">▼</span>
              </button>
            </div>

            {/* Send Button */}
            <button className="bg-white p-2 rounded-full text-black hover:bg-gray-200 transition" disabled={loading} onClick={()=>handlechat()} >
              <ArrowUp size={20} />
            </button>
          </div>

          {/* Tiny Robot Icon (as seen in screenshot) */}
          <div className="absolute right-4 top-4 text-emerald-500 opacity-80">
            <div className="w-5 h-5 bg-emerald-900/30 rounded flex items-center justify-center border border-emerald-500/30">
              <div className="w-2 h-2 bg-emerald-400 rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}