import React, { Component } from 'react'
import Chart from "chart.js";
let myHorizontalBarGraph;

//--Chart Style Options--//
Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.legend.display = false;
//--Chart Style Options--//

export default class HorizontalBarGraph extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate() {
        this.buildChart();
    }

    buildChart = () => {
        const myChartRef = this.chartRef.current.getContext("2d");

        if (typeof myHorizontalBarGraph !== "undefined") myHorizontalBarGraph.destroy();

        myHorizontalBarGraph = new Chart(myChartRef, {
            type: "horizontalBar",
            data: {
                labels: this.props.labels,
                datasets: [
                    {
                        data: this.props.ageDistribution,
                        fill: true,
                        backgroundColor: ['rgba(255,0,0,0.5)','rgba(0,0,128,0.5)','rgba(0,255,0,0.5)','rgba(255,165,0,0.5)','rgba(238,130,238,0.5)','rgba(0,255,255,0.5)']
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
                            display: true,
                            drawBorder: true,
                            drawOnChartArea: true
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false,
                            drawBorder: true,
                            drawOnChartArea: false
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
                    id="myHorizontalBarGraph"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}