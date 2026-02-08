"use client"
import QuizForm from "@/component/QuizForm"
import SubjectDropdown from "@/component/SubjectDropdown"
import { useState } from "react"


export default function page() {


    return (
        <div className="w-screen h-screen flex justify-center ">
            <div className="w-[80%] h-[90%] ">
                <header className="py-16 px-8 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl font-extrabold tracking-tight text-white mb-3">Quiz Studio</h1>
                        <p className="text-slate-300 font-medium text-lg">Generate professional assessments using artificial intelligence</p>
                    </div>
                </header>
                <div className="h-[90%] flex justify-center">
                    <QuizForm/> 
                </div>
            </div>
        </div>
    )
}
