import { BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer, Legend } from "recharts";

const sdata = [
  { subject: "React", value: 92 },
  { subject: "Next.js", value: 88 },
  { subject: "Node", value: 81 },
  { subject: "UI", value: 90 },
  { subject: "Security", value: 76 },
];

export default function SubjectBarGraph() {
  return (
    <div className="h-[95%] w-[95%] flex flex-col gap-4 p-2 ">
      <h2 className="text-lg font-semibold px-2 text-white">
        Quiz Progress
      </h2>

      <div className="flex-1 pointer-events-none ">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sdata}>
            <XAxis
              dataKey="subject"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
            />
            <Tooltip
              cursor={false}
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Bar
              dataKey="value"
              radius={[6, 6, 0, 0]}
              fill="#3b82f6"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
