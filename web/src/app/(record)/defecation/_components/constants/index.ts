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
  DEFAULT: ['기본', '#B56A28'],
  GOLD: ['황금색', '#FCC82B'],
  DARK_BROWN: ['흑갈색', '#682E0B'],
  RED: ['선혈', '#F15151'],
  GREEN: ['녹색', '#5E632D'],
  GRAY: ['흑색', '#8B7F78'],
} as const satisfies Record<string, [string, string]>;

export const DEFECATION_SHAPE = {
  RABBIT: '토끼',
  STONE: '돌',
  CORN: '옥수수',
  BANANA: '바나나',
  CREAM: '크림',
  PORRIDGE: '죽',
} as const satisfies Record<string, string>;

export const DEFECATION_TIME_TAKEN = {
  LESS_THAN_5_MINUTES: '5분 내',
  LESS_THAN_10_MINUTES: '10분 이내',
  MORE_THAN_10_MINUTES: '10분 이상',
} as const satisfies Record<string, string>;

export const SCROLL_DELAY = 100;

export const HOUR = 24;
