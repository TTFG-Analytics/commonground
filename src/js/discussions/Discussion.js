import React from 'react'
import CampParent from '../camps/CampParent'
import DiscussionList from './DiscussionList'

const Discussion = ({ onCreateCamp, inputStr, discussionId }) => (
  <li>
    <h3>{inputStr}</h3>
    <CampParent discussionId={discussionId} />
  </li>
)

export default Discussion