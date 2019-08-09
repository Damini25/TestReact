import React from 'react';
import Chart from 'chart.js';
import './securityChartComponent.css';

class SecurityChart extends React.Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        this.myChart = new Chart(this.canvasRef.current, {
            type: 'line',
            data: {
                labels: [0, 10, 20, 30, 40, 50, 60],
                datasets: [
                    {
                        label: '# Profit',
                        data: [27.1, 27.1, 27.2, 27.1, 27.2, 27.1, 27],
                        borderWidth: 1,
                        fill: false,
                        backgroundColor: "#ed7d31",
                        borderColor: "#ed7d31",
                        lineTension: 0
                    },
                    {
                        label: '# Loss',
                        data: [27.1, 26.8, 27.1, 26.8, 27.2, 27.2, 27.1],
                        borderWidth: 1,
                        fill: false,
                        backgroundColor: "#5b9bd5",
                        borderColor: "#5b9bd5",
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
    }

    render() {
        return (<div className="security-chart-div">
            <h3>Security Charting</h3>
            <canvas ref={this.canvasRef} />
        </div>);
    }
}

export default SecurityChart;