const pieChartConfig = (pieData) => {
  return {
    chart: {
      type: 'pie',
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false
    },
    title: {
      text: `Statistics for Comment`
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        }
      }
    },
    series: [
      {
        name: 'Voters',
        data: pieData
      }
    ]
  }
}

export default pieChartConfig