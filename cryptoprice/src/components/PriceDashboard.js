import React, { Component } from 'react';
import * as SignalR from '@aspnet/signalr';
import 'fontsource-roboto';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InfoCard from './InfoCard';
import DataProcess from './DataProcess';

export class PriceDashboard extends Component {
  constructor() {
    super();

    this.state = {
      currencies: [],
      hubConnection: null,
    }
  }

  componentDidMount = async () => {
    const currentCurrencies = await this.LoadInitialValues();

    this.setState({ currencies: currentCurrencies })
    this.InitialiseHub();
  }

  LoadInitialValues = async () => {
    const response = await fetch("https:///localhost:5001/Coinbase", {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
    });

    return await response.json();
  };

  InitialiseHub = () => {
    const hubConnection = new SignalR.HubConnectionBuilder().withUrl("https:///localhost:5001/btchub").build();

    this.setState({ hubConnection }, () => {
      this.state.hubConnection
        .start()
        .then(() => console.log('Connection started!'))
        .catch(err => console.log('Error while establishing connection :('));

      this.state.hubConnection.on('ReceivedCurrencies', (receivedCurrencies) => {
        this.setState({ currencies: receivedCurrencies });
      })
    })
  }

  fixFormat = value => {
    return value.toLocaleString();
    //value.toLocaleString('en-NZ', { minimumFractionDigits: 2 });
  }

  useStyles = () => makeStyles({
    root: {
      flexGrow: 1,
      marginTop: 100,
    },


  });

  render() {
    const classes = this.useStyles();

    return (
      <div className={classes.root}>
        <Grid container xs={12} justify="center">
          <Grid container item xs={12} sm={8}
            spacing={1}>

            {this.state.currencies.map((currency) =>
              < Grid item xs={6} sm={6}>
                <InfoCard
                  name={currency.name}
                  price={parseFloat(currency.price).toFixed(2)}
                  priceChange={parseFloat(currency.day.price_change).toFixed(2)}
                  priceChangePct={parseFloat(currency.day.price_change_pct).toFixed(3) + "%"}
                  volume={currency.day.volume}
                  marketCap={currency.market_cap}
                  logoUrl={currency.logo_url}
                />
              </Grid>
            )}
          </Grid>
          <Grid container item xs={12} sm={8}>
            <DataProcess />
          </Grid>
        </Grid>
      </div>
    );
  }

}