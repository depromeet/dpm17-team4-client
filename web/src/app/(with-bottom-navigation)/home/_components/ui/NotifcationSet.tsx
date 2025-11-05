import Image from 'next/image';
import RemindPng from '@/assets/home/notification-remind.png';
import { Button } from '@/components';

interface NotifcationSetProps {
  onEnableNotification: () => void;
  onSkip: () => void;
}

const NotifcationSet = ({
  onEnableNotification,
  onSkip,
}: NotifcationSetProps) => {
  return (
    <div className="flex flex-col items-center justify-center mt-4 mb-12 px-4">
      <p className="text-lg font-semibold text-white mb-5">
        기록을 놓치지 않도록
        <br /> 알림을 보내드릴게요!
      </p>
      <Image
        src={RemindPng}
        alt="알림 설정 리마인드 이미지"
        className="w-full h-full object-cover mb-3"
      />
      <p className="text-body3-m text-[#707885] text-center mb-6">
        기록 리마인드와 리포트 생성 알림을
        <br />앱 푸시로 받아보세요
      </p>
      <div className="flex flex-col items-center justify-center w-full">
        <Button
          size="56"
          color="primary"
          fullWidth
          onClick={onEnableNotification}
        >
          알림 켜기
        </Button>
        <button
          type="button"
          className="flex items-center justify-center w-full py-[19px]"
          onClick={onSkip}
        >
          <p className="text-button-2 text-[#707885]">다음에</p>
        </button>
      </div>
    </div>
  );
};

export default NotifcationSet;
