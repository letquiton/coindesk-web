
import React, { Component } from 'react';
import LineChart from './LineChart'
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const baseData = {
    isDefault: true,
    labels: [''],
    datasets: [{ label: '', data: '' }, { label: '', data: '' }]
}

export default class DataProcess extends Component {

    constructor() {
        super();

        this.state = {
            data: baseData,
            hour: baseData,
            day: baseData,
            week: baseData,
            month: baseData,
            quarter: baseData,
            year: baseData,
            value: 1

        }
    }

    componentDidMount = async () => {
        const initialData = await this.LoadData('Day');
        this.setState({ data: this.processData(initialData, 'day') })
    }

    processData = (rawData, interval) => {
        var newDatasets = []
        rawData.forEach(element => {
            newDatasets.push({
                label: element.currency,
                data: element.prices.map(v => parseFloat(v).toFixed(2)),
                borderColor: '#ff9900',
                backgroundColor: 'rgba(255, 153, 0, 0.2)'
            })
        })

        // x-axis scale
        var setUnit = 'day'
        switch (interval) {
            case 'hour':
                setUnit = 'minute'
                break;
            case 'day':
                setUnit = 'hour'
                break;
            case 'week':
                setUnit = 'day'
                break;
            case 'month':
                setUnit = 'day'
                break;
            case 'quarter':
                setUnit = 'month'
                break;
            case 'year':
                setUnit = 'month'
                break;
            default:
                setUnit = 'day'
        }

        //colors
        newDatasets[0].borderColor = '#ff9900'
        newDatasets[0].backgroundColor = 'rgba(255, 153, 0, 0.2)'

        newDatasets[1].borderColor = '#3c3c3d'
        newDatasets[1].backgroundColor = 'rgba(60, 60, 61, 0.2)'


        var processedData = {
            isDefault: false,
            unit: setUnit,
            //fix for empty hour load
            labels: rawData[0].timestamps.map(v => moment(v).format('LLLL')),
            datasets: newDatasets,
            backgroundColor: [
                'rgba(255, 153, 0, 0)',
                'rgba(60, 60, 61,0)',
            ],
            borderWidth: 5
        }

        console.log(processedData)
        return processedData
    };

    //Query Switcher
    urlQuerySwitch(param) {

        const date = new Date();
        const dateNow = date.toISOString();

        switch (param) {

            case 'hour':
                date.setHours(date.getHours() - 1)
                const h = date.toISOString();
                return this.urlQueryGenerator(h, dateNow);

            case 'day':
                date.setDate(date.getDate() - 1)
                const d = date.toISOString();
                return this.urlQueryGenerator(d, dateNow);

            case 'week':
                date.setDate(date.getDate() - 7)
                const w = date.toISOString();
                return this.urlQueryGenerator(w, dateNow);
            case 'month':
                date.setMonth(date.getMonth() - 1)
                const m = date.toISOString();
                return this.urlQueryGenerator(m, dateNow);
            case 'quarter':
                date.setMonth(date.getMonth() - 3)
                const q = date.toISOString();
                return this.urlQueryGenerator(q, dateNow);
            case 'year':
                date.setFullYear(date.getFullYear() - 1)
                const y = date.toISOString();
                return this.urlQueryGenerator(y, dateNow);
            default:
                date.setDate(date.getDate() - 1)
                const dd = date.toISOString();
                return this.urlQueryGenerator(dd, dateNow);
        }
    }

    urlQueryGenerator(start, end) {
        return "https://api.nomics.com/v1/currencies/sparkline?key=5ce312d2e2933fa64e048c32ab9920e8&ids=BTC,ETH&start=" + start + "&end=" + end + "&convert=NZD"
    }

    LoadData = async (interval) => {
        const response = await fetch(this.urlQuerySwitch(interval));
        return await response.json();
    };

    // LoadInitialValues = async () => {
    //     return day
    // };

    handleChange = async (event, newValue) => {

        var newData = baseData
        var loaded = baseData

        switch (newValue) {

            case 0:
                if (this.state.hour.isDefault) {
                    loaded = await this.LoadData('hour');
                    newData = this.processData(loaded, 'hour');
                    this.setState({ hour: newData })
                }
                else {
                    newData = this.state.hour;
                }
                break;
            //hr
            case 1:
                if (this.state.day.isDefault) {
                    loaded = await this.LoadData('day');
                    newData = this.processData(loaded, 'day');
                    this.setState({ day: newData })
                }
                else {
                    newData = this.state.day;
                }
                break;
            //day

            case 2:
                if (this.state.week.isDefault) {
                    loaded = await this.LoadData('week');
                    newData = this.processData(loaded, 'week');
                    this.setState({ week: newData })
                }
                else {
                    newData = this.state.week;
                }
                break;
            //Week

            case 3:
                if (this.state.month.isDefault) {
                    loaded = await this.LoadData('month');
                    newData = this.processData(loaded, 'month');
                    this.setState({ month: newData })
                }
                else {
                    newData = this.state.month;
                }
                break;
            //Month

            case 4:
                if (this.state.quarter.isDefault) {
                    loaded = await this.LoadData('quarter');
                    newData = this.processData(loaded, 'quarter');
                    this.setState({ quarter: newData })
                }
                else {
                    newData = this.state.quarter;
                }
                break;
            //qtr

            case 5:
                if (this.state.year.isDefault) {
                    loaded = await this.LoadData('year');
                    newData = this.processData(loaded, 'year');
                    this.setState({ year: newData })
                }
                else {
                    newData = this.state.year;
                }
                break;
            //yr
            default:
                newData = baseData

        }

        this.setState({ value: newValue, data: newData })
    };

    render() {
        return (
            <Paper>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="1H" />
                    <Tab label="1D" />
                    <Tab label="1W" />
                    <Tab label="1M" />
                    <Tab label="1Q" />
                    <Tab label="1Y" />
                </Tabs>
                <LineChart data={this.state.data} />
            </Paper>
        );
    }

}


