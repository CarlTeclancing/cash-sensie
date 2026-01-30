import React, { use } from 'react'
import { COLORS, DARK_MODE_COLORS } from '../constants/constants'
import { useAppStore } from '../store/store'

type props = {
  title : string
}
const PageTitle = ({ title }: props) => {
  const { isDarkMode } = useAppStore();
  return (
    <div className='w-full flex flex-col gap-2'>
      <p className='text-xl font-semibold'
        style={{
        color: `${isDarkMode ? COLORS.white : COLORS.black}`
      }}
      >{title}</p>
      <div className="w-full" style={{
        height: "1px",
        backgroundColor: isDarkMode ? COLORS.grey : COLORS.blue
      }}></div>
    </div>
  )
}

export default PageTitle
