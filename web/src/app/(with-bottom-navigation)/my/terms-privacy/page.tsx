'use client';

import { Navigator } from '@/components/Navigator';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ChevronRight from '@/assets/home/IC_Chevron_Right.png';
import { PAGE_ROUTES } from '@/constants/route.constants';

const TermsPrivacyPage = () => {
  const router = useRouter();

  const handleTermsClick = () => {
    router.push(`${PAGE_ROUTES.TERMS}?type=service`);
  };

  const handlePrivacyClick = () => {
    router.push(`${PAGE_ROUTES.TERMS}?type=privacy-policy`);
  };

  return (
    <div className="min-h-screen bg-[#121213]">
      <Navigator>
        <Navigator.Center>약관 및 개인정보</Navigator.Center>
      </Navigator>
      
      {/* Content */}
      <div className="pt-[56px] text-white text-body2-sb">
        {/* 이용약관 */}
         <div 
           className="flex items-center justify-between px-4 py-4 cursor-pointer hover:bg-gray-800/50 transition-colors"
           onClick={handleTermsClick}
         >
           <span>이용약관</span>
           <Image
             src={ChevronRight}
             alt="chevron right"
             className="w-5 h-5"
           />
         </div>
         
         {/* 개인정보 처리방침 */}
         <div 
           className="flex items-center justify-between px-4 py-4 cursor-pointer hover:bg-gray-800/50 transition-colors"
           onClick={handlePrivacyClick}
         >
           <span>개인정보 처리방침</span>
           <Image
             src={ChevronRight}
             alt="chevron right"
             className="w-5 h-5"
           />
         </div>
      </div>
    </div>
  );
};

export default TermsPrivacyPage;
