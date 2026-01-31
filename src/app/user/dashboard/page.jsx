"use client"
import Image from "next/image";
import { PieChart, Pie, Cell,   BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer, Legend } from "recharts";


import { useRouter } from "next/navigation";

const sdata = [
  { subject: "React", value: 92 },
  { subject: "Next.js", value: 88 },
  { subject: "Node", value: 81 },
  { subject: "UI", value: 90 },
  { subject: "Security", value: 76 },
];

const subjectList = [
  { name: "React", grade: "A", credits: 4 },
  { name: "Next.js", grade: "A-", credits: 3 },
  { name: "Node", grade: "B+", credits: 3 },
  { name: "UI Design", grade: "A", credits: 2 },
  { name: "Cyber Security", grade: "B", credits: 4 },
];


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
    <div className="w-full h-80 pointer-events-none">
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

function SubjectBarGraph() {
  return (
    <div className="h-[95%] w-[95%] flex flex-col gap-4">
      <h2 className="text-lg font-semibold px-2 text-white">
        Subject Progress
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

const todos = [
  { id: 1, title: "Finish dashboard UI", status: "done" },
  { id: 2, title: "Integrate pie chart", status: "in-progress" },
  { id: 3, title: "Optimize layout responsiveness", status: "pending" },
  { id: 4, title: "Connect backend API", status: "pending" },
  { id: 5, title: "Dark theme polish", status: "done" },
];

const events = [
  { title: "Meeting", date: "2026-01-22" },
  { title: "Hackathon", date: "2026-01-30" },
];

const grades = [
  { subject: "React", score: 92 },
  { subject: "Next.js", score: 88 },
  { subject: "Node", score: 81 },
  { subject: "UI Design", score: 90 },
];

export default function Page() {
  const rounter=useRouter()

    const total = grades.reduce((acc, g) => acc + g.score, 0);
  const avg = Math.round(total / grades.length);

  // simple fake GPA formula
  const gpa = (avg / 25).toFixed(2);

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
    <div className="w-full sm:w-[32%] h-80 bg-box border border-border rounded-xl">
      <div className="flex justify-evenly items-center w-full h-[50%] " >
         <div onClick={()=>rounter.push("search")} className=" w-[45%] h-[90%] bg-[#00C49F] border border-border rounded-lg " >

         </div>
         <div onClick={()=>rounter.push("save")} className="w-[45%] h-[90%] bg-[#FFBB28] border-2 border-border rounded-lg " >

         </div>
      </div>
      <div className="w-full h-[50%] flex justify-center items-center " >
        <div  onClick={()=>rounter.push("upload")} className="w-[90%] h-[90%] bg-[#0088FE] border-2 border-border rounded-lg" >

        </div>
      </div>
    </div>
    <div className="w-full sm:w-[32%] h-80 bg-box border border-border rounded-xl p-4 flex-row justify-items-center ">
        <h2 className="text-lg font-semibold text-white">Grades</h2>
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mt-auto pt-4 h-[30%] w-[90%] border-t border-slate-700">
        <div className="text-center">
          <p className="text-xs text-slate-400">Total</p>
          <p className="text-lg font-bold text-white">{total}</p>
        </div>

        <div className="text-center">
          <p className="text-xs text-slate-400">Average %</p>
          <p className="text-lg font-bold text-white">{avg}%</p>
        </div>
      </div>
      <div className="h-[40%] w-[90%] flex justify-center items-center border border-border rounded-2xl ">
         <div className="text-center">
          <p className="text-xs text-slate-400">GPA</p>
          <p className="text-lg font-bold text-white">{gpa}</p>
        </div>
      </div>
      <div className="h-[20%] w-[90%] flex justify-center items-center " >
         <button className="h-[80%] w-[90%] bg-blue-400 rounded-2xl" >Details</button>
      </div>
    </div>
  </div>
  <div className="w-full max-w-7xl flex flex-col sm:flex-row gap-4 justify-between">
    <div className="w-full sm:w-[66%] min-h-80 bg-box border border-border rounded-xl p-4 ">
      <div className="w-full h-auto flex justify-between ">
         <h2 className="text-lg font-semibold text-white">Todo List</h2>
         <div className="flex w-35 justify-between ">
          <button className="p-2 text-gray-400" >view all</button>
          <button className="bg-primary w-auto h-8 px-2 border border-border rounded-lg" > + Add</button>
         </div>
      </div>
      <div className="space-y-3 overflow-y-auto">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between rounded-xl bg-slate-800/80 px-4 py-3"
          >
            <span className="text-sm text-white">
              {todo.title}
            </span>

            {/* Status Badge */}
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium
                ${
                  todo.status === "done"
                    ? "bg-green-500/20 text-green-400"
                    : todo.status === "in-progress"
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }
              `}
            >
              {todo.status}
            </span>
          </div>
        ))}
      </div>
    </div>
    <div className="w-full sm:w-[40%] h-80 sm:h-full bg-box border border-border rounded-xl">
      <MyPieChart/>
    </div>
  </div>
   <div className="w-full max-w-7xl flex flex-col sm:flex-row gap-4 justify-between">
    <div className="w-full sm:w-[40%] h-80 bg-box border border-border rounded-xl p-2">
     <SubjectBarGraph/>
    </div>
    <div className="w-full sm:w-[66%] min-h-80 bg-box border border-border rounded-xl p-2 md:p-4">
       <h2 className="text-lg font-semibold text-white px-2 ">
        Subjects
      </h2>

      <div className="space-y-3">
        {subjectList.map((sub) => (
          <div
            key={sub.name}
            className="flex items-center justify-between rounded-xl bg-slate-800/70 px-4 py-3"
          >
            <div>
              <p className="text-sm text-white">{sub.name}</p>
              <p className="text-xs text-slate-400">
                Credits: {sub.credits}
              </p>
            </div>

            <span className="text-sm font-semibold text-blue-400">
              {sub.grade}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
  <div className="w-full h-5" />
</div>

  )
}