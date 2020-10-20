import React, { useEffect, useState } from "react";
import "./App.css";
import { QuestionCard } from "./Services/components/QuestionCard";
import { Quiz_Service } from "./Services/Quiz_Service";
import { UsableData } from "./Services/types/Quiz_types";
import load1 from "./images/load1.gif";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CountUp from 'react-countup';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display:'flex',
      justifyContent:'center',
      justifyItems:'center',
      marginTop: '30px',
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      boxShadow:' 5px 10px 8px 10px #888888',
    },
    root1: {
      flexGrow: 1,
      display:'flex',
      justifyContent:'center',
      justifyItems:'center',
      marginTop: '200px',
    },
    paper1: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);
function App() {
  const classes = useStyles();
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
      <div className={classes.root1}>
      <Grid item xs={12} sm={6}>
          <Paper className={classes.paper1}>
        <h1 className="scorehead">Your Score </h1>

        <h2 className="scores">
        <CountUp end={score} /> out of {quiz.length}
        </h2>
      </Paper>
      </Grid>
      </div>
    );
  }

  if (!quiz.length) {
    return (
      <div className={classes.root}>
     <img src={load1} width={600} height={400} alt={load1} className="loading"/>
      </div>
    );
  }
  return (
    <div >
      <h1 className="heading">Quiz App</h1>
      <div className={classes.root}>
      <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}> 
          <QuestionCard
        question={quiz[currentQ].question}
        options={quiz[currentQ].options}
        callback={SubmitHandler}
      />
       </Paper>
        </Grid>
      </div>
    </div>
  );
}

export default App;
