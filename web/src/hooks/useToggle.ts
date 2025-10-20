import { useState } from 'react';

type useToggleReturn = {
  isToggleOn: boolean;
  handleSwitchToggle: () => void;
};
export const useToggle = (intial = false): useToggleReturn => {
  const [isToggleOn, setIsToggleOn] = useState<boolean>(intial);

  const handleSwitchToggle = (): void => {
    setIsToggleOn((prev) => !prev);
  };
  return { isToggleOn, handleSwitchToggle };
};
