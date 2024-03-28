import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturingState = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) handler();
      }

      document.addEventListener("click", handleClick, listenCapturingState);

      return () =>
        document.removeEventListener(
          "click",
          handleClick,
          listenCapturingState,
        );
    },
    [ref, handler, listenCapturingState],
  );
  return { ref };
}
