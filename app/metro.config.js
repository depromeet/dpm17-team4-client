const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('@react-native/metro-config');

const config = getDefaultConfig(__dirname);

// React Native 0.73+ 요구사항에 맞게 설정 병합
const finalConfig = mergeConfig(config, {
  // 기존 설정 유지
});

// NOTE(seonghyun): WebView 관련 설정
finalConfig.resolver.platforms = ['ios', 'android', 'native', 'web'];

// NOTE(seonghyun): 소스맵 설정
finalConfig.transformer.minifierConfig = {
  keep_fnames: true,
  mangle: {
    keep_fnames: true,
  },
};

// NOTE(seonghyun): 개발 서버 설정 개선
finalConfig.server = {
  ...finalConfig.server,
  port: 8081,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      // CORS 헤더 추가
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
      if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
      }
      
      return middleware(req, res, next);
    };
  },
};

// NOTE(seonghyun): 번들러 설정 개선
finalConfig.transformer = {
  ...finalConfig.transformer,
  minifierConfig: {
    keep_fnames: true,
    mangle: {
      keep_fnames: true,
    },
  },
  enableBabelRCLookup: false,
};

module.exports = finalConfig;
