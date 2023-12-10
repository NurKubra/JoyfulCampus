import React from "react";
import Events from "../components/events/events";
import Spacer from "../components/common/spacer";
import PageHeader from "../components/common/page-header";

const EventsPage = () => {
  return (
    <div>
      <PageHeader title="Events" />
      <Spacer />
      <Events />
      <Spacer />
    </div>
  );
};

export default EventsPage;
