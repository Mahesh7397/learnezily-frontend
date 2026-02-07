"use client";

import { useEffect, useRef } from "react";
import BarChart from "@/component/SubjectBarGraph";
import MyPieChart from "@/component/MyPieChart";
import CgpaGraph from "@/component/CgpaGraph";
import WeeklyPerformance from "@/component/WeeklyPerformance";

export default function Dashboard() {
  return (
    <div className="bg-background w-screen h-screen flex justify-center ">
      <div className="w-full sm:w-[70%] h-full  flex flex-col items-center justify-center ">
        <div className="w-[93%] h-20 bg-box border border-border rounded-2xl mt-2">
          <div className="px-3 mx-3">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white/60">Hi, Welcome Back,</h1>
            <p className="text-lg text-gray-100 font-medium mt-1">Let's ace your academics today.</p>
          </div>
        </div>
        <div className="w-[95%] h-[90%] flex items-center ">
          <div className="w-[40%] h-[95%] flex flex-col items-center gap-2 ">
            <div className="w-[95%] h-32  bg-box border border-border rounded-2xl">
              <div className="px-2 mx-1">
                <span className="text-white/70 text-lg font-bold">Current Course</span>
                <h2 className="text-white/90 text-2xl font-bold">BSc Mathematics</h2>
                <p className="text-sm text-gray-200 font-normal mt-1">Chapter 4: Linear Algebra</p>
              </div>
              <div class="flex items-center text-blue-600 text-sm mt-2 mx-1 px-2 group">
                Continue reading
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
            <div className="w-[95%] h-80 bg-box border border-border rounded-2xl">
              <BarChart />
            </div>
            <div className="w-[95%] h-80 bg-box border border-border rounded-2xl p-2 ">
              <WeeklyPerformance/>
            </div>
          </div>
          <div className="w-[60%] h-[95%]  flex flex-col gap-1">
            <div className="w-full h-[52%] flex justify-around ">
              <div className="w-[50%] h-full ">
                <div className="w-full h-34 flex justify-around">
                  <div className="w-[48%] h-32 rounded-2xl bg-indigo-500 flex flex-col justify-center items-center">
                     <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span class="text-xl">Quiz</span>
                  </div>
                  <div className="w-[48%] h-32 rounded-2xl bg-emerald-500 flex flex-col justify-center items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span class="text-xl">Deep Dive</span>
                  </div>
                </div>
                <div className=" w-full h-65 bg-box border border-border rounded-2xl ">
                  <div className="flex justify-between p-2 m-2">
                    <h2 className="text-3 font-semibold text-white">
                      Current CGPA
                    </h2>
                    <span className="text-blue-400 font-bold text-lg">
                      8.4
                    </span>
                  </div>
                  <div className="p-2 m-2">
                    <CgpaGraph />
                  </div>
                </div>
              </div>
              <div className="w-[48%] h-full flex justify-center">
                <div className="w-102 h-100 bg-box border border-border rounded-2xl p-2">
                  <h2 className="text-lg font-semibold px-2 text-white">Productivity</h2>
                  <div>
                    <MyPieChart />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-[48%] bg-box border border-border rounded-2xl p-2  ">
               <h3 className="text-lg text-white font-bold mb-4">Assignments & Tasks</h3>
                <div className="w-full overflow-y-auto pr-2 space-y-3">
                    
                    <div className="flex items-center justify-between p-3 bg-box/80 rounded-xl shadow-sm border border-border">
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300 hover:border-blue-500 cursor-pointer"></div>
                            <span className="text-sm text-white font-medium">Complete Linear Algebra P-Set</span>
                        </div>
                        <div className="flex items-center text-xs text-red-500 font-bold bg-red-50 px-2 py-1 rounded-md">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            2h left
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-box/80 rounded-xl shadow-sm border border-border">
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full border-2 border-blue-500 bg-blue-500 flex items-center justify-center cursor-pointer">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <span className="text-sm font-medium text-gray-400 line-through">Submit Python Project</span>
                        </div>
                        <div className="flex items-center text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded-md">
                            Done
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-box/80 rounded-xl shadow-sm border border-border">
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300 hover:border-blue-500 cursor-pointer"></div>
                            <span className="text-sm text-white font-medium">Review Statistics Notes</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 font-bold bg-gray-100 px-2 py-1 rounded-md">
                            Tomorrow
                        </div>
                    </div>

                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
