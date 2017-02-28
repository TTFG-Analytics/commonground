import industry from '../demographics/industry'
import religion from '../demographics/religion'
import race from '../demographics/race'
import income from '../demographics/income'
import politicalleaning from '../demographics/politicalleaning'

const selectCategory = (demographic) => {
  if(demographic === 'politicalleaning') {
    return politicalleaning;
  } else if(demographic === 'race') {
    return race
  } else if(demographic === 'industry') {
    return industry
  } else if(demographic === 'religion') {
    return religion
  } else if(demographic === 'yearlyincome') {
    return income
  }
}

export default selectCategory