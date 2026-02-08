"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Rocket, CheckCircle2 } from "lucide-react";
import { BarChart3 } from 'lucide-react'; // Optional: adds a thematic icon
import api from "@/lib/Api";

function ResultLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] bg-[#F8F9F5] font-sans animate-in fade-in duration-700">
      <div className="relative flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-indigo-50 border-t-indigo-600 rounded-full animate-spin"></div>
        <div className="absolute">
          <BarChart3 className="w-8 h-8 text-indigo-600 animate-pulse" />
        </div>
      </div>
      <h2 className="mt-10 text-3xl font-bold text-gray-900 tracking-tight">
        Analyzing Performance
      </h2>
      <p className="mt-3 text-gray-500 text-lg text-center max-w-xs leading-relaxed">
        Our AI is identifying your weak areas and crafting actionable advice...
      </p>
      <div className="mt-8 flex gap-2">
        <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 bg-indigo-200 rounded-full animate-bounce"></span>
      </div>
    </div>
  );
}

export default function QuizResults() {
    const [loading, setloading] = useState(true)
  const [data,setdata]=useState({})
  const { summary, weakAreas, actionableAdvice } = data
  

useEffect(() => {
    const sendQuiz = async () => {
      try {
        setloading(true);
        const stored = localStorage.getItem("quizresult");
        if (!stored) {
          route.push("/");
          return;
        }
        const data = JSON.parse(stored);
        const res = await api.post("/ai/evaluate", data);
        console.log(res.data)
        setdata(res.data)
      } catch (err) {
        console.error("API error:", err);
      } finally {
        setloading(false);
      }
    };

    sendQuiz();
  }, []);
  
  let stats=[]
  if(!loading){
     stats = [
    { label: "FINAL SCORE", value: `${summary.score}/${summary.totalQuestions}`, color: "text-indigo-600" },
    { label: "ACCURACY", value: `${summary.percentage.toFixed(0)}%`, color: "text-emerald-500" },
    { label: "WRONG ANSWERS", value: summary.wrongAnswers, color: "text-red-500" },
  ];
  }
 

  if(loading) return <ResultLoader/>

  return (
    <div className="min-h-screen bg-[#F8F9F5] p-4 md:p-12 font-sans flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white rounded-[40px] shadow-sm border-t-[6px] border-indigo-600 p-8 md:p-12 mb-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Quiz Results</h1>
          <p className="text-gray-500 font-medium">Performance analysis for your recent session</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-gray-50/50 rounded-3xl p-10 text-center border border-gray-50">
              <h2 className={`text-5xl font-bold mb-2 ${stat.color}`}>{stat.value}</h2>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <AlertCircle className="text-red-500" size={24} />
            <h3 className="text-xl font-bold text-red-500">Areas for Improvement</h3>
          </div>
          <div className="space-y-4">
            {weakAreas.map((area, idx) => (
              <div key={idx} className="bg-red-50/50 rounded-2xl p-5 border border-red-50">
                <p className="font-bold text-gray-800 mb-1">{area.subTopic}</p>
                <p className="text-sm text-red-600 leading-relaxed">{area.issue}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <Rocket className="text-emerald-500" size={24} />
            <h3 className="text-xl font-bold text-emerald-500">Next Steps to Improve</h3>
          </div>
          <div className="space-y-4">
            {actionableAdvice.map((advice, idx) => (
              <div key={idx} className="bg-emerald-50/50 rounded-2xl p-5 flex items-start gap-4 border border-emerald-50">
                <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                <span className="font-semibold text-gray-700 leading-tight">{advice}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Footer Action --- */}
      <button className="w-full max-w-5xl bg-[#121926] text-white py-5 rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all shadow-xl shadow-gray-200">
        Return to Dashboard
      </button>
    </div>
  );
}