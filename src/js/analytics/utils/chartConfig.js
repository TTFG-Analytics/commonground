const chartConfig = (category, upvoters, downvoters, commenters) => {
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
    series: [{
      name: 'Commenters',
      data: commenters
    },
    {
      name: 'Upvoters',
      data: upvoters
    },
    {
      name: 'Downvoters',
      data: downvoters
    }]
  }
}

export default chartConfig