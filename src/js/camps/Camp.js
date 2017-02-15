// singular camp component - just presentational
import React from 'react'
import CampList from './CampList'
import CommentParent from '../comments/CommentParent'

const Camp = ({inputStr, key, campId}) => (
  <li>
    <h3>{inputStr}</h3>
    <CommentParent campId={campId} />
  </li>
)

export default Camp