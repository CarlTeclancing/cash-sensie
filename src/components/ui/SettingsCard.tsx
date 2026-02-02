import React from 'react'
import profilePict from "../../assets/Avatar.png"
import { COLORS, DARK_MODE_COLORS } from '../../constants/constants'
import { useAppStore } from '../../store/store'
import editIcon from "../../assets/edit-icon.png"
import editIconDark from "../../assets/edit-icon-dark.png"

const SettingsCard = () => {
  const { isDarkMode } = useAppStore();
  return (
    <div
      className="p-6 rounded-xl flex flex-col gap-8 w-8/12"
      style={{
        backgroundColor: isDarkMode ? DARK_MODE_COLORS.darkBlue : COLORS.white,
      }}
    >
      <div className="header flex w-full items-center justify-between">
        <img src={profilePict} alt="Profile" />
        <span
          className="font-bold text-lg"
          style={{
            color: `${isDarkMode ? COLORS.white : COLORS.black}`,
          }}
        >
          Yuan Carlson Dzelamonyuy
        </span>
        <img src={isDarkMode ? editIconDark : editIcon} alt="Edit" />
      </div>
      <div className="flex gap-14">
        <div className="flex flex-col gap-5">
          <span>Edit Profile</span>
          <span>General</span>
          <span>Password</span>
          <span>Currency</span>
        </div>
        <div className="flex flex-col gap-4 w-9/12">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="full-name">Full Name</label>
            <input
              type="text"
              name="full-name"
              id="full-name"
              className="w-full h-8 px-2 rounded-lg"
              style={{
                border: `1px solid ${COLORS.grey}`,
              }}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full h-8 px-2 rounded-lg"
              style={{
                border: `1px solid ${COLORS.grey}`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsCard
