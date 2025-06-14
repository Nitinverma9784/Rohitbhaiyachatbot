

import { Outlet } from 'react-router'
import { useLocation } from "react-router";
import { useEffect } from 'react';
function Layout() {


  const location = useLocation();

  useEffect(() => {
    console.log("Route changed:", location.pathname);
  }, [location]);
  return (
    <>

    <Outlet key={location.pathname}/>
  
      
    </>
  )
}

export default Layout