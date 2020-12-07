import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router';
import { BitcoinPricelist } from './components/BitcoinPricelist';
import { PriceDashboard } from './components/PriceDashboard';

export default class App extends Component {

  render() {
    return (
      <div>
        <Route exact path='/' component={PriceDashboard} />
      </div>
    );
  }
}