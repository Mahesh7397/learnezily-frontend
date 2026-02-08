"use client";

import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";

const data = [{ name: "Performance", value: 92 }];

export default function WeeklyPerformance() {
  return (
    <div className="w-full h-full rounded-2xl bg-[#1f2b3d] p-6 flex flex-col">
      
      {/* Title */}
      <h2 className="text-sm font-semibold text-white mb-4">
        Weekly Performance
      </h2>

      {/* Gauge */}
      <div className="relative w-full h-full ">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            data={data}
            startAngle={180}
            endAngle={0}
            innerRadius={70}
            outerRadius={100}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              tick={false}
            />

            <RadialBar
              background={{ fill: "#334155" }}
              dataKey="value"
              fill="#10b981"
              cornerRadius={10}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-6">
          <span className="text-2xl font-bold text-white">
            92%
          </span>
          <span className="text-xs text-slate-400">
            This Week
          </span>
        </div>
      </div>
    </div>
  );
}
