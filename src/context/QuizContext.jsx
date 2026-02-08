"use client";
import { createContext, useContext, useState } from "react";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [view, setView] = useState("landing");
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("easy");

  return (
    <QuizContext.Provider
      value={{ view, setView, subject, setSubject, difficulty, setDifficulty }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => useContext(QuizContext);
