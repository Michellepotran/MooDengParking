module.exports = {
    presets: [
      'babel-preset-expo', // Use this for Expo projects
      '@babel/preset-react' // Add support for JSX
    ],
    plugins: ['react-native-reanimated/plugin'], // Required for react-native-reanimated
  };
  