module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            components: "./src/components/index.ts",
            theme: "./src/theme/index.ts",
            styles: "./src/styles/index.ts",
            enums: "./src/enums/index.ts",
            mocks: "./src/mocks/index.ts",
            models: "./src/models/index.ts",
            database: "./src/database/index.ts"
          },
        },
      ],
    ]
  };
};
