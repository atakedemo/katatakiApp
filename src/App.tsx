import React, { Component } from 'react';
import MainRouter from './routes';
/*
export default function App() {
  return <MainRouter />;
}*/

type Props = {};
export default class App extends Component<Props>{
  render() {
    return <MainRouter />
  }
}
