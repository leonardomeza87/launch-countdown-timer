import "./App.scss";

import { useEffect, useState } from "react";

import Counter from "./components/Counter";
import { ReactComponent as TwitterIcon } from "./images/icon-twitter.svg";
import { ReactComponent as GithubIcon } from "./images/icon-github.svg";
import { ReactComponent as InstagramIcon } from "./images/icon-instagram.svg";

//Add the desired days to a date
const goal = () => {
  const daysGoal = 14;

  let date = new Date(Date.now());
  date.setDate(date.getDate() + daysGoal);

  //Start animation time
  date.setSeconds(date.getSeconds() + 1);
  date.setMilliseconds(date.getMilliseconds() + 200);

  return date;
};

function App() {
  const [targetDate, setTargetDate] = useState(goal());

  useEffect(() => {
    setTargetDate(goal());
  }, []);

  const [days, setDays] = useState(14);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const clock = () => {
    let now = new Date().getTime();
    let gap = targetDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    let d = Math.floor(gap / day);
    let h = Math.floor((gap % day) / hour);
    let m = Math.floor((gap % hour) / minute);
    let s = Math.floor((gap % minute) / second);

    setDays(d);
    setHours(h);
    setMinutes(m);
    setSeconds(s);
  };

  useEffect(() => {
    let tick = null;

    setTimeout(() => {
      clock();

      tick = setInterval(() => {
        clock();
      }, 1000);
    }, 1200);

    return () => {
      clearInterval(tick);
    };
  }, []);

  return (
    <main className="app">
      <h1>We're launching soon</h1>

      <div className="countdownTimer">
        <Counter timeUnit="Days" value={days} />
        <Counter timeUnit="Hours" value={hours} />
        <Counter timeUnit="Minutes" value={minutes} />
        <Counter timeUnit="Seconds" value={seconds} />
      </div>
      <div className="social">
        <div className="icon">
          <a
            href="https://twitter.com/leonardomeza87"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
          </a>
        </div>
        <div className="icon">
          <a
            href="https://github.com/leonardomeza87/launch-countdown-timer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
          </a>
        </div>
        <div className="icon">
          <InstagramIcon />
        </div>
      </div>
    </main>
  );
}

export default App;
