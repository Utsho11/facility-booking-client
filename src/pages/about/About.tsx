import "./about.css";
import ContactInformation from "./ContactInformation";
import HistoryMilestones from "./HistoryMilestones";
import MissionStatement from "./MissionStatement";
import TeamSection from "./TeamSection";
import user1 from "../../assets/images/User-1.avif";
import user2 from "../../assets/images/User-2.avif";
import user3 from "../../assets/images/User-3.webp";

export interface TeamMember {
  name: string;
  role: string;
  photoUrl: string;
  bio: string;
}

// Data for team members
const team: TeamMember[] = [
  {
    name: "John Doe",
    role: "CEO",
    photoUrl: user1,
    bio: "John leads the team with over 10 years of experience in the industry.",
  },
  {
    name: "Janie Smith",
    role: "CTO",
    photoUrl: user2,
    bio: "Jane is responsible for technology and innovation at the company.",
  },
  {
    name: "Mike Johnson",
    role: "CFO",
    photoUrl: user3,
    bio: "Mike manages the companys finances and strategic planning. Lorem Ips incorrectly referred to the company.",
  },
];

const About = () => {
  return (
    <div className="about-us">
      <MissionStatement />
      <TeamSection team={team} />
      <HistoryMilestones />
      <ContactInformation />
    </div>
  );
};

export default About;
