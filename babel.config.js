module.exports = {
    presets: [
      'babel-preset-expo', // Use this for Expo projects
      '@babel/preset-react' // Add support for JSX
    ],
    plugins: [
      'react-native-reanimated/plugin', // Required for react-native-reanimated
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: true,
        }
      ]
    ]
  };
  