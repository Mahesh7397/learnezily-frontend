export default function QuizSidebar({ subject, difficulty, time }) {
  const mins = Math.floor(time / 60);
  const secs = String(time % 60).padStart(2, "0");

  return (
    <aside className="w-72 p-6 border-r bg-white">
      <h3 className="font-bold">{subject}</h3>
      <p>{difficulty}</p>
      <div className="text-3xl font-mono mt-6">
        {mins}:{secs}
      </div>
    </aside>
  );
}
