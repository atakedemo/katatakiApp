import React, { Component } from 'react';
import MainRouter from './routes';
import { withAuthenticator } from 'aws-amplify-react-native'
/*
export default function App() {
  return <MainRouter />;
}*/

type Props = {};
//export default class App extends Component<Props>{
class App extends Component<Props>{
  render() {
    return <MainRouter />
  }
}

export default withAuthenticator(App);
