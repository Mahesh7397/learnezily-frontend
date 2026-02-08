 "use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Clock, 
  Target, 
  CheckCircle2, 
  BookOpen, 
  Terminal, 
  AlertCircle,
  ArrowRight
} from "lucide-react";

import { Map, Compass } from 'lucide-react';
import api from "@/lib/Api";

function RoadmapLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] bg-[#F8F9F5] font-sans">
      {/* Icon & Spinner Container */}
      <div className="relative mb-10">
        {/* Outer Spinning Ring */}
        <div className="w-24 h-24 border-4 border-indigo-50 border-t-indigo-600 rounded-full animate-spin"></div>
        
        {/* Inner Pulsing Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Map className="w-10 h-10 text-indigo-600 animate-pulse" />
        </div>
        
        {/* Decorative Floating Compass */}
        <div className="absolute -top-2 -right-2 bg-white p-2 rounded-xl shadow-lg animate-bounce">
          <Compass className="w-5 h-5 text-emerald-500" />
        </div>
      </div>

      {/* Main Text Content */}
      <div className="text-center max-w-sm px-6">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-3">
          Architecting Your Path
        </h2>
        <p className="text-gray-500 text-base leading-relaxed">
          AI is calculating your feasibility score and organizing your topics into a structured timeline...
        </p>
      </div>

      {/* Steps Progress Indicator */}
      <div className="mt-12 flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        <span className="flex items-center gap-2 text-indigo-600">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
            Analyzing Hours
        </span>
        <div className="w-8 h-px bg-gray-200"></div>
        <span>Mapping Topics</span>
        <div className="w-8 h-px bg-gray-200"></div>
        <span>Finalizing View</span>
      </div>
    </div>
  );
}

export default function Roadmap(){
    const [data,setdata]=useState({})
    const [loading,setloading]=useState(true)

     useEffect(() => {
    const sendQuiz = async () => {
      try {
        setloading(true);
        const stored = localStorage.getItem("roadmapdata");
        if (!stored) {
          route.push("/");
          return;
        }
        const data = JSON.parse(stored);
        const res = await api.post("/ai/roadmap", data);
        setdata(res.data);
        console.log(res.data)
      } catch (err) {
        console.error("API error:", err);
      } finally {
        setloading(false);
      }
    };

    sendQuiz();
  }, []);

  if (loading) {
    return <RoadmapLoader />;
  }

  // 2. Safety Check: If no data returned from API
  if (!data || !data.meta) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Failed to load roadmap. Please try again.</p>
      </div>
    );
  }

  // 3. Render View once data is safe
  return <RoadmapView data={data} />;
}

function RoadmapView({data}) {
    const { meta, roadmap, outcome } = data
    const { feasibility_analysis: feasibility } = meta
  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  return (
    <div className="min-h-screen bg-[#F8F9F5] p-6 md:p-12 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto">
        
        {/* --- Header & Feasibility Section --- */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              {meta.subject}
            </span>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>
          
          <h1 className="text-5xl font-extrabold tracking-tight capitalize mb-6">
            {meta.topic} <span className="text-gray-400 font-light underline decoration-indigo-200">Mastery Path</span>
          </h1>

          {/* Feasibility Card */}
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Feasibility Score</p>
              <div className="flex items-end gap-2">
                <span className="text-6xl font-black text-indigo-600 leading-none">{feasibility.score_0_to_100}</span>
                <span className="text-xl font-bold text-gray-300 mb-1">/ 100</span>
              </div>
              <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold ${
                feasibility.feasibility_level === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
              }`}>
                {feasibility.feasibility_level} Difficulty
              </div>
            </div>

            <div className="lg:col-span-2 bg-gray-50 rounded-3xl p-6 border border-gray-100 relative overflow-hidden">
               <AlertCircle className="absolute -right-4 -top-4 w-24 h-24 text-gray-100 -rotate-12" />
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">AI Analysis</p>
               <p className="text-sm text-gray-600 leading-relaxed relative z-10">
                 {feasibility.comment}
               </p>
               <div className="mt-4 flex gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Available</p>
                    <p className="text-sm font-bold text-indigo-600">{feasibility.total_hours_available} hrs</p>
                  </div>
                  <div className="w-px h-8 bg-gray-200"></div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Estimated</p>
                    <p className="text-sm font-bold text-gray-800">{feasibility.estimated_hours_needed} hrs</p>
                  </div>
               </div>
            </div>
          </div>
        </motion.header>

        {/* --- Roadmap Phases --- */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {roadmap.map((phase, idx) => (
            <motion.div key={idx} variants={item} className="relative">
              <div className="flex flex-col lg:flex-row gap-8">
                
                {/* Side Label */}
                <div className="lg:w-1/4">
                  <div className="sticky top-12">
                    <div className="bg-indigo-50 text-indigo-600 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl mb-4">
                      0{idx + 1}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2">
                      {phase.phase_name.split(':')[1] || phase.phase_name}
                    </h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      {phase.phase_name.split(':')[0]}
                    </p>
                  </div>
                </div>

                {/* Main Card */}
                <div className="lg:w-3/4 bg-white rounded-[40px] p-8 md:p-10 shadow-sm border border-gray-100">
                  <div className="flex items-start gap-4 mb-8 pb-8 border-b border-gray-50">
                    <Target className="text-indigo-600 mt-1 shrink-0" size={24} />
                    <div>
                      <h4 className="font-bold text-gray-800 uppercase text-[10px] tracking-widest mb-1">Phase Goal</h4>
                      <p className="text-gray-600 text-lg leading-snug">{phase.goal}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Topics List */}
                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-gray-800 text-sm mb-4">
                        <Terminal size={18} className="text-indigo-600" />
                        Key Topics
                      </h4>
                      <ul className="space-y-3">
                        {phase.topics.map((topic, i) => (
                          <li key={i} className="flex items-start gap-3 group">
                            <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                            <span className="text-sm text-gray-600 leading-tight">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Routine & Resources */}
                    <div className="space-y-8">
                      <div className="bg-[#121926] rounded-3xl p-6 text-white">
                        <h4 className="flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest mb-4 text-indigo-400">
                          <Clock size={14} />
                          Daily Routine
                        </h4>
                        <p className="text-sm text-gray-300 leading-relaxed font-medium italic">
                          "{phase.daily_routine}"
                        </p>
                      </div>

                      <div>
                        <h4 className="flex items-center gap-2 font-bold text-gray-800 text-sm mb-4">
                          <BookOpen size={18} className="text-indigo-600" />
                          Resources
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {phase.resources_needed.map((res, i) => (
                            <span key={i} className="bg-gray-100 text-gray-600 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-white hover:border-indigo-200 transition-colors">
                              {res}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- Final Outcome --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 bg-indigo-600 rounded-[40px] p-12 text-center text-white relative overflow-hidden"
        >
          <Shield className="absolute -bottom-10 -left-10 w-64 h-64 text-indigo-500 opacity-20 rotate-12" />
          <h2 className="text-3xl font-bold mb-4 relative z-10">Learning Outcome</h2>
          <p className="max-w-3xl mx-auto text-indigo-100 text-lg leading-relaxed relative z-10">
            {outcome}
          </p>
          <button className="mt-8 bg-white text-indigo-600 px-10 py-4 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-all flex items-center gap-2 mx-auto shadow-xl">
            Download Study Checklist <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}