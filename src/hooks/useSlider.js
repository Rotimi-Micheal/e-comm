import { useEffect, useRef, useState } from "react";

export function useSlider(slideTime = 300, arr = []) {
  const [slide, setSlide] = useState(0);
  const timerRef = useRef(null);

  function handleNext() {
    setSlide((curSlide) => (curSlide < arr.length - 1 ? curSlide + 1 : 0));
  }

  function handlePrev() {
    setSlide((curSlide) => (curSlide > 0 ? curSlide - 1 : arr.length - 1));
  }

  const autoSlide = () =>
    (timerRef.current = setInterval(handleNext, slideTime));

  const stopAutoSlide = () => clearInterval(timerRef.current);

  useEffect(
    function () {
      autoSlide();

      return () => {
        stopAutoSlide();
      };
    },
    [slide],
  );

  return { handleNext, handlePrev, slide, autoSlide, stopAutoSlide };
}
