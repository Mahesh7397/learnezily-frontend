"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Tag, ListOrdered, Sparkles, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const subjects = [
  "Arabic",
  "Maths",
  "English",
  "Tamil",
  "Chemistry",
  "Physics",
  "Biology",
  "History",
  "Geography",
  "Computer Science",
];

const difficulties = ["Easy", "Medium", "Hard"];

export default function QuizForm() {
  // --- State Management ---
  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    amount: 5,
    difficulty: "Easy",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // --- Handlers ---

  // Handle generic input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Subject Selection
  const handleSelectSubject = (subject) => {
    setFormData((prev) => ({ ...prev, subject }));
    setSearchTerm(subject);
    setIsDropdownOpen(false);
  };

  // Filter subjects based on search
  const filteredSubjects = subjects.filter((s) =>
    s.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const route=useRouter()
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("quizData", JSON.stringify(formData));
    route.push('/user/ai/quiz/generate/test')
  };

  return (
    
      <div className="bg-box w-full max-w-2xl h-auto rounded-3xl shadow-xl p-8">
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* --- 1. Subject Field (Searchable Dropdown) --- */}
          <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-bold text-gray-200 mb-2">
              Subject Field
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-100" />
              </div>
              <input
                type="text"
                placeholder="Search subjects..."
                className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-200 bg-box/70"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsDropdownOpen(true);
                  // Clear selected subject if user starts typing again
                  if(formData.subject !== e.target.value) {
                     setFormData(prev => ({...prev, subject: ''}))
                  }
                }}
                onFocus={() => setIsDropdownOpen(true)}
              />
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute z-20 w-full mt-2 bg-gray-400 border border-border rounded-xl shadow-lg max-h-60 overflow-auto custom-scrollbar">
                {filteredSubjects.length > 0 ? (
                  <ul className="py-1">
                    {filteredSubjects.map((subject) => (
                      <li
                        key={subject}
                        onClick={() => handleSelectSubject(subject)}
                        className={`cursor-pointer px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors ${
                          formData.subject === subject ? "bg-indigo-50 text-indigo-700" : "text-gray-700"
                        }`}
                      >
                        {subject}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-3 text-gray-500 text-sm">No subjects found</div>
                )}
              </div>
            )}
          </div>

          {/* --- 2. Specific Topic --- */}
          <div>
            <label className="block text-sm font-bold text-gray-200 mb-2">
              Specific Topic <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                placeholder="e.g., Photosynthesis, Linked Lists, etc."
                className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-100"
              />
            </div>
          </div>

          {/* --- Row for Amount & Difficulty --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* --- 3. Number of Questions --- */}
            <div>
              <label className="block text-sm font-bold text-gray-200 mb-2">
                Number of Questions
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ListOrdered className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="amount"
                  min="5"
                  max="20"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-100"
                />
              </div>
            </div>

            {/* --- 4. Difficulty Level --- */}
            <div>
              <label className="block text-sm font-bold text-gray-200 mb-2">
                Difficulty Level
              </label>
              <div className="bg-gray-100 p-1 rounded-xl flex">
                {difficulties.map((level) => {
                  const isActive = formData.difficulty === level;
                  
                  // Dynamic colors based on selection (Green for Easy, as per screenshot)
                  let activeClass = "bg-white text-gray-800 shadow-sm";
                  if (isActive && level === 'Easy') activeClass = "bg-emerald-500 text-white shadow-md";
                  if (isActive && level === 'Medium') activeClass = "bg-yellow-500 text-white shadow-md";
                  if (isActive && level === 'Hard') activeClass = "bg-red-500 text-white shadow-md";

                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, difficulty: level }))}
                      className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive ? activeClass : "text-gray-500"
                      }`}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* --- 5. Submit Button --- */}
          <button
            type="submit"
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-900 transform active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-lg"
          >
            <Sparkles className="w-5 h-5 fill-current" />
            Create My Quiz
          </button>
        </form>
      </div>

  );
}