import { type } from "os";
import { FormEvent } from "react";

export type APIData = {
  category: String;
  correct_answer: String;
  difficulty: String;
  incorrect_answers: String[];
  question: String;
  type: String;
};
export type UsableData = {
    question: String
    answer: String
    options: string[]
  };
  export type D_O_S = {
    question: String
    options: String[]
    callback: (e:React.FormEvent<EventTarget>,ans:String) => void
}