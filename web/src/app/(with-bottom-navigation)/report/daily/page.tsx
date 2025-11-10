'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import poop from '@/assets/report/poop.png';
import emojiOpenMouse from '@/assets/report/emoji_open_mouse.png';
import newsPaper from '@/assets/report/newspaper.png';
import { useNavigationContext } from '@/contexts/NavigationContext';
import { useReportQuery } from '@/hooks/queries/useReportQuery';
import { StressReport } from '../_components/StressReport';
import { WaterReport } from '../_components/WaterReport';
import { DefecationScore } from './_components/DefecationScore';
import { FoodReport } from './_components/FoodReport';
import { NullReport } from './_components/NullReport';
import type { Card } from './types';
import { formatDate, getColorLabel, getShapeLabel } from './utils';

// import { Suggestions } from './_components/Suggestions';

function DailyReportContent() {
  const [cardIndex, setCardIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const toastShownRef = useRef(false);
  const { handleTabClick } = useNavigationContext();

  const dateParam = searchParams.get('date');

  console.log('dateParam', dateParam);
  useEffect(() => {
    handleTabClick('report');
  }, [handleTabClick]);

  const {
    data: reportData,
    isLoading,
    error,
  } = useReportQuery(dateParam ? { dateTime: dateParam } : undefined);
  const { handleOnNotification: onAlert } = useNavigationContext();

  // Toast 표시를 위한 별도 useEffect
  useEffect(() => {
    if (toastShownRef.current) return;

    if (searchParams.get('toast-lifestyle')) {
      toast.success('새로운 생활 기록이 등록되었어요!', {
        position: 'top-center',
      });
      onAlert();
      toastShownRef.current = true;
    }
    if (searchParams.get('toast-defecation')) {
      toast.success('새로운 배변 기록이 등록되었어요!', {
        position: 'top-center',
      });
      onAlert();
      toastShownRef.current = true;
    }
  }, [searchParams, onAlert]);

  // NOTE(seonghyun): 임시 - Suggestion 아이템의 이미지를 동적으로 생성
  // const getSuggestionIcon = (index: number) => {
  //     switch (index) {
  //       case 0:
  //         return <Droplets className="w-6 h-6 text-blue-400" />;
  //       case 1:
  //         return <Banana className="w-6 h-6 text-yellow-400" />;
  //       case 2:
  //         return <FileText className="w-6 h-6 text-white" />;
  //       default:
  //         return null;
  //     }
  //   };

  // TODO(seonghyun): 카드 데이터 - API 응답에서 생성
  const cards: Card[] =
    reportData?.poo && reportData.poo.items.length > 0
      ? [
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
        ]
      : [];

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

  if(reportData === undefined ) return;

  const hasPooData = reportData?.poo !== null;
  const hasFoodData = reportData?.food?.items?.length > 0;
  const hasWaterData = reportData?.water !== null;
  const hasStressData = reportData?.stress !== null;
  const hasLifestyleData = hasFoodData || hasWaterData || hasStressData;
  const hasNoDataAtAll = !hasPooData && !hasLifestyleData;

  return (
    <>
      {/* 날짜 네비게이션 */}
      <div className="flex items-center justify-center gap-4 px-4 py-4 mt-4 mb-2">
        {/* TODO(seonghyun): 다른 날짜 이동 */}
        {/*<button className="p-2">*/}
        {/*  <ChevronLeft className="w-5 h-5" />*/}
        {/*</button>*/}
        <span className="text-body2-m">
          {formatDate(new Date(String(reportData?.updatedAt)))}
        </span>
        {/*<button className="p-2">*/}
        {/*  <ChevronRight className="w-5 h-5" />*/}
        {/*</button>*/}
      </div>
      {isLoading && (
        // 로딩 상태 처리
        <div className="flex items-center justify-center h-40">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-gray-400">리포트를 불러오는 중...</p>
          </div>
        </div>
      )}

      {error && (
        // 에러 상태 처리
        <div className="flex items-center justify-center h-40">
          <div className="text-center">
            <p className="text-red-400 mb-4">
              리포트를 불러오는데 실패했습니다.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              다시 시도
            </button>
          </div>
        </div>
      )}

      {/* 모든 데이터 없을 떄 */}
       {hasNoDataAtAll && (
        <NullReport mode="all" nullIcon={newsPaper} />
      )}
      {/* 메인 콘텐츠 */}
        {!hasNoDataAtAll && <main className="px-4 pb-20">

          {hasPooData ? 
            <>
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
                            ? `linear-gradient(to bottom, ${reportData.poo.summary.backgroundColors[0]} 0%, ${reportData.poo.summary.backgroundColors[1]} 100%)`
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
                                backgroundColor:
                                  reportData.poo.summary.backgroundColors[0],
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
                                backgroundColor:
                                  reportData.poo.summary.backgroundColors[0],
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

                            <h2
                              className="font-bold text-lg mb-4"
                              style={{
                                color:
                                  reportData.poo.summary.backgroundColors[0],
                              }}
                            >
                              {card.type === 'text' ? card.content.date : ''}
                            </h2>

                            <p className="text-gray-400 text-body3-m mb-6 leading-relaxed">
                              {card.type === 'text'
                                ? card.content.advisory
                                : ''}
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
              {reportData.poo && (
                <DefecationScore score={reportData.poo.score} />
              )}
            </>
            : (
            <NullReport
              mode="defecation"
              nullIcon={poop}
              title="배변"
              description="배변 점수는 배변 기록이 있어야 확인할 수 있어요."
            />
          )
        }
          {hasLifestyleData ? (
            <div className="flex flex-col space-y-5 mt-5">
              <FoodReport foodData={reportData.food} />
              {reportData.water && (
                <WaterReport waterData={reportData.water} type="daily" />
              )}
              {reportData.stress && (
                <StressReport stressData={reportData.stress} type="daily" />
              )}
              {/* //NOTE(taehyeon): 일간 리포트에는 추천 습관 영역 제거 (만약 대비 주석 처리) */}
              {/* {reportData.suggestion && (
                <Suggestions suggestion={reportData.suggestion} />
              )} */}
            </div>
          ) : (
            <NullReport
              mode="lifestyle"
              nullIcon={emojiOpenMouse}
              title="생활"
              description="생활을 기록하면 더 자세한 분석을 얻을 수 있어요"
            />
          )}
        </main>}
    </>
  );
}

export default function DailyReportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          로딩 중...
        </div>
      }
    >
      <DailyReportContent />
    </Suspense>
  );
}
