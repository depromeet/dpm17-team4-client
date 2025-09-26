'use client';

import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { DEFECATION_DETAIL } from '../constants';
import { useScrollToSection } from '../hooks';
import type { DefecationTryDetailKey } from '../types';
import { CollapsibleToggle } from './common';
import {
  DefecationColor,
  DefecationOptional,
  DefecationPain,
  DefecationShape,
  DefecationTimeTaken,
  SelectPreview,
} from './select-defecation';

interface DefecationDetailProps {
  colorRef?: (el: HTMLDivElement | null) => void;
}

export interface DefecationDetailRef {
  openColorSection: () => void;
}

export const DefecationDetail = forwardRef<
  DefecationDetailRef,
  DefecationDetailProps
>(({ colorRef }, ref) => {
  const [openId, setOpenId] = useState<DefecationTryDetailKey | null>(null);
  const { setRef, scrollToSection } =
    useScrollToSection<DefecationTryDetailKey>();

  // ref를 통해 외부에서 호출할 수 있는 함수들
  useImperativeHandle(ref, () => ({
    openColorSection: () => {
      setOpenId('COLOR');
      scrollToSection('COLOR');
    },
  }));

  const handleSectionChange = useCallback(
    (id: DefecationTryDetailKey | null) => {
      setOpenId(id);
      if (id) {
        scrollToSection(id);
      }
    },
    [scrollToSection]
  );

  const handleToggle = useCallback(
    (id: DefecationTryDetailKey) => {
      const newOpenId = openId === id ? null : id;
      handleSectionChange(newOpenId);
    },
    [openId, handleSectionChange]
  );

  const onColorSelect = useCallback(
    () => handleSectionChange('SHAPE'),
    [handleSectionChange]
  );
  const onShapeSelect = useCallback(
    () => handleSectionChange('PAIN'),
    [handleSectionChange]
  );
  const onPainSelect = useCallback(
    () => handleSectionChange('TIME_TAKEN'),
    [handleSectionChange]
  );
  const onTimeTakenSelect = useCallback(
    () => handleSectionChange('OPTIONAL'),
    [handleSectionChange]
  );
  const onOptionalSelect = useCallback(
    () => handleSectionChange(null),
    [handleSectionChange]
  );

  const renderSelectSection = (value: DefecationTryDetailKey) => {
    switch (value) {
      case 'COLOR':
        return <DefecationColor onColorSelect={onColorSelect} />;
      case 'SHAPE':
        return <DefecationShape onShapeSelect={onShapeSelect} />;
      case 'PAIN':
        return <DefecationPain onPainSelect={onPainSelect} />;
      case 'TIME_TAKEN':
        return <DefecationTimeTaken onTimeTakenSelect={onTimeTakenSelect} />;
      case 'OPTIONAL':
        return (
          <DefecationOptional
            isOpen={openId === 'OPTIONAL'}
            onOptionalSelect={onOptionalSelect}
          />
        );
      default:
        return <DefecationColor />;
    }
  };

  return (
    <>
      {Object.entries(DEFECATION_DETAIL).map(([key, value]) => (
        <div
          key={key}
          ref={
            key === 'COLOR' && colorRef
              ? colorRef
              : setRef(key as DefecationTryDetailKey)
          }
        >
          <CollapsibleToggle
            id={key}
            isOpen={openId === key}
            onToggle={() => {
              handleToggle(key as DefecationTryDetailKey);
            }}
            previewr={<SelectPreview currentKey={key} />}
            trigger={<p className="text-button-1">{value}</p>}
          >
            <div>{renderSelectSection(key as DefecationTryDetailKey)}</div>
          </CollapsibleToggle>
        </div>
      ))}
    </>
  );
});
