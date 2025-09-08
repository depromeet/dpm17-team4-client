'use client';

import { useState } from 'react';
import { DEFECATION_DETAIL } from '../constants';
import type { DefecationTryDetailKey } from '../types';
import { CollapsibleToggle } from './common';
import {
  DefecationColor,
  DefecationOptional,
  DefecationPain,
  DefecationShape,
  DefecationTimeTaken,
} from './select-defecation';

export const DefecationDetail = () => {
  const [openId, setOpenId] = useState<DefecationTryDetailKey | null>(null);

  const handleToggle = (id: DefecationTryDetailKey) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  const renderSelectSection = (value: DefecationTryDetailKey) => {
    switch (value) {
      case 'COLOR':
        return <DefecationColor onColorSelect={() => setOpenId('SHAPE')} />;
      case 'SHAPE':
        return <DefecationShape onShapeSelect={() => setOpenId('PAIN')} />;
      case 'PAIN':
        return <DefecationPain onPainSelect={() => setOpenId('TIME_TAKEN')} />;
      case 'TIME_TAKEN':
        return (
          <DefecationTimeTaken
            onTimeTakenSelect={() => setOpenId('OPTIONAL')}
          />
        );
      case 'OPTIONAL':
        return <DefecationOptional isOpen={openId === 'OPTIONAL'} />;
      default:
        return <DefecationColor />;
    }
  };

  return (
    <>
      {Object.entries(DEFECATION_DETAIL).map(([key, value]) => (
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
