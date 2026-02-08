export default function QuestionCard({ q, answer, selectOption }) {
  return (
    <div>
      <p className="mb-6">{q.q}</p>

      <div className="space-y-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => selectOption(i)}
            className={`block w-full text-left p-4 rounded-xl border ${
              answer === i ? "bg-indigo-100 border-indigo-500" : "bg-gray-50"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
