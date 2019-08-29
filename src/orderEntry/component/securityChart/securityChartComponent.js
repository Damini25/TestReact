import React from 'react';
import Chart from 'chart.js';
import './securityChartComponent.css';
import { connect } from 'react-redux';

class SecurityChart extends React.Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.timeAxis= [
            "6:0",
            "6:1",
            "6:2",
            "6:3",
            "6:4",
            "6:5",
            "6:6",
            "6:7",
            "6:8",
            "6:9",
            "6:10",
            "6:11",
            "6:12",
            "6:13",
            "6:14",
            "6:15",
            "6:16",
            "6:17",
            "6:18",
            "6:19",
            "6:20",
            "6:21",
            "6:22",
            "6:23",
            "6:24",
            "6:25",
            "6:26",
            "6:27",
            "6:28",
            "6:29",
            "6:30",
            "6:31",
            "6:32",
            "6:33",
            "6:34",
            "6:35",
            "6:36",
            "6:37",
            "6:38",
            "6:39",
            "6:40",
            "6:41",
            "6:42",
            "6:43",
            "6:44",
            "6:45",
            "6:46",
            "6:47",
            "6:48",
            "6:49",
            "6:50",
            "6:51",
            "6:52",
            "6:53",
            "6:54",
            "6:55",
            "6:56",
            "6:57",
            "6:58",
            "6:59",
            "7:0",
            "7:1",
            "7:2",
            "7:3",
            "7:4",
            "7:5",
            "7:6",
            "7:7",
            "7:8",
            "7:9",
            "7:10",
            "7:11",
            "7:12",
            "7:13",
            "7:14",
            "7:15",
            "7:16",
            "7:17",
            "7:18",
            "7:19",
            "7:20",
            "7:21",
            "7:22",
            "7:23",
            "7:24",
            "7:25",
            "7:26",
            "7:27",
            "7:28",
            "7:29",
            "7:30",
            "7:31",
            "7:32",
            "7:33",
            "7:34",
            "7:35",
            "7:36",
            "7:37",
            "7:38",
            "7:39",
            "7:40",
            "7:41",
            "7:42",
            "7:43",
            "7:44",
            "7:45",
            "7:46",
            "7:47",
            "7:48",
            "7:49",
            "7:50",
            "7:51",
            "7:52",
            "7:53",
            "7:54",
            "7:55",
            "7:56",
            "7:57",
            "7:58",
            "7:59",
            "8:0",
            "8:1",
            "8:2",
            "8:3",
            "8:4",
            "8:5",
            "8:6",
            "8:7",
            "8:8",
            "8:9",
            "8:10",
            "8:11",
            "8:12",
            "8:13",
            "8:14",
            "8:15",
            "8:16",
            "8:17",
            "8:18",
            "8:19",
            "8:20",
            "8:21",
            "8:22",
            "8:23",
            "8:24",
            "8:25",
            "8:26",
            "8:27",
            "8:28",
            "8:29",
            "8:30",
            "8:31",
            "8:32",
            "8:33",
            "8:34",
            "8:35",
            "8:36",
            "8:37",
            "8:38",
            "8:39",
            "8:40",
            "8:41",
            "8:42",
            "8:43",
            "8:44",
            "8:45",
            "8:46",
            "8:47",
            "8:48",
            "8:49",
            "8:50",
            "8:51",
            "8:52",
            "8:53",
            "8:54",
            "8:55",
            "8:56",
            "8:57",
            "8:58",
            "8:59",
            "9:0",
            "9:1",
            "9:2",
            "9:3",
            "9:4",
            "9:5",
            "9:6",
            "9:7",
            "9:8",
            "9:9",
            "9:10",
            "9:11",
            "9:12",
            "9:13",
            "9:14",
            "9:15",
            "9:16",
            "9:17",
            "9:18",
            "9:19",
            "9:20",
            "9:21",
            "9:22",
            "9:23",
            "9:24",
            "9:25",
            "9:26",
            "9:27",
            "9:28",
            "9:29",
            "9:30",
            "9:31",
            "9:32",
            "9:33",
            "9:34",
            "9:35",
            "9:36",
            "9:37",
            "9:38",
            "9:39",
            "9:40",
            "9:41",
            "9:42",
            "9:43",
            "9:44",
            "9:45",
            "9:46",
            "9:47",
            "9:48",
            "9:49",
            "9:50",
            "9:51",
            "9:52",
            "9:53",
            "9:54",
            "9:55",
            "9:56",
            "9:57",
            "9:58",
            "9:59",
            "10:0",
            "10:1",
            "10:2",
            "10:3",
            "10:4",
            "10:5",
            "10:6",
            "10:7",
            "10:8",
            "10:9",
            "10:10",
            "10:11",
            "10:12",
            "10:13",
            "10:14",
            "10:15",
            "10:16",
            "10:17",
            "10:18",
            "10:19",
            "10:20",
            "10:21",
            "10:22",
            "10:23",
            "10:24",
            "10:25",
            "10:26",
            "10:27",
            "10:28",
            "10:29",
            "10:30",
            "10:31",
            "10:32",
            "10:33",
            "10:34",
            "10:35",
            "10:36",
            "10:37",
            "10:38",
            "10:39",
            "10:40",
            "10:41",
            "10:42",
            "10:43",
            "10:44",
            "10:45",
            "10:46",
            "10:47",
            "10:48",
            "10:49",
            "10:50",
            "10:51",
            "10:52",
            "10:53",
            "10:54",
            "10:55",
            "10:56",
            "10:57",
            "10:58",
            "10:59",
            "11:0",
            "11:1",
            "11:2",
            "11:3",
            "11:4",
            "11:5",
            "11:6",
            "11:7",
            "11:8",
            "11:9",
            "11:10",
            "11:11",
            "11:12",
            "11:13",
            "11:14",
            "11:15",
            "11:16",
            "11:17",
            "11:18",
            "11:19",
            "11:20",
            "11:21",
            "11:22",
            "11:23",
            "11:24",
            "11:25",
            "11:26",
            "11:27",
            "11:28",
            "11:29",
            "11:30",
            "11:31",
            "11:32",
            "11:33",
            "11:34",
            "11:35",
            "11:36",
            "11:37",
            "11:38",
            "11:39",
            "11:40",
            "11:41",
            "11:42",
            "11:43",
            "11:44",
            "11:45",
            "11:46",
            "11:47",
            "11:48",
            "11:49",
            "11:50",
            "11:51",
            "11:52",
            "11:53",
            "11:54",
            "11:55",
            "11:56",
            "11:57",
            "11:58",
            "11:59",
            "12:0",
            "12:1",
            "12:2",
            "12:3",
            "12:4",
            "12:5",
            "12:6",
            "12:7",
            "12:8",
            "12:9",
            "12:10",
            "12:11",
            "12:12",
            "12:13",
            "12:14",
            "12:15",
            "12:16",
            "12:17",
            "12:18",
            "12:19",
            "12:20",
            "12:21",
            "12:22",
            "12:23",
            "12:24",
            "12:25",
            "12:26",
            "12:27",
            "12:28",
            "12:29",
            "12:30",
            "12:31",
            "12:32",
            "12:33",
            "12:34",
            "12:35",
            "12:36",
            "12:37",
            "12:38",
            "12:39",
            "12:40",
            "12:41",
            "12:42",
            "12:43",
            "12:44",
            "12:45",
            "12:46",
            "12:47",
            "12:48",
            "12:49",
            "12:50",
            "12:51",
            "12:52",
            "12:53",
            "12:54",
            "12:55",
            "12:56",
            "12:57",
            "12:58",
            "12:59",
            "13:0",
            "13:1",
            "13:2",
            "13:3",
            "13:4",
            "13:5",
            "13:6",
            "13:7",
            "13:8",
            "13:9",
            "13:10",
            "13:11",
            "13:12",
            "13:13",
            "13:14",
            "13:15",
            "13:16",
            "13:17",
            "13:18",
            "13:19",
            "13:20",
            "13:21",
            "13:22",
            "13:23",
            "13:24",
            "13:25",
            "13:26",
            "13:27",
            "13:28",
            "13:29",
            "13:30",
            "13:31",
            "13:32",
            "13:33",
            "13:34",
            "13:35",
            "13:36",
            "13:37",
            "13:38",
            "13:39",
            "13:40",
            "13:41",
            "13:42",
            "13:43",
            "13:44",
            "13:45",
            "13:46",
            "13:47",
            "13:48",
            "13:49",
            "13:50",
            "13:51",
            "13:52",
            "13:53",
            "13:54",
            "13:55",
            "13:56",
            "13:57",
            "13:58",
            "13:59",
            "14:0",
            "14:1",
            "14:2",
            "14:3",
            "14:4",
            "14:5",
            "14:6",
            "14:7",
            "14:8",
            "14:9",
            "14:10",
            "14:11",
            "14:12",
            "14:13",
            "14:14",
            "14:15",
            "14:16",
            "14:17",
            "14:18",
            "14:19",
            "14:20",
            "14:21",
            "14:22",
            "14:23",
            "14:24",
            "14:25",
            "14:26",
            "14:27",
            "14:28",
            "14:29",
            "14:30",
            "14:31",
            "14:32",
            "14:33",
            "14:34",
            "14:35",
            "14:36",
            "14:37",
            "14:38",
            "14:39",
            "14:40",
            "14:41",
            "14:42",
            "14:43",
            "14:44",
            "14:45",
            "14:46",
            "14:47",
            "14:48",
            "14:49",
            "14:50",
            "14:51",
            "14:52",
            "14:53",
            "14:54",
            "14:55",
            "14:56",
            "14:57",
            "14:58",
            "14:59",
            "15:0",
            "15:1",
            "15:2",
            "15:3",
            "15:4",
            "15:5",
            "15:6",
            "15:7",
            "15:8",
            "15:9",
            "15:10",
            "15:11",
            "15:12",
            "15:13",
            "15:14",
            "15:15",
            "15:16",
            "15:17",
            "15:18",
            "15:19",
            "15:20",
            "15:21",
            "15:22",
            "15:23",
            "15:24",
            "15:25",
            "15:26",
            "15:27",
            "15:28",
            "15:29",
            "15:30",
            "15:31",
            "15:32",
            "15:33",
            "15:34",
            "15:35",
            "15:36",
            "15:37",
            "15:38",
            "15:39",
            "15:40",
            "15:41",
            "15:42",
            "15:43",
            "15:44",
            "15:45",
            "15:46",
            "15:47",
            "15:48",
            "15:49",
            "15:50",
            "15:51",
            "15:52",
            "15:53",
            "15:54",
            "15:55",
            "15:56",
            "15:57",
            "15:58",
            "15:59",
            "16:0",
            "16:1",
            "16:2",
            "16:3",
            "16:4",
            "16:5",
            "16:6",
            "16:7",
            "16:8",
            "16:9",
            "16:10",
            "16:11",
            "16:12",
            "16:13",
            "16:14",
            "16:15",
            "16:16",
            "16:17",
            "16:18",
            "16:19",
            "16:20",
            "16:21",
            "16:22",
            "16:23",
            "16:24",
            "16:25",
            "16:26",
            "16:27",
            "16:28",
            "16:29",
            "16:30",
            "16:31",
            "16:32",
            "16:33",
            "16:34",
            "16:35",
            "16:36",
            "16:37",
            "16:38",
            "16:39",
            "16:40",
            "16:41",
            "16:42",
            "16:43",
            "16:44",
            "16:45",
            "16:46",
            "16:47",
            "16:48",
            "16:49",
            "16:50",
            "16:51",
            "16:52",
            "16:53",
            "16:54",
            "16:55",
            "16:56",
            "16:57",
            "16:58",
            "16:59",
            "17:0",
            "17:1",
            "17:2",
            "17:3",
            "17:4",
            "17:5",
            "17:6",
            "17:7",
            "17:8",
            "17:9",
            "17:10",
            "17:11",
            "17:12",
            "17:13",
            "17:14",
            "17:15",
            "17:16",
            "17:17",
            "17:18",
            "17:19",
            "17:20",
            "17:21",
            "17:22",
            "17:23",
            "17:24",
            "17:25",
            "17:26",
            "17:27",
            "17:28",
            "17:29",
            "17:30",
            "17:31",
            "17:32",
            "17:33",
            "17:34",
            "17:35",
            "17:36",
            "17:37",
            "17:38",
            "17:39",
            "17:40",
            "17:41",
            "17:42",
            "17:43",
            "17:44",
            "17:45",
            "17:46",
            "17:47",
            "17:48",
            "17:49",
            "17:50",
            "17:51",
            "17:52",
            "17:53",
            "17:54",
            "17:55",
            "17:56",
            "17:57",
            "17:58",
            "17:59"
        ]
    }

    componentDidUpdate(prevProps, prevState) {

        //    if (prevProps.bidOrderList !== this.props.bidOrderList) {

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
     //   console.log('componentDidUpdate', this.props.askOrderList);
        //  console.log('componentDidUpdate', askData, bidData, this.convertTimeToDecimal('4:30'));
        this.myChart = new Chart(this.canvasRef.current, {
            type: 'line',
            data: {
                labels:this.timeAxis,
                datasets: [
                    {
                        label: '# Bid',
                        data: this.props.bidOrderList,
                        borderWidth: 1,
                        fill: false,
                        backgroundColor: "#ed7d31",
                        borderColor: "#ed7d31",
                        //  lineTension: 0,
                        //  pointStyle: 'rectRot',
                        //   pointRadius: 4,
                        //  pointHitRadius: 10,
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
                        data: this.props.askOrderList,
                        borderWidth: 1,
                        fill: false,
                        backgroundColor: "#5b9bd5",
                        borderColor: "#5b9bd5",
                        borderColor: "blue",
                        // lineTension: 0,
                        //  pointStyle: 'rectRot',
                        //  pointRadius: 4,
                        //  pointHitRadius: 10,
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
                showTooltips: false,
                elements: {
                    point: {
                        radius: 0
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
                        // ticks: {
                        //     padding: 5,
                        //     min: 6,
                        //     max: 18,
                        //     stepSize: 1
                        // },
                        //  type: 'linear'
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
        // }
    }

    convertTimeToDecimal(val) {
        if (val && val.indexOf(':') > -1) {
            val = val.split(':');
            val = parseFloat(parseInt(val[0], 10) + parseInt(val[1], 10) / 60);
            return Math.round(val * 100) / 100;
        } else {
            return parseInt(val, 10);
        }
    }

    render() {
        let prodName;
        if (this.props.stockSymbolData && this.props.stockSymbolData.length) {
            this.props.stockSymbolData.forEach(elem => {
               // console.log('elem', elem['productId'], this.props.bookOrderFormNewValue['stockSymbol'])
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
    //  console.log('chart',state.chartReducer)
    return {
        bidOrderList: state.chartReducer['totalOrderTillNow']['bidOrders'],
        askOrderList: state.chartReducer['totalOrderTillNow']['askOrders'],
        bookOrderFormNewValue: state.orderBookReducer.bookOrderFormValue,
        stockSymbolData: state.fetchDataReducer.stockSymbols['data']
    }
}

export default connect(mapStateToProps)(SecurityChart);