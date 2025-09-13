import {
  DefecationAttempt,
  DefecationDetail,
  DefecationTime,
} from './_components/ui';

export default function DefecationPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 pt-17 pb-[156px] select-none">
      <div className="text-start space-y-6">
        {/* 배변 시간 선택 영역 */}
        <DefecationTime />

        {/* 배변 시도 기록 영역 */}
        <DefecationAttempt />

        {/* 배변 내용 상세 기록 영역 */}
        <DefecationDetail />
      </div>
    </div>
  );
}
