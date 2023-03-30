import { type } from "os";
import { QuestionCard } from "./components/QuestionCard";
import { ShuffleArray } from "./utilities";

export const fetchQuestions =async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple&category=21`
    const data = await (await fetch(endpoint)).json();
    // return data;
   return data.results.map((question: Question) => ({
    ...question,
    answers: ShuffleArray([...question.incorrect_answers,question.correct_answer])
   }))
};

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}; 

export type QuestionState = Question & {answers: string[]};