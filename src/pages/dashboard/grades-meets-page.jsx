import React from "react";
import PageHeader from "../../components/common/page-header";
import Spacer from "../../components/common/spacer";
import StudentMeetList from "../../components/dasboard/grade-meet/student-meet-list";
import GradeList from "../../components/dasboard/grade-meet/grade-list";
const GradesMeetsPage = () => {

  return (
    <>
      <PageHeader title="Grades & Meets" />
      <Spacer />
      <GradeList/>
      <Spacer />
      <StudentMeetList/>
      <Spacer/>
    </>
  );
};

export default GradesMeetsPage;