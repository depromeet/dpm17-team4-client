import Image from 'next/image';
import { useState } from 'react';
import illust1 from '@/assets/home/illust1.png';
import illust2 from '@/assets/home/illust2.png';
import x from '@/assets/home/x.png';
import { cn } from '@/utils/utils-cn';

const TUTORIAL_CONTENTS = [
  {
    id: 0,
    title: '빠르게 배변/생활을 기록하기',
    description: ` 당일이 아닌 지난 날도 상관없어요.<br/>패턴 파악을 위해 차곡차곡 기록을 보세요!`,
    illust: illust1,
  },
  {
    id: 1,
    title: '리포트를 통한 패턴 파악',
    description: `일간, 주간, 월간 리포트를 통해<br/>나의 배변 패턴을 파악하고 개선해가요!`,
    illust: illust2,
  },
];

interface TutorialProps {
  onClose: () => void;
}

const Tutorial = ({ onClose }: TutorialProps) => {
  const [step, setStep] = useState(0);

  const handleNextStep = () => {
    if (step < TUTORIAL_CONTENTS.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      onClose();
    }
  };
  const handlePreviousStep = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const current = TUTORIAL_CONTENTS[step];

  const isLastStep = step === TUTORIAL_CONTENTS.length - 1;
  const isFirstStep = step === 0;
  const buttonText = isLastStep ? '닫기' : '다음';

  return (
    <>
      <Image
        src={x}
        alt="x아이콘"
        className="absolute -top-7 right-0"
        width={28}
        height={28}
        onClick={onClose}
      />

      <div id={`tutorial-step-${current.id}`} className="flex flex-col h-full">
        <Image src={current.illust} alt={`튜토리얼 이미지${current.id}`} />

        <div className="p-5 flex flex-col gap-10 flex-grow">
          <section className="flex flex-col justify-center items-center gap-2">
            <h2 className="text-body2-sb">{current.title}</h2>
            <p
              className="text-body3-m text-gray-600 text-center"
              /* biome-ignore lint/security/noDangerouslySetInnerHtml: static copy only */
              dangerouslySetInnerHTML={{ __html: current.description }}
            />
          </section>
        </div>

        <section className="flex justify-between items-center p-5">
          <button
            type="button"
            className={`text-body4-sb min-w-[43px] ${isFirstStep ? "text-gray-300" : "text-gray-600"}`}
            onClick={handlePreviousStep}
            disabled={isFirstStep}
          >
            이전
          </button>
          <div className="flex gap-[5px]">
            {TUTORIAL_CONTENTS.map((item) => (
              <span
                key={item.id}
                className={cn(
                  'w-[5px] h-[5px] block rounded-full',
                  item.id === step ? 'bg-primary-600' : 'bg-gray-300'
                )}
              />
            ))}
          </div>

          <button
            type="button"
            className="text-body4-sb text-gray-600 min-w-[43px]"
            onClick={handleNextStep}
          >
            {buttonText}
          </button>
        </section>
      </div>
    </>
  );
};

export default Tutorial;
