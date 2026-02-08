"use client";

import React, { useEffect } from 'react';
import { useState } from "react";
import { Play, RotateCcw, Pause, X } from "lucide-react";
import { useRouter } from 'next/navigation';
import api from '@/lib/Api';



function QuizLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 font-sans">
      {/* Spinner: 
        - w-16 h-16: Sets the size
        - border-4: Sets the thickness
        - border-indigo-100: The faint background ring color
        - border-t-indigo-600: The spinning active part color
        - rounded-full: Makes it a circle
        - animate-spin: Tailwind's utility for CSS rotation 
      */}
      <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>

      {/* Main Text */}
      <h2 className="mt-8 text-2xl font-bold text-gray-800">
        Generating Your Quiz
      </h2>

      {/* Subtext */}
      <p className="mt-2 text-gray-500 text-base">
        AI is architecting your assessment questions...
      </p>
    </div>
  );
}

const mdata = {
  "quizdata": {
    "quiz": {
      "topic": "Game Theory",
      "totalQuestions": 3,
      "marksPerQuestion": 1,
      "totalMarks": 3
    },
    "questions": [
      {
        "id": 1,
        "question": "What is Nash Equilibrium?",
        "subTopic": "Nash Equilibrium",
        "correctAnswer": "B",
        "studentAnswer": "B"
      },
      {
        "id": 2,
        "question": "Prisoner's Dilemma is a type of?",
        "subTopic": "Non-cooperative Games",
        "correctAnswer": "A",
        "studentAnswer": "C"
      },
      {
        "id": 3,
        "question": "Zero-sum games imply?",
        "subTopic": "Zero-sum Games",
        "correctAnswer": "D",
        "studentAnswer": "D"
      }
    ]
  }

}


