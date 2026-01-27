"use client"
import Image from "next/image";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

// function MiniCalendar({ events = [] }) {
//   return (
//     <div className="bg-[#0f172a] h-auto w-auto text-white rounded-xl p-3 
//                     shadow-lg">
//       <FullCalendar
//         plugins={[dayGridPlugin, interactionPlugin]}
//         initialView="dayGridMonth"
//         height="90%"
//         expandRows={false}
//         dayMaxEventRows={1}
//         fixedWeekCount={false}
//         events={events}
//         headerToolbar={{
//           left: "prev",
//           center: "title",
//           right: "next",
//         }}
//       />
//     </div>
//   );
// }

const data = [
  { name: "React", value: 400 },
  { name: "Next.js", value: 300 },
  { name: "Node", value: 300 },
  { name: "Other", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function MyPieChart() {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

const events = [
  { title: "Meeting", date: "2026-01-22" },
  { title: "Hackathon", date: "2026-01-30" },
];

export default function Page() {
  return (
  <div className="min-h-screen w-full flex flex-col items-center gap-6 p-4">
  
  {/* Header */}
  <div className="w-full max-w-7xl flex justify-between items-center h-12 px-2">
    
    {/* Logo */}
    <div className="w-12 h-12 flex items-center justify-center">
      <Image src="/globe.svg" alt="Logo" width={40} height={40} />
    </div>

    {/* Buttons */}
    <div className="flex gap-2">
      <div className="px-4 py-2 bg-box/87 rounded-xl border border-border text-center">
        <h2 className="text-[18px] text-foreground">Btn 1</h2>
      </div>
      <div className="px-4 py-2 bg-box/87 rounded-xl border border-border text-center">
        <h2 className="text-[18px] text-foreground">Btn 2</h2>
      </div>
    </div>

  </div>

  {/* Body */}
  <div className="w-full max-w-7xl flex flex-col sm:flex-row gap-4 justify-between">
    <div className="w-full sm:w-[32%] h-80 bg-box border border-border rounded-xl"></div>
    <div className="w-full sm:w-[32%] h-80 bg-box border border-border rounded-xl"></div>
    <div className="w-full sm:w-[32%] h-80 bg-box border border-border rounded-xl">

    </div>
  </div>
  <div className="w-full max-w-7xl flex flex-col sm:flex-row gap-4 justify-between">
    <div className="w-full sm:w-[66%] h-80 bg-box border border-border rounded-xl">
      <div className="w-[40%] h-[90%] mx-auto">
         
      </div>
      <div className="w-[40%] h-[90%] mx-auto">
         
      </div>
    </div>
    <div className="w-full sm:w-[40%] h-80 bg-box border border-border rounded-xl">
      <MyPieChart/>
    </div>
  </div>
   <div className="w-full max-w-7xl flex flex-col sm:flex-row gap-4 justify-between">
    <div className="w-full sm:w-[40%] h-80 bg-box border border-border rounded-xl"></div>
    <div className="w-full sm:w-[66%] h-80 bg-box border border-border rounded-xl"></div>
  </div>
</div>

  )
}