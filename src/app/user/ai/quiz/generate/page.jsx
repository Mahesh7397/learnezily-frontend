"use client"
import { useState } from "react"


export default function page() {
    const [subject, setsubject] = useState("")
    const [topic, settopic] = useState("")
    const [numofquestions, setnumofquestions] = useState(5)
    const [deficulty, setdeficulty] = useState("")

    return (
        <div className="w-screen h-screen flex justify-center ">
            <div className="w-[80%] h-[90%] ">
                <header className="py-16 px-8 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl font-extrabold tracking-tight text-white mb-3">Quiz Studio</h1>
                        <p className="text-slate-300 font-medium text-lg">Generate professional assessments using artificial intelligence</p>
                    </div>
                </header>
                <div className="max-w-4xl mx-auto bg-box p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-800/50 border border-border relative overflow-hidden mb-12 flex flex-col justify-around items-center " >
                    <div className="flex flex-col gap-y-1 w-[80%]" >
                        <label className="text-sm font-bold text-slate-300 ml-1">Subject Field</label>
                        <select value={subject} onChange={(e) => setsubject(e.target.value)} className="w-full pl-12 pr-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all" >
                            <option className="px-4 py-3 hover:bg-indigo-50 rounded-xl cursor-pointer text-sm font-medium transition-colors" >Option 1</option>
                            <option className="px-4 py-3 hover:bg-indigo-50 rounded-xl cursor-pointer text-sm font-medium transition-colors" >Option 2</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}
