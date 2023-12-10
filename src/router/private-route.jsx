import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, roles }) => {
  const { isUserLogin, user } = useSelector((state) => state.auth);//merkezi state baglanip login olup olmagina bak, login degilse login 

  if (!isUserLogin) return <Navigate to="/login" />;
  if (!roles || !Array.isArray(roles) || !roles.includes(user.role))
    return <Navigate to="/unauthorized" />;
 //rol dolumu, dizi tipinde mi, routerdan gelen rollerin icinde kullanicinin rolü var mi 
  return children;
};

export default PrivateRoute;

/*
mesela ben dahboarda bir talepte bulunuyorum ama login degilsem direk logine devrediyor 
dashboardPage artik bu componentin children i. Bu yuzden login sarti saglandiktan sonra  <Navigate to="/login"/> ile artik login olmus sayfa acilir.
*/