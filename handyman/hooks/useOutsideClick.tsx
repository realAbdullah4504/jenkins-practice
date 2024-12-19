import { useEffect } from 'react';

const useOutsideClick = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  callback: () => void
) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
