'use client';

import { useDefecation } from '../providers/defecation-providers';

export const DefecationSubmit = () => {
  const { defecationState } = useDefecation();

  return (
    <button
      type="button"
      className="w-full bg-blue-500 text-white rounded-lg p-2"
      onClick={() => console.log(defecationState)}
    >
      저장
    </button>
  );
};
