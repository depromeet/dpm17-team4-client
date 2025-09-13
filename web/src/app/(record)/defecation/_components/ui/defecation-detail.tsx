'use client';

import { useState } from 'react';
import { DEFECATION_DETAIL } from '../constants';
import { useScrollToSection } from '../hooks/useScrollToSection';
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
  const { setRef, scrollToSection } =
    useScrollToSection<DefecationTryDetailKey>();

  const handleSectionChange = (id: DefecationTryDetailKey | null) => {
    setOpenId(id);
    if (id) {
      scrollToSection(id);
    }
  };

  const handleToggle = (id: DefecationTryDetailKey) => {
    const newOpenId = openId === id ? null : id;
    handleSectionChange(newOpenId);
  };

  const renderSelectSection = (value: DefecationTryDetailKey) => {
    switch (value) {
      case 'COLOR':
        return (
          <DefecationColor onColorSelect={() => handleSectionChange('SHAPE')} />
        );
      case 'SHAPE':
        return (
          <DefecationShape onShapeSelect={() => handleSectionChange('PAIN')} />
        );
      case 'PAIN':
        return (
          <DefecationPain
            onPainSelect={() => handleSectionChange('TIME_TAKEN')}
          />
        );
      case 'TIME_TAKEN':
        return (
          <DefecationTimeTaken
            onTimeTakenSelect={() => handleSectionChange('OPTIONAL')}
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
        <div key={key} ref={setRef(key as DefecationTryDetailKey)}>
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
