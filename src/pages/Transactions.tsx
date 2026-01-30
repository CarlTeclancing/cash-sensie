import React from 'react'
import Chart from '../components/Chart'
import SummaryComp from '../components/SummaryComp';
import PageTitle from '../components/PageTitle';

const Transactions = () => {
  return (
    <div className="py-8 md:px-5 w-full flex flex-col gap-4">
      <PageTitle title="Your Transactions"/>
    </div>
  );
}

export default Transactions
