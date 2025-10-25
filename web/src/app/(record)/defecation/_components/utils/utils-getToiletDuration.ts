import { DEFECATION_TIME_TAKEN_KEYS } from '../constants';

export function getToiletDuration(timeTakenKey: string): number {
  if (timeTakenKey === DEFECATION_TIME_TAKEN_KEYS.LESS_THAN_5_MINUTES) {
    return 5;
  }
  if (timeTakenKey === DEFECATION_TIME_TAKEN_KEYS.LESS_THAN_10_MINUTES) {
    return 10;
  }
  if (timeTakenKey === DEFECATION_TIME_TAKEN_KEYS.MORE_THAN_10_MINUTES) {
    return 15;
  }
  return 0;
}

export function getTimeTakenKey(duration: number): string {
  if (duration <= 5) {
    return DEFECATION_TIME_TAKEN_KEYS.LESS_THAN_5_MINUTES;
  }
  if (duration <= 10) {
    return DEFECATION_TIME_TAKEN_KEYS.LESS_THAN_10_MINUTES;
  }
  return DEFECATION_TIME_TAKEN_KEYS.MORE_THAN_10_MINUTES;
}
