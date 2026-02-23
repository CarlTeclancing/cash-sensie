import React from "react";
import SummaryComp from "../components/ui/SummaryComp";
import Chart from "../components/ui/Chart";

const Dashboard = () => {
  return (
    <div className="flex w-full items-center justify-center mt-4">
      <div className="flex w-full md:w-full lg:flex-row md:flex-col justify-center md:justify-center gap-6  lg:px-4">
        <div className="w-full lg:w-7/12 hidden  md:flex">
          <Chart />
        </div>
        <div className="w-full  lg:w-5/12 flex justify-center">
          <SummaryComp />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
