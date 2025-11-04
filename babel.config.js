module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // các plugin khác (nếu có) …
      "react-native-reanimated/plugin", // <- LUÔN Ở CUỐI
    ],
  };
};
