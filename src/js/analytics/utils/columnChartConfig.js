const columnChartConfig = (category, upvoters, downvoters, commenters) => {
  return {
    chart: {
      type: 'column'
    },
    title: {
      text: `Statistics`
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0,
        groupPadding: 0,
        shadow: false
      }
    },
    xAxis: {
      categories: category
    },
    series: [
      {
        name: 'Upvoters',
        data: upvoters
      },
      {
        name: 'Downvoters',
        data: downvoters
      },
      {
        name: 'Commenters',
        data: commenters
      }
    ]
  }
}

export default columnChartConfig