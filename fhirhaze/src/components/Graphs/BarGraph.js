import React, { Component } from 'react'
import Chart from "chart.js";
let myBarGraph;

//--Chart Style Options--//
Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.legend.display = false;
//--Chart Style Options--//

export default class BarGraph extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate() {
        this.buildChart();
    }

    buildChart = () => {
        const myChartRef = this.chartRef.current.getContext("2d");

        if (typeof myBarGraph !== "undefined") myBarGraph.destroy();

        myBarGraph = new Chart(myChartRef, {
            type: "bar",
            data: {
                labels: this.props.labels,
                datasets: [
                    {
                        data: this.props.maritalStatus,
                        fill: true,
                        backgroundColor: ['rgba(255,0,0,0.5)','rgba(0,0,128,0.5)','rgba(0,255,0,0.5)']
                    }
                ]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: this.props.title,
                    fontSize: 22,
                    fontFamily: 'Lucida',
                    fontColor: '#000000'
                },
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false,
                            drawBorder: true,
                            drawOnChartArea: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: true,
                            drawBorder: false,
                            drawOnChartArea: true
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

    }

    render() {

        return (
            <div>
                <canvas
                    id="myBarGraph"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}