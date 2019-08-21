import React from 'react';
import Chart from 'chart.js';
import './securityChartComponent.css';
import { connect } from 'react-redux';

class SecurityChart extends React.Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.bidOrderList !== this.props.bidOrderList) {
            const bidData = [];
            const askData = [];
            this.props.bidOrderList.map((elem) => {
                bidData.push({
                    x: this.convertTimeToDecimal(elem.onlyTime),
                    y: elem.price
                })
            });
            this.props.askOrderList.map((elem) => {
                askData.push({
                    x: this.convertTimeToDecimal(elem.onlyTime),
                    y: elem.price
                })
            });

            //  console.log('componentDidUpdate',askData, bidData, this.convertTimeToDecimal('4:30'));
            this.myChart = new Chart(this.canvasRef.current, {
                type: 'line',
                data: {
                    datasets: [
                        {
                            label: '# Bid',
                            data: bidData,
                            /// type: "candlestick",
                            borderWidth: 1,
                            fill: false,
                            backgroundColor: "#ed7d31",
                            borderColor: "#ed7d31",
                            lineTension: 0,
                            pointStyle: 'rectRot',
                            pointRadius: 4,
                            pointHitRadius: 10,
                            pointBorderColor: "black",
                            pointBackgroundColor: "white",
                            pointBorderWidth: 1,
                            pointHoverRadius: 8,
                            pointHoverBackgroundColor: "yellow",
                            pointHoverBorderColor: "brown",
                            pointHoverBorderWidth: 2,
                        },
                        {
                            label: '# Ask',
                            data: askData,
                            borderWidth: 1,
                            fill: false,
                            backgroundColor: "#5b9bd5",
                            borderColor: "#5b9bd5",
                            borderColor: "blue",
                            lineTension: 0,
                            pointStyle: 'rectRot',
                            pointRadius: 4,
                            pointHitRadius: 10,
                            pointBorderColor: "black",
                            pointBackgroundColor: "white",
                            pointBorderWidth: 1,
                            pointHoverRadius: 8,
                            pointHoverBackgroundColor: "yellow",
                            pointHoverBorderColor: "brown",
                            pointHoverBorderWidth: 2,
                        }
                    ]
                },
                options: {
                    legend: {
                        display: true,
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                display: false
                            },
                            // ticks: {
                            //     padding: 5,
                            //     min: 6,
                            //     max: 18,
                            //     stepSize: 1
                            // },
                            type: 'linear'
                        }],
                        yAxes: [{
                            gridLines: {
                                drawBorder: false,
                            },
                            ticks: {
                                padding: 15
                            }
                        }]
                    },
                }
            });
        }
    }

    convertTimeToDecimal(val) {
        if (val.indexOf(':') > -1) {
            val = val.split(':');
            val = parseFloat(parseInt(val[0], 10) + parseInt(val[1], 10) / 60);
            return Math.round(val * 100) / 100;
        } else {
            return parseInt(val, 10);
        }
    }

    render() {
        return (<div className="security-chart-div">
            <h3>Bid/Ask Spread</h3>
            <canvas ref={this.canvasRef} />
        </div>);
    }
}

const mapStateToProps = (state) => {
    //  console.log('chart',state.chartReducer)
    return {
        bidOrderList: state.chartReducer['totalOrderTillNow']['bidOrders'],
        askOrderList: state.chartReducer['totalOrderTillNow']['askOrders']
    }
}

export default connect(mapStateToProps)(SecurityChart);