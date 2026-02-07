"use client";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";

const data = [
  { sem: "S1", cgpa: 7.5 },
  { sem: "S2", cgpa: 7.9 },
  { sem: "S3", cgpa: 7.7 },
  { sem: "S4", cgpa: 8.2 },
  { sem: "S5", cgpa: 8.4 },
];

export default function CgpaGraph() {
  return (
    <div className="w-full h-full flex flex-col gap-3">

      {/* Chart */}
      <div className="h-36 pointer-events-none">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis hide dataKey="sem" />
            <YAxis hide domain={[6, 9]} />

            <Area
              type="monotone"
              dataKey="cgpa"
              stroke="#3b82f6"
              fill="#3b82f620"
              strokeWidth={2}
              dot={{
                r: 4,
                strokeWidth: 2,
                fill: "#0b1220",
                stroke: "#3b82f6",
              }}
              activeDot={false}
            >
              {/* 🔥 Label on each point */}
              <LabelList
                dataKey="cgpa"
                position="top"
                style={{
                  fill: "#60a5fa",
                  fontSize: 12,
                  fontWeight: 500,
                }}
              />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
