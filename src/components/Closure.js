import React, { useEffect, useState } from "react";

const Closure = () => {
  let [count, setCount] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((count)=>count + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return <div>{count}</div>;
};

export default Closure;
