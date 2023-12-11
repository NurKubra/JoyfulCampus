import React from "react";
import PageHeader from "../../components/common/page-header";
import Spacer from "../../components/common/spacer";
import StudentProgramList from "../../components/dasboard/choose-lesson/student-program-list";
import AllProgramList from "../../components/dasboard/choose-lesson/all-program-list";
const ChooseLessonPage = () => {

  return (
    <>
      <PageHeader title="Choose Lesson" />
      <Spacer />
      <AllProgramList/>
      <Spacer />
      <StudentProgramList/>
      <Spacer/>
    </>
  );
};

export default ChooseLessonPage;