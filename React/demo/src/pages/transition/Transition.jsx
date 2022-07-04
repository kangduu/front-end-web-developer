import React, { useState } from "react";
import { Transition } from "react-transition-group";

const duration = 300;

const defaultStyles = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const Fade = ({ in: inProp }) => (
  <Transition in={inProp} timeout={duration}>
    {(state) => (
      <div
        style={{
          ...defaultStyles,
          ...transitionStyles[state],
        }}
      >
        I'm a fade Transition!
      </div>
    )}
  </Transition>
);

export default () => {
  const [inProp, setInProp] = useState(false);
  return (
    <div>
      <Fade in={inProp} />
      <button onClick={() => setInProp(!inProp)}>Click Me</button>
    </div>
  );
};
