'use client';

import {forwardRef, useCallback, useEffect, useImperativeHandle, useState} from 'react';
import type { DefecationDataResponseDto } from '@/types/dto/defecation.dto';
import { DEFECATION_DETAIL, SCROLL_DELAY } from '../constants';
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
  data?: DefecationDataResponseDto;
  colorRef?: (el: HTMLDivElement | null) => void;
}

export interface DefecationDetailRef {
  openColorSection: () => void;
  closeColorSection: () => void;
}

export const DefecationDetail = forwardRef<
  DefecationDetailRef,
  DefecationDetailProps
>(({ data, colorRef }, ref) => {
  const [openId, setOpenId] = useState<DefecationTryDetailKey | null>(null);
  const { setRef, scrollToSection } =
    useScrollToSection<DefecationTryDetailKey>();

  // ref를 통해 외부에서 호출할 수 있는 함수들
  useImperativeHandle(ref, () => ({
    openColorSection: () => {
      setOpenId('COLOR');
      scrollToSection('COLOR');
    },
    closeColorSection: () => {
      setOpenId(null);
    },
  }));

    useEffect(() => {
        setTimeout(()=>{
            setOpenId('COLOR');
        },)
    }, []);

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

  const onColorSelect = useCallback(() => {
    setTimeout(() => {
      handleSectionChange('SHAPE');
    }, SCROLL_DELAY);
  }, [handleSectionChange]);
  const onShapeSelect = useCallback(() => {
    setTimeout(() => {
      handleSectionChange('PAIN');
    }, SCROLL_DELAY);
  }, [handleSectionChange]);
  const onPainSelect = useCallback(() => {
    setTimeout(() => {
      handleSectionChange('TIME_TAKEN');
    }, SCROLL_DELAY);
  }, [handleSectionChange]);
  const onTimeTakenSelect = useCallback(() => {
    setTimeout(() => {
      handleSectionChange('OPTIONAL');
    }, SCROLL_DELAY);
  }, [handleSectionChange]);
  const onOptionalSelect = useCallback(() => {
    setTimeout(() => {
      handleSectionChange(null);
    }, SCROLL_DELAY);
  }, [handleSectionChange]);

  const renderSelectSection = (value: DefecationTryDetailKey) => {
    switch (value) {
      case 'COLOR':
        return (
          <DefecationColor
            color={data?.data.color}
            onColorSelect={onColorSelect}
          />
        );
      case 'SHAPE':
        return (
          <DefecationShape
            shape={data?.data.shape}
            onShapeSelect={onShapeSelect}
          />
        );
      case 'PAIN':
        return (
          <DefecationPain pain={data?.data.pain} onPainSelect={onPainSelect} />
        );
      case 'TIME_TAKEN':
        return (
          <DefecationTimeTaken
            timeTaken={data?.data.duration}
            onTimeTakenSelect={onTimeTakenSelect}
          />
        );
      case 'OPTIONAL':
        return (
          <DefecationOptional
            note={data?.data.note}
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
            trigger={value}
          >
            <div className="flex flex-col gap-4">
              {renderSelectSection(key as DefecationTryDetailKey)}
            </div>
          </CollapsibleToggle>
        </div>
      ))}
    </>
  );
});
