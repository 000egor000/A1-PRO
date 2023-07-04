import React from 'react'
import './BlockElement.scss'

import { useNavigate } from 'react-router-dom'

const BlockElement = () => {
  const titleUrl = window.location.href.split('/').slice(3).join('/')
  const navigate = useNavigate()
  const back = () => navigate(-1)

  return (
    <div className="blockElement">
      <button onClick={back}> На главную</button>

      <div className="infoElement">
        <p>{titleUrl}</p>
      </div>
    </div>
  )
}

export default BlockElement
