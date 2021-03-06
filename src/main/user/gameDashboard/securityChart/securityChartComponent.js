import React from 'react';
import Chart from 'chart.js';
import 'chartjs-plugin-zoom';
import './securityChartComponent.scss';
import { connect } from 'react-redux';
import { convertTimeToDecimal } from '../../../../common/utilities/utilities';

class SecurityChart extends React.Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    /**
     * Bid/Ask spread chart
     */
    componentDidUpdate(prevProps) {
        if (prevProps.minMaxBidOrders !== this.props.minMaxBidOrders ||
            prevProps.minMaxAskOrders !== this.props.minMaxAskOrders) {
            const bidData = [];
            const askData = [];
            if (this.props.minMaxBidOrders.length) {
                this.props.minMaxBidOrders.map((elem) => {

                    if (elem.maxBid) {
                        bidData.push({
                            x: convertTimeToDecimal(elem.time),
                            y: elem.maxBid.price
                        })
                    }
                });
            }
            if (this.props.minMaxAskOrders.length) {
                this.props.minMaxAskOrders.map((elem) => {

                    if (elem.minAsk) {
                        askData.push({
                            x: this.convertTimeToDecimal(elem.time),
                            y: elem.minAsk.price
                        })
                    }
                });
            }

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
                            pointBorderColor: "#ed7d31",
                            pointBackgroundColor: "#ed7d31",
                            pointBorderWidth: 1,
                            pointHoverRadius: 4,
                            pointHoverBackgroundColor: "#ed7d31",
                            pointHoverBorderColor: "black",
                            pointHoverBorderWidth: 2,
                        },
                        {
                            label: '# Ask',
                            data: askData,
                            borderWidth: 1,
                            fill: false,
                            backgroundColor: "#5b9bd5",
                            borderColor: "#5b9bd5",
                            pointBorderColor: "#5b9bd5",
                            pointBackgroundColor: "#5b9bd5",
                            pointBorderWidth: 1,
                            pointHoverRadius: 4,
                            pointHoverBackgroundColor: "#5b9bd5",
                            pointHoverBorderColor: "black",
                            pointHoverBorderWidth: 2,
                        }
                    ]
                },
                options: {
                    showTooltips: false,
                    animation: false,
                    elements: {
                        point: {
                            radius: 0.4
                        }
                    },
                    legend: {
                        display: true,
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                precision: 2
                            },
                            type: 'linear'
                        }],
                        yAxes: [{
                            gridLines: {
                                drawBorder: false,
                            },
                            ticks: {
                                // padding: 15,
                                suggestedMin: this.props['minPrice'] - 1,
                                suggestedMax: this.props['maxPrice'] + 2,
                                stepSize: ((this.props['maxPrice'] + 2) - (this.props['minPrice'] - 1)) / 8
                            }
                        }]
                    }
                }
            });
        }
    }

    convertTimeToDecimal(val) {
        if (val && val.indexOf(':') > -1) {
            val = val.split(':');
            val = parseFloat(parseInt(val[0], 10) + parseInt(val[1], 10) / 60 + parseInt(val[2], 10) / 3600);
            return Math.round(val * 1000) / 1000;
        } else {
            const v = parseInt(val, 10);
            return Math.round(v * 1000) / 1000;
        }
    }

    render() {
        let prodName;
        if (this.props.stockSymbolData && this.props.stockSymbolData.length) {
            this.props.stockSymbolData.forEach(elem => {
                if (elem['productId'] === this.props.bookOrderFormNewValue['stockSymbol']) {
                    prodName = elem;
                }
            });
        }
        return (<div className="security-chart-div">
            <h3>Bid/Ask Spread</h3>
            <div className="prod-name-label">
                <label>Product Name - </label> {prodName ? prodName['productCode'] + '-' + prodName['productName'] : ''}
            </div>
            <canvas ref={this.canvasRef} />
        </div>);
    }
}

const mapStateToProps = (state) => {
     return {
        bookOrderFormNewValue: state.orderBookReducer.bookOrderFormValue,
        stockSymbolData: state.fetchDataReducer.stockSymbols['data'],
        minMaxAskOrders: state.orderListReducer['ordersToShow']['minAskOrders'],
        minMaxBidOrders: state.orderListReducer['ordersToShow']['maxBidOrders'],
        minPrice: state.orderListReducer['ordersToShow']['minPriceYAxis'],
        maxPrice: state.orderListReducer['ordersToShow']['maxPriceYAxis']
    }
}

export default connect(mapStateToProps)(SecurityChart);