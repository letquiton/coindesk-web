import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class LineChart extends Component {

    render() {

        return (
            <div className="chart">
                <Line
                    data={this.props.data}
                    options={{
                        scales: {
                            xAxes: [{
                                type: 'time',
                                time: {
                                    unit: this.props.data.unit,
                                    displayFormats: {
                                        hour: 'h:mm a',
                                        day: 'ddd, MMM DD',
                                        week: 'ddd, MMM DD',
                                        month: 'MMM',
                                        quarter: 'MMM YYYY',
                                        year: 'MMM'
                                    }
                                }
                            }]
                        }
                    }}
                />
            </div>
        )
    }
}

export default LineChart;