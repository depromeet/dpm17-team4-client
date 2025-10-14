'use client';

import { useState } from 'react';
import { DefecationRecordBottomSheet } from './components/DefecationRecordBottomSheet';

export default function CalendarPage() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [hasRecords, setHasRecords] = useState(false);
  const [records, _setRecords] = useState([
    { id: '1', time: '09:00', type: 'morning' as const },
    { id: '2', time: '11:00', type: 'morning' as const },
    { id: '3', time: '13:00', type: 'afternoon' as const },
    { id: '4', time: '19:00', type: 'evening' as const },
    { id: '5', time: '22:00', type: 'evening' as const },
  ]);

  const toggleRecords = () => {
    setHasRecords(!hasRecords);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-h3 text-white mb-6 text-center">
          DefecationRecordBottomSheet 테스트
        </h1>

        {/* 테스트 컨트롤 */}
        <div className="space-y-4 mb-6">
          <button
            type="button"
            onClick={() => setIsBottomSheetOpen(true)}
            className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-500"
          >
            BottomSheet 열기
          </button>

          <button
            type="button"
            onClick={toggleRecords}
            className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-500"
          >
            {hasRecords ? '기록 없음으로 변경' : '기록 있음으로 변경'}
          </button>
        </div>

        {/* 현재 상태 표시 */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-body1-sb text-white mb-2">현재 상태</h2>
          <p className="text-body2-m text-gray-300">
            기록 상태: {hasRecords ? '있음' : '없음'}
          </p>
          <p className="text-body2-m text-gray-300">
            BottomSheet: {isBottomSheetOpen ? '열림' : '닫힘'}
          </p>
          {hasRecords && (
            <div className="mt-2">
              <p className="text-body3-m text-gray-400">기록 목록:</p>
              <ul className="text-body3-m text-gray-400 ml-4">
                {records.map((record) => (
                  <li key={record.id}>- {record.time}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* DefecationRecordBottomSheet */}
        <DefecationRecordBottomSheet
          isOpen={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
          date={new Date(2025, 8, 14)} // 2024년 9월 14일
          hasRecords={hasRecords}
          records={hasRecords ? records : []}
        />
      </div>
    </div>
  );
}
