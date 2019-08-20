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
        const bidData = [];
        const askData=[];
        this.props.bidOrderList.map((elem) => {
            bidData.push({
                x: this.convertTimeToDecimal(elem.timestamp),
                y: elem.price
            })
        });
        this.props.askOrderList.map((elem) => {
            askData.push({
                x: this.convertTimeToDecimal(elem.timestamp),
                y: elem.price
            })
        });

        console.log('componentDidUpdate',askData, bidData, this.convertTimeToDecimal('4:30'));

        if (prevProps.bidOrderList !== this.props.bidOrderList) {
            this.myChart = new Chart(this.canvasRef.current, {
                type: 'line',
                data: {
                    datasets: [
                        {
                            label: '# Bid',
                            data: bidData,
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
                            ticks: {
                                padding: 5,
                                min: 6,
                                max: 18,
                                stepSize: 1
                            },
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
            return parseFloat(parseInt(val[0], 10) + parseInt(val[1], 10) / 60);
        } else {
            return parseInt(val, 10);
        }

    }
    /* componentDidMount() {
         console.log('componentDidmount', this.props)
         this.myChart = new Chart(this.canvasRef.current, {
             type: 'line',
             data: {
                 labels: [0, 10, 20, 30, 40, 50, 60],
                 datasets: [
                     {
                         label: '# Bid',
                         data: [27.1, 27.1, 27.2, 27.1, 27.2, 27.1, 27],
                         borderWidth: 1,
                         fill: false,
                         backgroundColor: "#ed7d31",
                         borderColor: "#ed7d31",
                         lineTension: 0
                     },
                     {
                         label: '# Ask',
                         data: [27.1, 26.8, 27.1, 26.8, 27.2, 27.2, 27.1],
                         borderWidth: 1,
                         fill: false,
                         backgroundColor: "#5b9bd5",
                         //  borderColor: "#5b9bd5",
                         borderColor: "blue",
                         lineTension: 0
                     }
                 ]
             },
             options: {
                 legend: {
                     display: false,
                 },
                 scales: {
                     xAxes: [{
                         gridLines: {
                             display: false
                         },
                         ticks: {
                             padding: 5,
                             min: 0,
                             max: 40,
                             stepSize: 10
                         }
                     }],
                     yAxes: [{
                         gridLines: {
                             drawBorder: false,
                         },
                         ticks: {
                             padding: 15,
                             min: 26.6,
                             max: 27.2,
                             stepSize: 0.1
                         }
                     }]
                 },
                 elements: {
                     point: { radius: 0 }
                 }
             }
         });
     }*/

    render() {
        return (<div className="security-chart-div">
            <h3>Bid/Ask Spread</h3>
            <canvas ref={this.canvasRef} />
        </div>);
    }
}

const mapdispatchToProps = (dispatch) => {
    return {
        getleftpaneProductCatalogue: () => (dispatch, getState) => {
            const state = getState()
            const details = state.orderListReducer['ordersToShow']['bidOrders']

            return details
        }
    }
}

const mapStateToProps = (state) => {
    return {
        bidOrderList: state.orderListReducer['ordersToShow']['bidOrders'],
        askOrderList: state.orderListReducer['ordersToShow']['askOrders']
    }
}

export default connect(mapStateToProps, mapdispatchToProps)(SecurityChart);