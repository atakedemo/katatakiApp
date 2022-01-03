/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
      region: "ap-northeast-1",
      userPoolId: "ap-northeast-1_2cOGpMkHb",
      userPoolWebClientId: "553b8kmrb5ib0du39kvju8u7aq"
  }
});

AppRegistry.registerComponent(appName, () => App);
