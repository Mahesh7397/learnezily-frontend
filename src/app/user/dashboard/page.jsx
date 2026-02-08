"use client";

import { useEffect, useRef } from "react";
import BarChart from "@/component/SubjectBarGraph";
import MyPieChart from "@/component/MyPieChart";
import CgpaGraph from "@/component/CgpaGraph";
import WeeklyPerformance from "@/component/WeeklyPerformance";

export default function Dashboard() {
  return (
        <div className="bg-background w-full min-h-screen flex justify-center">
      <div className="w-full lg:w-[70%] flex flex-col items-center">

        {/* HEADER */}
        <div className="w-[93%] bg-box border border-border rounded-2xl mt-2 p-4">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white/60">
            Hi, Welcome Back,
          </h1>
          <p className="text-lg text-gray-100 font-medium mt-1">
            Let's ace your academics today.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="w-[95%] flex flex-col lg:flex-row gap-3 mt-2">

          {/* LEFT COLUMN */}
          <div className="w-full lg:w-[40%] flex flex-col items-center gap-3">

            <div className="w-full min-h-[140px] bg-box border border-border rounded-2xl p-3">
              <span className="text-white/70 text-lg font-bold">
                Current Course
              </span>
              <h2 className="text-white/90 text-2xl font-bold">
                BSc Mathematics
              </h2>
              <p className="text-sm text-gray-200 mt-1">
                Chapter 4: Linear Algebra
              </p>

              <div className="flex items-center text-blue-600 text-sm mt-2 group">
                Continue reading
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </div>
            </div>

            <div className="w-full min-h-[320px] bg-box border border-border rounded-2xl">
              <BarChart />
            </div>

            <div className="w-full min-h-[320px] bg-box border border-border rounded-2xl p-2">
              <WeeklyPerformance />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-full lg:w-[60%] flex flex-col gap-3">

            {/* TOP SECTION */}
            <div className="flex flex-col md:flex-row gap-3">

              {/* LEFT BLOCK */}
              <div className="w-full md:w-1/2 flex flex-col gap-3">

                <div className="flex gap-3">
                  <div className="w-1/2 h-32 rounded-2xl bg-indigo-500 flex flex-col justify-center items-center">
                    <span className="text-xl">Quiz</span>
                  </div>

                  <div className="w-1/2 h-32 rounded-2xl bg-emerald-500 flex flex-col justify-center items-center">
                    <span className="text-xl">Deep Dive</span>
                  </div>
                </div>

                <div className="bg-box border border-border rounded-2xl p-3 min-h-[260px]">
                  <div className="flex justify-between">
                    <h2 className="font-semibold text-white">
                      Current CGPA
                    </h2>
                    <span className="text-blue-400 font-bold text-lg">
                      8.4
                    </span>
                  </div>
                  <CgpaGraph />
                </div>
              </div>

              {/* PIE CHART */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="w-full bg-box border border-border rounded-2xl p-3 min-h-[350px]">
                  <h2 className="text-lg font-semibold text-white">
                    Productivity
                  </h2>
                  <MyPieChart />
                </div>
              </div>
            </div>

            {/* TASK LIST */}
            <div className="bg-box border border-border rounded-2xl p-3">
              <h3 className="text-lg text-white font-bold mb-4">
                Assignments & Tasks
              </h3>

              <div className="w-full overflow-y-auto space-y-3 max-h-[300px]">

                <div className="flex items-center justify-between p-3 bg-box/80 rounded-xl border border-border">
                  <span className="text-sm text-white">
                    Complete Linear Algebra P-Set
                  </span>
                  <span className="text-xs text-red-500 font-bold">
                    2h left
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-box/80 rounded-xl border border-border">
                  <span className="text-sm text-gray-400 line-through">
                    Submit Python Project
                  </span>
                  <span className="text-xs text-green-600 font-bold">
                    Done
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-box/80 rounded-xl border border-border">
                  <span className="text-sm text-white">
                    Review Statistics Notes
                  </span>
                  <span className="text-xs text-gray-500 font-bold">
                    Tomorrow
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
