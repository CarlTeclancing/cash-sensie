import React from "react";
import SummaryComp from "../components/SummaryComp";
import Chart from "../components/Chart";

const Dashboard = () => {
  return (
    <div className="flex w-full items-center justify-center mt-4">
      <div className="flex w-full md:w-auto justify-center md:justify-self-auto gap-5">
        <Chart />
        <SummaryComp />
      </div>
    </div>
  );
};

export default Dashboard;
