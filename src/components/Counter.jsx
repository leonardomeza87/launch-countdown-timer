import { useEffect, useState } from "react";

const Counter = ({ timeUnit, value }) => {
  const [newValue, setNewValue] = useState(value);
  const [oldValue, setOldValue] = useState(value);

  const [runningTopAnimation, setRunningTopAnimation] = useState(false);
  const [runningBottomAnimation, setRunningBottomAnimation] = useState(false);

  const [firstTime, setFirstTime] = useState(true);

  //Update new value
  useEffect(() => {
    setNewValue(value);
  }, [value]);

  //Animation
  useEffect(() => {
    if (firstTime) {
      setFirstTime(false);
    } else {
      setRunningTopAnimation(true);

      setTimeout(() => {
        setRunningBottomAnimation(true);

        setTimeout(() => {
          setOldValue(newValue);
          setRunningTopAnimation(false);
          setRunningBottomAnimation(false);
        }, 520);
      }, 220);
    }
  }, [newValue]);

  return (
    <div className="group">
      <div className="counter">
        <div className="rear">
          <div className="top">
            <p>{newValue}</p>
          </div>
          <div className="bottom">
            <p>{oldValue}</p>
          </div>
        </div>

        <div className="flip">
          <div className={runningTopAnimation ? "front animationTop" : "front"}>
            <p>{oldValue}</p>
          </div>
          <div
            className={
              runningBottomAnimation ? "behind animationBottom" : "behind"
            }
          >
            <p>{newValue}</p>
          </div>
        </div>

        {/* <div className="shadows"></div> */}
      </div>
      <h3>{timeUnit.toUpperCase()}</h3>
    </div>
  );
};

export default Counter;
