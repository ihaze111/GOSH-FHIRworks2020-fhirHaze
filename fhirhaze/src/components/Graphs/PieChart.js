import React, { Component } from 'react'
import Chart from "chart.js";
let myPieChart;

//--Chart Style Options--//
Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.legend.display = false;
//--Chart Style Options--//

export default class PieChart extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate() {
        this.buildChart();
    }

    buildChart = () => {
        const myChartRef = this.chartRef.current.getContext("2d");

        if (typeof myPieChart !== "undefined") myPieChart.destroy();

        myPieChart = new Chart(myChartRef, {
            type: "pie",
            data: {
                labels: this.props.labels,
                datasets: [
                    {
                        label: ["Male", "Female"],
                        data: this.props.patientGender,
                        fill: true,
                        backgroundColor: ['rgba(255,0,0,0.5)','rgba(0,0,128,0.5)']
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
                    display: true,
                    position: 'bottom',
                    labels: {
                        fontColor: '#000'
                    }
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, data) {
                          var dataset = data.datasets[tooltipItem.datasetIndex];
                          var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                          var total = meta.total;
                          var currentValue = dataset.data[tooltipItem.index];
                          var percentage = parseFloat((currentValue/total*100).toFixed(1));
                          return currentValue + ' (' + percentage + '%)';
                        },
                        title: function(tooltipItem, data) {
                          return data.labels[tooltipItem[0].index];
                        }
                    }
                }
            }
        });

    }

    render() {
        return (
            <div>
                <canvas
                    id="myPieChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}