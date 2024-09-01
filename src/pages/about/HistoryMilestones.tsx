import { Timeline } from "antd";

const HistoryMilestones = () => (
  <section className="history-section">
    <h2>Our Journey</h2>
    <div className="timeline-container">
      <Timeline
        items={[
          { children: "Founded the platform - 2015-09-01" },
          { children: "Expanded to 5 major cities - 2017-03-10" },
          { children: "Reached 1 million bookings - 2019-06-25" },
          { children: "Partnered with 1000+ facilities - 2021-11-15" },
          { children: "Launched mobile app - 2022-05-01" },
        ]}
      />
    </div>
  </section>
);

export default HistoryMilestones;
