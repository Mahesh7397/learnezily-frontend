import { useState } from "react";
import { questionsData } from "@/data/questions";

export default function useQuizEngine() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(
    new Array(questionsData.length).fill(null)
  );

  const selectOption = (i) => {
    const updated = [...answers];
    updated[index] = i;
    setAnswers(updated);
  };

  return {
    questionsData,
    index,
    setIndex,
    answers,
    selectOption
  };
}
