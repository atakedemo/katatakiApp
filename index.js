/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App, {API} from './src/App';
import {name as appName} from './app.json';
import { Amplify, API } from 'aws-amplify';

Amplify.configure({
  Auth: {
      region: "ap-northeast-1",
      userPoolId: "ap-northeast-1_2cOGpMkHb",
      userPoolWebClientId: "553b8kmrb5ib0du39kvju8u7aq"
  },
  API: {
    endpoints: [
      {
        name: "APIGateway",
        endpoint: "https://7qq4e9s6y4.execute-api.ap-northeast-1.amazonaws.com"
      }
    ]
  }
});

AppRegistry.registerComponent(appName, () => App);
