import React from "react";
import PageHeader from "../../components/common/page-header";
import Spacer from "../../components/common/spacer";
import { useSelector } from "react-redux";
import NewMeetForm from "../../components/dasboard/meet/new-meet-form";
import EditMeetForm from "../../components/dasboard/meet/edit-meet-form";
import MeetList from "../../components/dasboard/meet/meet-list";
const MeetPage = () => {
  const { currentOperation } = useSelector((state) => state.misc);

  return (
    <>
      <PageHeader title="Meet" />
      <Spacer />

      {currentOperation === "new" && (
        <>
          <NewMeetForm/>
          <Spacer />
        </>
      )}

      {currentOperation === "edit" && (
        <>
          <EditMeetForm/>
          <Spacer />
        </>
      )}

      <MeetList/>
      <Spacer />
    </>
  );
};

export default MeetPage;