import React from 'react'
import Ads01 from './Ads01'

function Ads() {
  return (
    <div>
      {window.location.href.includes("anlakshya.tech") ? <Ads01 />:""}
    </div>
  )
}

export default Ads