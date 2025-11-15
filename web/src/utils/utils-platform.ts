/**
 * Check if the current device is Android
 */
export const isAndroid = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /Android/i.test(window.navigator.userAgent);
};

/**
 * Check if the current device is iOS
 */
export const isIOS = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /iPhone|iPad|iPod/i.test(window.navigator.userAgent);
};

/**
 * Check if the current device is mobile
 */
export const isMobile = (): boolean => {
  return isAndroid() || isIOS();
};

/**
 * Check if running in web browser (not in React Native app)
 */
export const isWeb = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !window.ReactNativeWebView;
};
