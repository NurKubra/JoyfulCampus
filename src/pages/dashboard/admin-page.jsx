import React from "react";
import PageHeader from "../../components/common/page-header";
import Spacer from "../../components/common/spacer";

import { useSelector } from "react-redux";
import AdminList from "../../components/dasboard/admin/admin-list";
import NewAdminForm from "../../components/dasboard/admin/new-admin-form";


const AdminPage = () => {
  const { currentOperation } = useSelector((state) => state.misc); //burdan new islemi icin olusturdugumuz merkezi state e ulasiyoruz ve eger currentOperation new durumunda ise o zaman newAdminForm devreye gircek !!

  return (
    <>
      <PageHeader title="Admin" />
      <Spacer />

      {currentOperation === "new" && ( 
        <>
          <NewAdminForm/>
          <Spacer />
        </>
      )}

      <AdminList/>
      <Spacer />
    </>
  );
};

export default AdminPage;