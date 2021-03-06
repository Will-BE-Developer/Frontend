import { useState, useRef, useEffect } from "react";
import heart from "../../assets/heart.png";

const OPACITY_DURATION = 1;

const Bubble = ({ id, onAnimationEnd }) => {
  const random = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(1);
  const size = useRef(random(0.7, 1.5));

  const element = useRef();

  const initialOptions = useRef({
    animationDuration: random(1, 3),
    element,
    onAnimationEnd,
    id,
  });

  useEffect(() => {
    const { animationDuration, element, onAnimationEnd, id } =
      initialOptions.current;

    element.current.addEventListener("transitionend", (event) => {
      if (event.propertyName === "opacity") {
        onAnimationEnd(id);
      }
    });

    const timer = setTimeout(() => {
      setPosition((prevState) => ({
        ...prevState,
        x: random(-40, 40),
        y: random(-100, -200),
      }));
    }, 5);

    const timer2 = setTimeout(() => {
      setOpacity(0);
    }, (animationDuration - OPACITY_DURATION) * 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div
      style={{
        top: 0,
        color: "red",
        fontSize: "2em",
        left: "50%",
        opacity,
        pointerEvents: "none",
        position: "absolute",
        transform: `translate(calc(-50% + ${position.x}px), calc(-100% + ${position.y}px)) scale(${size.current})`,
        textShadow: "0 0 5px rgba(0, 0, 0, .25)",
        transition: `transform ${initialOptions.current.animationDuration}s linear, opacity ${OPACITY_DURATION}s ease-in-out`,
      }}
      ref={element}
    >
      <img alt="emoji" src={heart} />
    </div>
  );
};

export default Bubble;
