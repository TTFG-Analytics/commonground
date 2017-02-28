const handlePieData = (voters) => {
  var votePieData = []
  voters.forEach(voter => {
    let pieTuple = []
    let name = ''
    if(this.state.demographic === 'age'){
      let voterCategory = voter[0]
      name = voterCategory
    } else {
      name = categories[voter[0]]
    }
    if(name){
      pieTuple[0] = name + ' voter'
    } else {
      pieTuple[0] = 'Other voter'
    }
    pieTuple[1] = voter[1]
    votePieData.push(pieTuple)
  })
  return votePieData;
}

export default handlePieData