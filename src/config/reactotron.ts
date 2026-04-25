import Reactotron from 'reactotron-react-native';

declare global {
  interface Console {
    tron: typeof Reactotron;
  }
}

if (__DEV__) {
  Reactotron.configure({
    name: 'CSTV App',
  })
    .useReactNative({
      networking: {
        ignoreUrls: /symbolicate|logs|hot|status/,
      },
    })
    .connect();

  console.tron = Reactotron;
  Reactotron.clear?.();
}

export default Reactotron;
