import React from 'react'
import { DashboardTitle } from "../../../components/DashboardTitle";
import { DashboardLayout } from "../../../components/layouts/DashboardLayout";

const reports = () => {
  return (
    <div>
      <DashboardLayout>
         <div className='space-y-6'>
            <DashboardTitle 
              title="Reports Dashboard" 
              description="Manage all your reports"
            />
          </div>
      </DashboardLayout>
    </div>
  )
}

export default reports