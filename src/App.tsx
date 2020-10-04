import React, { useEffect, useState } from "react";
import "./App.css";
import { QuestionCard } from "./Services/components/QuestionCard";
import { Quiz_Service } from "./Services/Quiz_Service";
import { UsableData } from "./Services/types/Quiz_types";
import pic4 from "./images/pic4.gif";
function App() {
  const [quiz, setquiz] = useState<UsableData[]>([]);
  let [currentQ, setcurrentQ] = useState(0);
  let [score, setscore] = useState(0);
  let [showresult, setshowresult] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const data = await Quiz_Service();
      console.log(data);
      setquiz(data);
    }
    fetchData();
  }, []);

  function SubmitHandler(e: React.FormEvent<EventTarget>, UserAns: String) {
    e.preventDefault();
    const ques = quiz[currentQ];
    console.log(
      "user select this " + UserAns + " and this one is correct " + ques.answer
    );
    if (UserAns === ques.answer) {
      setscore(++score);
    }
    if (currentQ !== quiz.length - 1) {
      setcurrentQ(++currentQ);
    } else {
      setshowresult(true);
    }
  }
  if (showresult === true) {
    return (
      <div className="result">
        <h1 className="scorehead">Your Score </h1>

        <h2 className="scores">
          {score} out of {quiz.length}
        </h2>
      </div>
    );
  }

  if (!quiz.length) {
    return (
      <img src={pic4} className="loading" alt={pic4} />
    );
  }
  return (
    <div className="main">
      <div className="heading">
        <h1>Quiz App</h1>
      </div>
      <QuestionCard
        question={quiz[currentQ].question}
        options={quiz[currentQ].options}
        callback={SubmitHandler}
      />
    </div>
  );
}

export default App;
