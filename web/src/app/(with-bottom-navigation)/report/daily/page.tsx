'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import emojiOpenMouse from '@/assets/report/emoji_open_mouse.png';
import newsPaper from '@/assets/report/newspaper.png';
import poop from '@/assets/report/poop.png';
import { RefreshIcon } from '@/components';
import { useNavigationContext } from '@/contexts/NavigationContext';
import { useReportContext } from '@/contexts/ReportContext';
import { useReportQuery } from '@/hooks/queries/useReportQuery';
import { cn } from '@/utils/utils-cn';
import { formatToISOString, getKoreanDate } from '@/utils/utils-date';
import ReportNotice from '../_components/ReportNotice';
import { StressReport } from '../_components/StressReport';
import { WaterReport } from '../_components/WaterReport';
import { DefecationScore } from './_components/DefecationScore';
import { FoodReport } from './_components/FoodReport';
import { NullReport } from './_components/NullReport';
import { SelectDate } from './_components/SelectDate';
import type { Card } from './types';
import {
  getBackgroundColor,
  getCardDurationText,
  getCardTextColor,
  getColorLabel,
  getShapeLabel,
} from './utils';

function DailyReportContent() {
  const [cardIndex, setCardIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const toastShownRef = useRef(false);
  const { handleOnNotification: onAlert } = useNavigationContext();
  const { setHasPooData, setBackgroundColor } = useReportContext();

  const dateParam = searchParams.get('date');

  // 현재 날짜 상태 관리
  const currentDate = useMemo(() => {
    if (dateParam) {
      const [year, month, day] = dateParam.split('-').map(Number);
      if (
        Number.isInteger(year) &&
        Number.isInteger(month) &&
        Number.isInteger(day)
      ) {
        const parsedDate = new Date(year, month - 1, day);
        if (!Number.isNaN(parsedDate.getTime())) {
          return parsedDate;
        }
      }
    }

    return getKoreanDate();
  }, [dateParam]);

  // 날짜 변경 핸들러
  const handleDateChange = (newDate: Date) => {
    const dateString = formatToISOString(newDate);
    router.push(`/report/daily?date=${dateString}`);
    setCardIndex(0);
  };

  const {
    data: reportData,
    isLoading,
    error,
    refetch,
  } = useReportQuery(
    dateParam
      ? { dateTime: dateParam }
      : { dateTime: formatToISOString(currentDate) }
  );

  // Toast 표시를 위한 별도 useEffect
  useEffect(() => {
    if (toastShownRef.current) return;

    if (searchParams.get('toast-lifestyle')) {
      toast.success('새로운 생활 기록이 등록되었어요!', {
        position: 'top-center',
        style: {
          background: 'rgba(255,255,255,0.12)',
        },
      });
      onAlert();
      toastShownRef.current = true;
    }
    if (searchParams.get('toast-defecation')) {
      toast.success('새로운 배변 기록이 등록되었어요!', {
        style: {
          background: 'rgba(255,255,255,0.12)',
        },
        position: 'top-center',
      });
      onAlert();
      toastShownRef.current = true;
    }
    if (searchParams.get('toast-report') && reportData) {
      // 실제로 데이터가 있을 때만 리포트 생성 토스트 표시
      const hasPooData = reportData?.poo !== null;
      const hasFoodData = reportData?.food?.items?.length > 0;
      const hasWaterData = reportData?.water !== null;
      const hasStressData = reportData?.stress !== null;
      const hasAnyData =
        hasPooData || hasFoodData || hasWaterData || hasStressData;

      if (hasAnyData) {
        toast.success('새로운 리포트가 생성되었어요!', {
          position: 'top-center',
          style: {
            background: 'rgba(255,255,255,0.12)',
          },
        });
        onAlert();
        toastShownRef.current = true;
      }
    }
  }, [searchParams, onAlert, reportData]);

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
                  getCardDurationText(item.duration),
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

  useEffect(() => {
    if (reportData) {
      const hasPooData = reportData?.poo !== null;
      setHasPooData(hasPooData);
      if (hasPooData) {
        const backgroundColor = getBackgroundColor(
          reportData.poo.summary.caption
        );
        setBackgroundColor(backgroundColor);
      }
    }
  }, [reportData, setHasPooData, setBackgroundColor]);

  return (
    <div className="flex flex-col flex-1">
      {/* 날짜 네비게이션 */}
      <SelectDate currentDate={currentDate} onDateChange={handleDateChange} />
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
      {!isLoading &&
        !error &&
        reportData &&
        (() => {
          const hasPooData = reportData?.poo !== null;
          const hasFoodData = reportData?.food?.items?.length > 0;
          const hasWaterData = reportData?.water !== null;
          const hasStressData = reportData?.stress !== null;
          const hasLifestyleData = hasFoodData || hasWaterData || hasStressData;
          const hasNoDataAtAll = !hasPooData && !hasLifestyleData;
          return (
            <>
              {hasNoDataAtAll && <NullReport mode="all" nullIcon={newsPaper} />}
              {/* 메인 콘텐츠 */}
              {!hasNoDataAtAll && (
                <main className="pb-20">
                  {hasPooData ? (
                    <>
                      {/* 캐러셀 컨테이너 */}
                      <div className="relative overflow-hidden w-full mx-auto">
                        <div
                          className="flex transition-transform duration-300 ease-out"
                          style={{
                            transform: `translateX(calc(50% - 125.5px - ${
                              cardIndex * 251
                            }px))`, // 중앙 정렬을 위한 오프셋 조정
                          }}
                          onTouchStart={handleTouchStart}
                          onTouchEnd={handleTouchEnd}
                        >
                          {cards.map((card, index) => (
                            <button
                              type="button"
                              key={`card-${card.type}-${index}`}
                              className={cn(
                                `w-[251px] h-[328px] rounded-2xl text-center relative overflow-hidden flex-shrink-0 cursor-pointer transition-all duration-300`,
                                {
                                  'shadow-defecation-card':
                                    index === cardIndex &&
                                    card.type === 'character',
                                  'shadow-inner-glow': index !== cardIndex,
                                }
                              )}
                              style={{
                                background:
                                  card.type === 'character'
                                    ? index === cardIndex
                                      ? `linear-gradient(to bottom, ${reportData.poo.summary.backgroundColors[0]} 0%, ${reportData.poo.summary.backgroundColors[1]} 100%)`
                                      : 'linear-gradient(182deg, #505050 10.03%, #474444 94.23%)'
                                    : index === cardIndex
                                      ? '#ffffff'
                                      : 'linear-gradient(182deg, #505050 10.03%, #474444 94.23%)',
                                padding: '36px 12px',
                                transform: `scale(${index === cardIndex ? 1 : 0.85})`,
                                opacity: index === cardIndex ? 1 : 0.34,
                              }}
                              onClick={() => setCardIndex(index)}
                            >
                              <div className="relative z-10 h-full flex flex-col justify-center">
                                {card.type === 'character' ? (
                                  index === cardIndex ? (
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
                                            reportData.poo.summary
                                              .backgroundColors[0],
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
                                  ) : null
                                ) : index === cardIndex ? (
                                  <div className="h-[264px] flex flex-col justify-center">
                                    {/* 텍스트 카드 */}
                                    <div
                                      className="w-6 h-6 py-1.5 px-[5.5px] rounded-full text-white mx-auto mb-3 flex items-center justify-center"
                                      style={{
                                        backgroundColor: getCardTextColor(
                                          reportData.poo.summary.caption
                                        ),
                                      }}
                                    >
                                      <span
                                        className="font-bold"
                                        style={{ fontSize: '11px' }}
                                      >
                                        {card.content.badge}
                                      </span>
                                    </div>

                                    <p
                                      className="font-semibold text-lg mb-7"
                                      style={{
                                        color: getCardTextColor(
                                          reportData.poo.summary.caption
                                        ),
                                      }}
                                    >
                                      {card.type === 'text'
                                        ? card.content.date
                                        : ''}
                                    </p>

                                    <p className="text-[#707885] text-body3-m mb-7 w-[206px] mx-auto leading-[1.54] h-[88px]">
                                      {card.type === 'text'
                                        ? card.content.advisory
                                        : ''}
                                    </p>

                                    <div className="h-[60px] space-y-1">
                                      {card.type === 'text' &&
                                        card.content.tags?.map(
                                          (row: string[], rowIndex: number) => (
                                            <div
                                              key={`tag-row-${row.join(
                                                '-'
                                              )}-${rowIndex}`}
                                              className="flex gap-1 justify-center"
                                            >
                                              {row.map((tag, _tagIndex) => (
                                                <div
                                                  key={
                                                    tag
                                                      ? `tag-${tag}`
                                                      : `tag-${_tagIndex}`
                                                  }
                                                >
                                                  {tag && tag.length > 0 ? (
                                                    <span
                                                      className="text-body3-m whitespace-nowrap"
                                                      style={{
                                                        paddingTop: '4px',
                                                        paddingRight: '12px',
                                                        paddingBottom: '4px',
                                                        paddingLeft: '12px',
                                                        borderRadius: '6px',
                                                        backgroundColor:
                                                          '#A5A5A533',
                                                        color: '#707885',
                                                      }}
                                                    >
                                                      {tag}
                                                    </span>
                                                  ) : null}
                                                </div>
                                              ))}
                                            </div>
                                          )
                                        )}
                                    </div>
                                  </div>
                                ) : null}
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
                            className={`transition-colors duration-200 ${
                              index === cardIndex
                                ? 'w-3 h-1 rounded-[10px] bg-white'
                                : 'w-1 h-1 rounded-full bg-gray-500'
                            }`}
                          />
                        ))}
                      </div>

                      {/* 업데이트 시간 - 카드 밖 하단 */}
                      <div className="w-full flex items-center justify-center h-4.5">
                        <button
                          type="button"
                          className="flex items-center justify-center gap-1 h-full"
                          onClick={async () => {
                            setIsRefreshing(true);
                            await refetch();
                            setTimeout(() => setIsRefreshing(false), 500);
                          }}
                        >
                          <p className="text-[#4E5560] text-xs font-medium leading-[1.5] text-center">
                            {new Date(reportData.updatedAt).toLocaleString(
                              'ko-KR',
                              {
                                month: 'long',
                                day: 'numeric',
                                weekday: 'short',
                                hour: 'numeric',
                              }
                            )}{' '}
                            업데이트
                          </p>
                          <RefreshIcon
                            className={isRefreshing ? 'animate-spin' : ''}
                          />
                        </button>
                      </div>
                      {reportData.poo && (
                        <DefecationScore score={reportData.poo.score} />
                      )}
                    </>
                  ) : (
                    <NullReport
                      mode="defecation"
                      nullIcon={poop}
                      title="배변"
                      description="배변 점수는 배변 기록이 있어야 확인할 수 있어요."
                    />
                  )}
                  {hasLifestyleData ? (
                    <div className="flex flex-col space-y-5 mt-5">
                      <FoodReport foodData={reportData.food} />
                      {reportData.water && (
                        <WaterReport
                          waterData={reportData.water}
                          type="daily"
                        />
                      )}
                      {reportData.stress && (
                        <StressReport stressData={reportData.stress} />
                      )}
                    </div>
                  ) : (
                    <NullReport
                      mode="lifestyle"
                      nullIcon={emojiOpenMouse}
                      title="생활"
                      description="생활을 기록하면 더 자세한 분석을 얻을 수 있어요"
                    />
                  )}
                  {hasNoDataAtAll ? null : <ReportNotice />}
                </main>
              )}
            </>
          );
        })()}
    </div>
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