export default function QuizInterface() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [loading, setloading] = useState(false)

  const [question, setquestion] = useState([])
  const [data, setdata] = useState({})

  const [mode, setmode] = useState("practice")

  const route = useRouter()

  const [timeLeft, setTimeLeft] = useState(811); // 13:31 in seconds
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      // Add logic here for what happens when time runs out (e.g., auto-submit)
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Helper to format seconds into MM : SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const sendQuiz = async () => {
      try {
        setloading(true);
        const stored = localStorage.getItem("quizData");
        if (!stored) {
          route.push("/");
          return;
        }
        const data = JSON.parse(stored);
        const res = await api.post("/ai/quiz", data);
        setdata(res.data.quiz_metadata);
        setquestion(res.data.questions)
        console.log(res.data)
      } catch (err) {
        console.error("API error:", err);
      } finally {
        setloading(false);
      }
    };

    sendQuiz();
  }, []);

  const allHaveSubject = question.every(
    obj => obj.hasOwnProperty("studentAnswer") && obj.studentAnswer !== undefined
  );

  const Onforword = () => {
    setActiveQuestion(activeQuestion + 1)
  }

  const Onbackword = () => {
    setActiveQuestion(activeQuestion - 1)
  }

  const onChange = (index, option) => {
    let ch = question.map((q, i) => {
      if (i === index) {
        q["studentAnswer"] = option
      }
      return q
    })
    setquestion(ch)
  }

  const onFinish = () => {
    const senddata = {
      "quizdata": {
        "quiz": {
          "topic": data.topic,
          "totalQuestions": question.length,
          "marksPerQuestion": 1,
          "totalMarks": question.length
        },
        "questions": question
      }
    }
    localStorage.setItem("quizresult",JSON.stringify(senddata))
    route.push("/user/ai/quiz/generate/result")
  }

  if (loading) {
    return <QuizLoader />
  }
  return (
    <div className="min-h-screen p-8 flex gap-8 font-sans">

      {/* --- LEFT SIDEBAR --- */}
      <aside className="w-80 space-y-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{data.subject}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{data.difficulty} Mode</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 flex items-center gap-1 text-[10px] font-bold border rounded-full px-2 py-1">
              EXIT <X size={12} />
            </button>
          </div>

          {/* Timer Card */}
          <div className="bg-[#121926] rounded-2xl p-6 text-center text-white mb-8">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Time Remaining</p>
            <h2 className={`text-4xl font-bold mb-4 tabular-nums tracking-tight ${timeLeft < 60 ? 'text-red-400 animate-pulse' : ''} `}>{formatTime(timeLeft)}</h2>
            {mode === "test" ? null : <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsActive(!isActive)}
                className="hover:text-indigo-400 transition transform active:scale-90"
                title={isActive ? "Pause" : "Resume"}
              >
                {isActive ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
              </button>

              {/* Reset Button */}
              <button
                onClick={() => {
                  setIsActive(false);
                  setTimeLeft(811);
                }}
                className="hover:text-indigo-400 transition transform active:scale-90"
                title="Reset Timer"
              >
                <RotateCcw size={20} />
              </button>
            </div>}
          </div>

          {/* Mode Toggle */}
          <div className="mb-8">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-3">Mode</p>
            <div className="bg-gray-100 p-1 rounded-xl flex">
              <button className={`flex-1  shadow-sm py-2 rounded-lg text-xs font-bold text-gray-400 ${mode === "practice" ? "text-indigo-600 bg-white" : ""}`} onClick={() => setmode("practice")} >Practice</button>
              <button className={`flex-1 py-2 rounded-lg text-xs font-bold text-gray-400 ${mode === "test" ? "text-indigo-600 bg-white" : ""}`} onClick={() => setmode("test")} >Test</button>
            </div>
          </div>

          {/* Question Map */}
          <div className="mb-8">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-3">Question Map</p>
            <div className="flex flex-wrap gap-3">
              {question.map((_, q) => (
                <button
                  key={q}
                  onClick={() => setActiveQuestion(q)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all
                    ${activeQuestion === q
                      ? "bg-red-400 text-white shadow-lg shadow-red-100 ring-2 ring-red-400 ring-offset-2"
                      : "bg-[#D1D9E2] text-gray-600 hover:bg-gray-300"}`}
                >
                  {q + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-[10px] font-bold mb-2">
              <span className="text-gray-400 uppercase">Progress</span>
              <span className="text-gray-800">0/5</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-100 w-[10%] rounded-full"></div>
            </div>
          </div>

          <button disabled={!allHaveSubject} onClick={()=>onFinish()} className="w-full bg-[#121926] text-white py-4 rounded-2xl font-bold text-sm hover:bg-gray-800 transition shadow-lg">
            Finalize & Submit
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      {question.length > 0 ? <main className="flex-1 max-w-4xl">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-gray-900">{data.subject}</h1>
            <span className="bg-emerald-100 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">{data.difficulty}</span>
          </div>
          <p className="text-gray-400 text-sm">Subject specialized AI generated assessment.</p>
        </header>


        <div className="bg-white rounded-[40px] p-12 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-indigo-600 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold">{activeQuestion + 1}</div>
            <div>
              <p className="text-[10px] font-bold text-gray-800 uppercase tracking-widest">Question {activeQuestion + 1}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{question[activeQuestion].topic_tag}</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 leading-snug mb-10 max-w-2xl">
            {question[activeQuestion].question}
          </h2>

          <div className="grid gap-4">
            {question[activeQuestion].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => onChange(activeQuestion, opt)}
                className={`flex items-center p-6 rounded-2xl border transition-all text-left group
                  ${question[activeQuestion].studentAnswer === opt
                    ? "border-indigo-600 bg-indigo-50/30"
                    : "border-gray-50 bg-gray-50/50 hover:border-gray-200"}`}
              >
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold mr-6 transition-colors
                  ${question[activeQuestion].studentAnswer === opt ? "bg-white text-indigo-600 shadow-sm" : "bg-white text-gray-800"}`}>
                  {i + 1}
                </span>
                <span className={`font-semibold ${question[activeQuestion].studentAnswer === opt ? "text-indigo-900" : "text-gray-600"}`}>
                  {opt}
                </span>
              </button>
            ))}
          </div>
        </div>


        <div className="flex justify-between mt-8">
          <button className="px-8 py-3 rounded-xl bg-white text-gray-400 font-bold text-sm border border-gray-100 cursor-not-allowed" disabled={activeQuestion <= 0 ? true : false} onClick={() => Onbackword()} >
            Previous
          </button>
          <button className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition" disabled={activeQuestion === question.length - 1 ? true : false} onClick={() => Onforword()}>
            Next Question
          </button>
        </div>
      </main> : null}
    </div>
  );
}