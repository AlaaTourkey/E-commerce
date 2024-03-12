import { createContext, useState } from "react";

export let CounterContext = createContext();

export default function CounterContextProvider(props) {
  let [counter,setCounter] = useState(0);

  function changeCounter(params) {
    setCounter(counter + 1)
  }
  function decreaseCounter(params) {
    setCounter(counter - 1)
  }

  return <CounterContext.Provider value={ {counter , changeCounter , decreaseCounter} } >
    {props.children}
  </CounterContext.Provider>
}