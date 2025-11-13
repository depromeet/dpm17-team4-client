export const DEFECATION_TRY = {
  DID_POO: '쌌어요',
  DID_NOT_POO: '못 쌌어요',
} as const satisfies Record<string, string>;

export const DEFECATION_DETAIL = {
  COLOR: '색상',
  SHAPE: '모양',
  PAIN: '복통 정도',
  TIME_TAKEN: '소요 시간',
  OPTIONAL: '특이사항',
} as const satisfies Record<string, string>;

export const DEFECATION_COLOR = {
  DEFAULT: ['갈색', '#B56A28'],
  GOLD: ['황금색', '#FCC82B'],
  RED: ['적색', '#F15151'],
  GREEN: ['녹색', '#5E632D'],
  GRAY: ['흰색', '#DED7D4'],
  DARK_BROWN: ['흑색', '#200D02'],
} as const satisfies Record<string, [string, string]>;

export const DEFECATION_SHAPE = {
  BANANA: '바나나',
  CREAM: '크림',
  CORN: '옥수수',
  PORRIDGE: '죽',
  RABBIT: '토끼',
  ROCK: '물', // NOTE(taehyeon): 물로 변경 필요
} as const satisfies Record<string, string>;

export const DEFECATION_TIME_TAKEN = {
  LESS_THAN_5_MINUTES: '5분 이내',
  LESS_THAN_10_MINUTES: '10분 이내',
  MORE_THAN_10_MINUTES: '10분 이상',
} as const satisfies Record<string, string>;

export const DEFECATION_TIME_TAKEN_KEYS = {
  LESS_THAN_5_MINUTES: 'LESS_THAN_5_MINUTES',
  LESS_THAN_10_MINUTES: 'LESS_THAN_10_MINUTES',
  MORE_THAN_10_MINUTES: 'MORE_THAN_10_MINUTES',
} as const;

export const SCROLL_DELAY = 300;
export const HOUR = 24;
