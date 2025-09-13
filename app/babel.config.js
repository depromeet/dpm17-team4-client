module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // NOTE(seonghyun): React Native Reanimated plugin (필요시)
      // 'react-native-reanimated/plugin',
    ],
  };
};
