declare var module: {
  hot: {
    accept(path?: string, callback?: () => void): void,
  },
};

declare module 'redux-persist' {
  declare module.exports: any;
}
