import { createContext, useContext, useState } from 'react';
import type { DefecationState } from '../types';

interface DefecationContextType {
	defecationState: DefecationState;
	setDefecationState: (state: DefecationState) => void;
}

const DefecationContext = createContext<DefecationContextType | undefined>(
	undefined,
);

export const useDefecation = () => {
  const context = useContext(DefecationContext);
  if (!context) {
    throw new Error('useDefecation must be used within a DefecationProvider');
  }
  return context;
};

export const DefecationProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
  const [defecationState, setDefecationState] = useState<DefecationState>({
    selectedWhen: new Date(),
    selectedTry: '',
    selectedColor: '',
    selectedShape: '',
    selectedPain: '',
    selectedTimeTaken: '',
    selectedOptional: '',
  });

	return (
		<DefecationContext.Provider value={{ defecationState, setDefecationState }}>
			{children}
		</DefecationContext.Provider>
	);
};
