import React from 'react';
import AllReports from '../components/AllReports';
import OtherReports from '../components/OtherReports';
import SupDrawer from '../components/SupDrawer';

function Reports(props) {

  if (localStorage.getItem('department') == 'Department of Human Resources') {
    return (
      <div>
        <SupDrawer>
          <AllReports />
        </SupDrawer>
      </div>
    );
  } else {
    return (
      <div>
        <SupDrawer>
          <OtherReports />
        </SupDrawer>
      </div>
    );
  }
}

export default Reports;