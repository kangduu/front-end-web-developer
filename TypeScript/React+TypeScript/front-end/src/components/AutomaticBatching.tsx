import { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Increment: FC<any> = () => {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    console.log("[Increment] Updated:", count, flag);
  });

  const incermentHandler = function () {
    setTimeout(() => {
      setCount((c) => c + 1);
      ReactDOM.flushSync(() => {
        setFlag((f) => !f);
      });
      setCount((c) => c + 1);
    }, 300);
  };

  return (
    <>
      <p>Automatic Batching</p>
      <button onClick={incermentHandler}>点击并查看console</button>
    </>
  );
};

export default Increment;
