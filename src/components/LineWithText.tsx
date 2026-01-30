import React from 'react'
import { COLORS } from '../constants/constants'

type props = {
  text: string
}

const LineWithText = ({text}: props) => {
  return (
    <div className="reative w-full h-fit items-center justify-between flex">
      <div
        className='opacity-50'
        style={{
          width: "46%",
          border: `1px solid ${COLORS.grey}`,
        }}
      ></div>
      <span style={{
        color: COLORS.grey
      }}>{text}</span>
      <div
        className='opacity-50'
        style={{
          width: "46%",
          border: `1px solid ${COLORS.grey}`,
        }}
      ></div>
    </div>
  );
}

export default LineWithText
