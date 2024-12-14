import { useState } from "react";

export default function useCounter(initialCount = 0) {
    const [count, setCount] = useState(initialCount);

    const increment = () => {
        // setCount(count + 1);
        setCount((prv)=>prv + 1);
    };

  return (
    [ count, increment ]
  )
}
