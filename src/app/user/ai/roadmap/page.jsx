"use client";

import React, { useState } from "react";
import { Search, BookOpen, Calendar, Clock, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RoadmapForm() {
  const [formData, setFormData] = useState({
    Subject_Name: "",
    Topic_Name: "",
    Total_Timeframe: "1 month",
    Daily_Availability: "2 hours",
  });

  const route=useRouter()

  const timeframes = ["1 month", "2 month", "3 month", "6 month"];
  const availability = ["2 hours", "4 hours", "6 hours", "8 hours"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("roadmapdata",JSON.stringify(formData))
    route.push("/user/ai/roadmap/generate")
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-xl p-10 border border-gray-100">
        
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Roadmap</h1>
          <p className="text-gray-500">AI will architect a personalized learning path for you.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* --- Subject Name --- */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3 ml-1">
              Main Subject
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="Subject_Name"
                value={formData.Subject_Name}
                onChange={handleChange}
                placeholder="e.g. Cybersecurity, Medicine, Finance"
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-700 bg-gray-50/30"
                required
              />
            </div>
          </div>

          {/* --- Specific Topic --- */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3 ml-1">
              Specific Topic / Goal
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <BookOpen className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="Topic_Name"
                value={formData.Topic_Name}
                onChange={handleChange}
                placeholder="e.g. Ethical Hacking, Cardiology, Stock Trading"
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-700 bg-gray-50/30"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* --- Total Timeframe --- */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3 ml-1 flex items-center gap-2">
                <Calendar size={16} className="text-indigo-600" />
                Duration
              </label>
              <select
                name="Total_Timeframe"
                value={formData.Total_Timeframe}
                onChange={handleChange}
                className="w-full px-4 py-4  border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50/30 text-gray-700 font-medium cursor-pointer appearance-none"
              >
                {timeframes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* --- Daily Availability --- */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3 ml-1 flex items-center gap-2">
                <Clock size={16} className="text-indigo-600" />
                Study Hours / Day
              </label>
              <select
                name="Daily_Availability"
                value={formData.Daily_Availability}
                onChange={handleChange}
                className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50/30 text-gray-700 font-medium cursor-pointer appearance-none"
              >
                {availability.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>

          {/* --- Submit Button --- */}
          <button
            type="submit"
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-indigo-100 transform active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-lg"
          >
            <Sparkles className="w-6 h-6 fill-current" />
            Generate Roadmap
          </button>
        </form>
      </div>
    </div>
  );
}