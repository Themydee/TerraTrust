import React from 'react'
import { DashboardTitle } from "../../../components/DashboardTitle";
import { DashboardLayout } from "../../../components/layouts/DashboardLayout";

const loan = () => {
  return (
   <DashboardLayout>
      <div className='space-y-6'>
        <DashboardTitle 
          title="Loan Dashboard" 
          description="Manage all your loans"
        />
      </div>
   </DashboardLayout>
  )
}

export default loan