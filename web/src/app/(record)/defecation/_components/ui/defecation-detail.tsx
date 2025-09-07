'use client';

import { useState } from 'react';
import {
  DEFECATION_TRY_DETAIL,
  type DefecationTryDetailKey,
} from '../constants/description';
import { CollapsibleToggle } from './common/collapsible-toggle';
import { DefecationColor } from './select-defecation';

export const DefecationDetail = () => {
	const [openId, setOpenId] = useState<DefecationTryDetailKey | null>(null);

	const handleToggle = (id: DefecationTryDetailKey) => {
		setOpenId((prevId) => (prevId === id ? null : id));
	};

  const renderSelectSection = (value: DefecationTryDetailKey) => {
    switch (value) {
      case 'COLOR':
        return <DefecationColor />;
      case 'SHAPE':
        return <div>SHAPE</div>;
      case 'PAIN':
        return <div>PAIN</div>;
      case 'TIME_TAKEN':
        return <div>TIME_TAKEN</div>;
      case 'OPTIONAL':
        return <div>OPTIONAL</div>;
      default:
        return <DefecationColor />;
    }
  };

	return (
		<>
			{Object.entries(DEFECATION_TRY_DETAIL).map(([key, value]) => (
				<div key={key}>
					<CollapsibleToggle
						id={key}
						isOpen={openId === key}
						onToggle={() => {
							handleToggle(key as DefecationTryDetailKey);
						}}
						trigger={<p className="text-base font-bold">{value}</p>}
					>
						<div>{renderSelectSection(key as DefecationTryDetailKey)}</div>
					</CollapsibleToggle>
				</div>
			))}
		</>
	);
};
