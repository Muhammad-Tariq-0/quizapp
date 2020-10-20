import React, { useState } from "react";
import { D_O_S } from "../types/Quiz_types";
export const QuestionCard: React.FC<D_O_S> = ({
  question,
  options,
  callback,
}) => {
  const [selectedAns, setselectedAns] = useState("");
  function handleSelection(event: any) {
    setselectedAns(event.target.value);
  }
  return (
    <div>
      <h3 className="question">{question}</h3>
      <form
        onSubmit={(e: React.FormEvent<EventTarget>) => callback(e, selectedAns)}
      >
        {options.map((opt: any, ind: number) => {
          return (
            <div className="options">
              <label key={ind}>
                <input
                  type="radio"
                  name="opt"
                  value={opt}
                  required
                  checked={selectedAns === opt}
                  onChange={handleSelection}
                />
                &nbsp;{opt}
              </label>
            </div>
          );
        })}
        <input type="submit" />
      </form>
    </div>
  );
};
