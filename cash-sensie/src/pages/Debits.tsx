import React from "react";
import PageTitle from "../components/ui/PageTitle";
import Table from "../components/ui/Table";
import { useWindowSize } from "../hooks/useWindowSize";
import { MOBILE_SIZE } from "../constants/constants";
import MobilePageTitle from "../components/ui/MobilePageTitle";

const Debits = () => {
  const { width } = useWindowSize();
  const isMobile = width <= MOBILE_SIZE;
  return (
    <div className="py-8 md:px-5 w-full flex flex-col gap-4 items-center justify-center">
      {isMobile ? (
        <MobilePageTitle title="Debits" />
      ) : (
        <PageTitle title="Your Debits" />
      )}
      <Table />
    </div>
  );
};

export default Debits;
