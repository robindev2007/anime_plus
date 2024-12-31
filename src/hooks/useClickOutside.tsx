import { useEffect, useRef } from "react";

/**
 * Custom hook to detect clicks outside a specified element.
 * @param {function} onClickOutside - Callback function to execute on outside click.
 * @returns {React.RefObject<HTMLElement>} - Ref object to attach to the target element.
 */
const useClickOutside = (
  onClickOutside: (event: MouseEvent | TouchEvent) => void,
): React.RefObject<HTMLElement> => {
  const ref = useRef<HTMLElement>(null!);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside(event);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [onClickOutside]);

  return ref;
};

export default useClickOutside;
