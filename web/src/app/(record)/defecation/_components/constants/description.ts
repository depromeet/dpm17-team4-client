export const DEFECATION_TRY = {
  DID_POO: '쌌어요',
  DID_NOT_POO: '못 쌌어요',
  TRIED: '시도만 했어요',
} as const satisfies Record<string, string>;

export const DEFECATION_TRY_DETAIL = {
  COLOR: '색상',
  SHAPE: '모양',
  PAIN: '복통 정도',
  TIME_TAKEN: '소요 시간',
  OPTIONAL: '특이사항',
} as const satisfies Record<string, string>;

export type DefecationTryDetailKey = keyof typeof DEFECATION_TRY_DETAIL;
export type DefecationTryDetailValue =
  (typeof DEFECATION_TRY_DETAIL)[DefecationTryDetailKey];

export const DEFECATION_TRY_COLOR = {
  DEFAULT: ['기본', '#B56A28'],
  GOLD: ['황금색', '#FCC82B'],
  DARK_BROWN: ['흑갈색', '#682E0B'],
  RED: ['선혈', '#F15151'],
  GREEN: ['녹색', '#5E632D'],
  GRAY: ['흑색', '#8B7F78'],
} as const satisfies Record<string, [string, string]>;

export type DefecationTryColorKey = keyof typeof DEFECATION_TRY_COLOR;
export type DefecationTryColorValue =
  (typeof DEFECATION_TRY_COLOR)[DefecationTryColorKey];
