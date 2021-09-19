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

  return date;
};

function App() {
  const [targetDate, setTargetDate] = useState(goal());

  useEffect(() => {
    setTargetDate(goal());
  }, []);

  useEffect(() => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    // We listen to the resize event
    window.addEventListener("resize", () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
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

    // console.log(d, h, m, s);

    setDays(d);
    setHours(h);
    setMinutes(m);
    setSeconds(s);
  };

  useEffect(() => {
    clock();

    const tick = setInterval(() => {
      clock();
    }, 1000);

    return () => {
      clearInterval(tick);
    };
  }, []);

  // //Test
  // useEffect(() => {
  //   console.log("a");
  // }, [days]);

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
