import { FC, useEffect, useState } from "react";

const Increment: FC<any> = () => {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    console.log("[Incerment] Updated:", count, flag);
  });

  const incermentHandler = function () {
    setTimeout(() => {
      setCount((c) => c + 1);
      setFlag((f) => !f);
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
