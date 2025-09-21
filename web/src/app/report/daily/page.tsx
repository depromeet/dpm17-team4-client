'use client';

import { Banana, Droplets, FileText } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { mockReportData } from './mockData';
import type { Card, ReportPeriod } from './types';
import {
  formatDate,
  getColorLabel,
  getMealTimeIcon,
  getMealTimeLabel,
  getScoreColor,
  getShapeLabel,
  getWaterLevelLabel,
  getWaterNameLabel,
} from './utils';

export default function DailyReportPage() {
  const [selectedPeriod, _setSelectedPeriod] = useState<ReportPeriod>('daily');
  const [selectedDate, _setSelectedDate] = useState(new Date());
  const [cardIndex, setCardIndex] = useState(0);

  // NOTE(seonghyun): Mock 데이터 사용
  const reportData = mockReportData;

  // NOTE(seonghyun): 임시 - Suggestion 아이템의 이미지를 동적으로 생성
  const getSuggestionIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Droplets className="w-6 h-6 text-blue-400" />;
      case 1:
        return <Banana className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <FileText className="w-6 h-6 text-white" />;
      default:
        return null;
    }
  };

  // TODO(seonghyun): 카드 데이터 - API 응답에서 생성
  const cards: Card[] = [
    {
      type: 'character',
      content: {
        character: reportData.poo.summary.image,
        badge: reportData.poo.summary.caption,
        title: reportData.poo.summary.message,
      },
    },
    ...reportData.poo.items.map((item, index) => ({
      type: 'text' as const,
      content: {
        badge: String(index + 1).padStart(2, '0'),
        date: new Date(item.occurredAt).toLocaleString('ko-KR', {
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          hour12: true,
        }),
        advisory: item.message,
        tags: [
          [
            getColorLabel(item.color),
            getShapeLabel(item.shape),
            `${item.duration}분 이상 소요`,
          ],
          [`복통 정도 ${item.pain}%`, item.note],
        ],
      },
    })),
  ];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCardIndex((prev) => (prev + 1) % cards.length);
    } else {
      setCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart(touch.clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touch = e.changedTouches[0];
    const touchEnd = touch.clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      // 최소 스와이프 거리
      if (diff > 0) {
        handleSwipe('left'); // 왼쪽으로 스와이프 (다음 카드)
      } else {
        handleSwipe('right'); // 오른쪽으로 스와이프 (이전 카드)
      }
    }

    setTouchStart(null);
  };

  const [touchStart, setTouchStart] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 헤더 */}
      <header className="flex items-center justify-between px-4 py-4">
        <h1 className="text-xl font-bold">리포트</h1>
        {/*TODO(seonghyun): notification*/}
        {/*<Bell className="w-6 h-6" />*/}
      </header>

      {/* 세그먼트 컨트롤 */}
      <div className="px-4">
        <div className="flex bg-gray-800 rounded-lg p-1">
          {[
            { key: 'daily', label: '일간' },
            { key: 'weekly', label: '주간' },
            { key: 'monthly', label: '월간' },
          ].map((period) => (
            <button
              type="button"
              key={period.key}
              onClick={() => {
                // TODO(seonghyun): 주간, 월간
                // setSelectedPeriod(period.key as ReportPeriod)
              }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                selectedPeriod === period.key
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* 날짜 네비게이션 */}
      <div className="flex items-center justify-center gap-4 px-4 py-4 mt-4 mb-2">
        {/* TODO(seonghyun): 다른 날짜 이동 */}
        {/*<button className="p-2">*/}
        {/*  <ChevronLeft className="w-5 h-5" />*/}
        {/*</button>*/}
        <span className="text-body2-m">{formatDate(selectedDate)}</span>
        {/*<button className="p-2">*/}
        {/*  <ChevronRight className="w-5 h-5" />*/}
        {/*</button>*/}
      </div>

      {/* 메인 콘텐츠 */}
      <main className="px-4 pb-20">
        {/* 캐러셀 컨테이너 */}
        <div className="relative overflow-hidden w-full max-w-[400px] mx-auto">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(calc(50% - 125.5px - ${cardIndex * 251}px))`, // 중앙 정렬을 위한 오프셋 조정
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {cards.map((card, index) => (
              <button
                type="button"
                key={`card-${card.type}-${index}`}
                className="w-[251px] h-[328px] rounded-2xl text-center relative overflow-hidden flex-shrink-0 cursor-pointer transition-all duration-300"
                style={{
                  background:
                    card.type === 'character'
                      ? 'linear-gradient(to bottom, #FF535F 0%, #A4141E 100%)'
                      : '#ffffff',
                  padding: '36px 12px',
                  transform: `scale(${index === cardIndex ? 1 : 0.85})`,
                  opacity: index === cardIndex ? 1 : 0.6,
                }}
                onClick={() => setCardIndex(index)}
              >
                <div className="relative z-10 h-full flex flex-col justify-center">
                  {card.type === 'character' ? (
                    <>
                      {/* 캐릭터 이미지 */}
                      <div className="w-[227px] h-[162px] mx-auto mb-4 relative">
                        <Image
                          src={card.content.character}
                          alt="화가 난 대장 캐릭터"
                          width={227}
                          height={162}
                          className="w-full h-full object-contain"
                          priority
                        />
                      </div>

                      <div
                        className="text-white text-body4-m inline-block mb-2 w-fit mx-auto"
                        style={{
                          backgroundColor: '#D13742',
                          paddingTop: '6px',
                          paddingRight: '16px',
                          paddingBottom: '6px',
                          paddingLeft: '16px',
                          borderRadius: '40px',
                        }}
                      >
                        {card.content.badge}
                      </div>

                      <h2 className="text-xl font-bold mb-2 text-white">
                        {card.content.title}
                      </h2>
                    </>
                  ) : (
                    <>
                      {/* 텍스트 카드 */}
                      <div
                        className="text-white mx-auto mb-4 w-8 h-8 flex items-center justify-center p-1.5"
                        style={{
                          backgroundColor: '#F13A49',
                          borderRadius: '999px',
                        }}
                      >
                        <span
                          className="font-bold"
                          style={{ fontSize: '11px' }}
                        >
                          {card.content.badge}
                        </span>
                      </div>

                      <h2 className="text-red-500 font-bold text-lg mb-4">
                        {card.type === 'text' ? card.content.date : ''}
                      </h2>

                      <p className="text-gray-400 text-body3-m mb-6 leading-relaxed">
                        {card.type === 'text' ? card.content.advisory : ''}
                      </p>

                      <div className="space-y-2">
                        {card.type === 'text' &&
                          card.content.tags?.map(
                            (row: string[], rowIndex: number) => (
                              <div
                                key={`tag-row-${row.join('-')}-${rowIndex}`}
                                className="flex flex-wrap gap-2 justify-center"
                              >
                                {row.map((tag, _tagIndex) => (
                                  <span
                                    key={`tag-${tag}`}
                                    className="text-body3-m"
                                    style={{
                                      paddingTop: '4px',
                                      paddingRight: '12px',
                                      paddingBottom: '4px',
                                      paddingLeft: '12px',
                                      borderRadius: '6px',
                                      backgroundColor: '#A5A5A533',
                                      color: '#707885',
                                    }}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )
                          )}
                      </div>
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 스와이프 인디케이터 */}
        <div className="flex justify-center gap-2 my-3">
          {cards.map((card, index) => (
            <div
              key={`indicator-${card.type}-${index}`}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === cardIndex ? 'bg-white' : 'bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* 업데이트 시간 - 카드 밖 하단 */}
        <p className="text-gray-400 text-sm text-center mt-2">
          {new Date(reportData.updatedAt).toLocaleString('ko-KR', {
            month: 'long',
            day: 'numeric',
            weekday: 'short',
            hour: 'numeric',
          })}{' '}
          업데이트
        </p>

        {/* 배변 점수 */}
        <div className="bg-gray-800 rounded-xl p-4 mt-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">배변 점수</h3>
            <span className="text-2xl font-bold">{reportData.poo.score}점</span>
          </div>

          <div className="mb-3">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getScoreColor(reportData.poo.score)}`}
                style={{ width: `${reportData.poo.score}%` }}
              ></div>
            </div>
          </div>

          <div className="flex justify-between text-xs text-gray-400">
            <span>매우 나쁨</span>
            <span>나쁨</span>
            <span>보통</span>
            <span>좋음</span>
            <span>매우 좋음</span>
          </div>
        </div>

        {/* 식단 분석 결과 */}
        <div className="bg-gray-800 rounded-xl p-4 mt-6">
          <h3 className="text-lg font-semibold mb-3">식단 분석 결과</h3>
          <p className="text-gray-300 mb-3">{reportData.food.message}</p>
          <p className="text-sm text-gray-400 mb-4">9월 16일 화요일, 어제</p>

          <div className="space-y-3">
            {reportData.food.items[0].meals.map((meal, index) => (
              <div
                key={`meal-${meal.mealTime}-${index}`}
                className="flex items-center gap-3"
              >
                <span className="text-lg">
                  {getMealTimeIcon(meal.mealTime)}
                </span>
                <span className="text-sm text-gray-300 w-12">
                  {getMealTimeLabel(meal.mealTime)}
                </span>
                {meal.dangerous && (
                  <span className="text-xs px-2 py-1 rounded text-red-500">
                    주의
                  </span>
                )}
                <span className="text-sm text-gray-200">
                  {meal.foods.join(', ')}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <span className="text-xs text-gray-400">&lt; 1/2 &gt;</span>
          </div>
        </div>

        {/* 물 섭취량 분석 결과 */}
        <div className="bg-gray-800 rounded-xl p-4 mt-6">
          <h3 className="text-lg font-semibold mb-3">물 섭취량 분석 결과</h3>
          <p className="text-gray-300 mb-4">{reportData.water.message}</p>

          <div className="flex items-end justify-center gap-4 mb-2">
            {reportData.water.items.map((item, index) => (
              <div
                key={`water-${item.name}-${index}`}
                className="flex flex-col items-center"
              >
                <div
                  className={`w-8 h-${Math.round(item.value / 100)} rounded-t mb-2`}
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-xs text-gray-400">
                  {getWaterNameLabel(item.name)}
                </span>
                <span className="text-sm font-medium">{item.value}ml</span>
                <span className="text-xs text-gray-500">
                  {getWaterLevelLabel(item.level)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 스트레스 분석 결과 */}
        <div className="bg-gray-800 rounded-xl p-4 mt-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-3">스트레스 분석 결과</h3>
              <p className="text-gray-300">{reportData.stress.message}</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-1">{reportData.stress.image}</span>
              <span className="text-lg">✨</span>
            </div>
          </div>
        </div>

        {/* 추천 습관 */}
        <div className="bg-gray-800 rounded-xl p-4 mt-6">
          <h3 className="text-lg font-semibold mb-2">추천 습관</h3>
          <p className="text-sm text-gray-400 mb-4">
            {reportData.suggestion.message}
          </p>

          <div className="space-y-4">
            {reportData.suggestion.items.map((habit, index) => (
              <div
                key={`suggestion-${habit.title}-${index}`}
                className="flex items-start gap-3"
              >
                <div className="mt-1">{getSuggestionIcon(index)}</div>
                <div>
                  <p className="text-sm font-medium mb-1">{habit.title}</p>
                  <p className="text-xs text-gray-400">{habit.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 하단 네비게이션 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700">
        <div className="flex justify-around py-2">
          {[
            { icon: '🏠', label: '홈' },
            { icon: '🗓️', label: '캘린더' },
            { icon: '📄', label: '리포트', active: true },
            { icon: '👤', label: '마이' },
          ].map((item, index) => (
            <button
              type="button"
              key={`nav-${item.label}-${index}`}
              className={`flex flex-col items-center py-2 px-4 ${
                item.active ? 'text-white' : 'text-gray-400'
              }`}
            >
              <span className="text-lg mb-1">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
