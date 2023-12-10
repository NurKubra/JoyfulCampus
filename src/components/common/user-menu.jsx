//kullanici login olduktan sonra login yazisini degistirmek icin
import React from "react";
import { useSelector } from "react-redux";
import UserMenuAuth from "./user-menu-auth";
import UserMenuGuest from "./user-menu-guest";

const UserMenu = () => {
  const { isUserLogin } = useSelector((state) => state.auth); //kullanicinin login olup oladigina merkezi state den ulsacagiz ona gore 

  return (
    <div className="user-menu">
      {isUserLogin ? <UserMenuAuth /> : <UserMenuGuest />}
    </div>
  );
};

export default UserMenu;