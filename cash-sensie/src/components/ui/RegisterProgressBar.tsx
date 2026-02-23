import React from "react";
import ProgressComponent from "./ProgressComponent";

type props = {
  progress: number;
};

const RegisterProgressBar = ({ progress }: props) => {
  return (
    <div className="w-full flex items-center justify-center">
      <ProgressComponent isOn={progress >= 1} text="1" />
      <ProgressComponent isOn={progress >= 2} text="2" />
      <ProgressComponent isOn={progress >= 3} text="3" />
      <ProgressComponent isOn={progress >= 4} text="4" />
    </div>
  );
};

export default RegisterProgressBar;
