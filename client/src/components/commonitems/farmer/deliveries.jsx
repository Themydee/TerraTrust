import React from 'react'
import { DashboardTitle } from "../../../components/DashboardTitle";
import { DashboardLayout } from "../../../components/layouts/DashboardLayout";

const deliveries = () => {
  return (
    <div>
        <DashboardLayout>
             <div className='space-y-6'>
                    <DashboardTitle 
                      title="Deliveries Dashboard" 
                      description="Manage all your deliveries"
                    />
                  </div>
        </DashboardLayout>
    </div>
  )
}

export default deliveries