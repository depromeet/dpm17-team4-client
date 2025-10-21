import { useState } from 'react';

type useToggleReturn = {
  isToggleOn: boolean;
  handleSwitchToggle: () => void;
};
export const useToggle = (initial = false): useToggleReturn => {
  const [isToggleOn, setIsToggleOn] = useState<boolean>(initial);

  const handleSwitchToggle = (): void => {
    setIsToggleOn((prev) => !prev);
  };
  return { isToggleOn, handleSwitchToggle };
};
