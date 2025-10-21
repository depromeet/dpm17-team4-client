'use client';
import Image from 'next/image';
import kakaoSymbol from '@/assets/auth/kakao_shape 2.svg';
import { SpeechBubbleIcon } from '@/components';

const KakaoLoginButton = () => {
  return (
    <>
      <SpeechBubbleIcon className="translate-y-[0.47rem] translate-x-[15.5rem]">
        가장 간편!
      </SpeechBubbleIcon>
      <button
        type="submit"
        className="flex w-[21.4375rem] h-[3.5rem] px-6 items-center gap-1 flex-shrink-0 rounded-[0.625rem] bg-[#FEE500] text-black hover:bg-[#E6CF00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
      >
        <Image
          src={kakaoSymbol}
          alt=""
          aria-hidden
          className="w-[1.18806rem] h-[1.12206rem]"
        />
        <span className="text-button-2 font-semibold flex-1 justify-center">
          카카오톡으로 로그인
        </span>
      </button>
    </>
  );
};

export default KakaoLoginButton;
