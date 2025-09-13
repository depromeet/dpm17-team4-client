import {
  DefecationAttempt,
  DefecationDetail,
  DefecationSubmit,
  DefecationTime,
} from './_components/ui';

export default function DefecationPage() {
  return (
    <div className="min-h-screen bg-[#17171C] text-white px-4 pt-17 pb-12">
      <div className="text-start space-y-6">
        {/* 배변 시간 선택 영역 */}
        <DefecationTime />
        {/* 배변 시도 기록 영역 */}
        <DefecationAttempt />
        {/* 배변 내용 상세 기록 영역 */}
        <DefecationDetail />
        {/* 저장 버튼 */}
        <DefecationSubmit />
      </div>
    </div>
  );
}
