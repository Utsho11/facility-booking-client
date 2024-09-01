import { Card, Col, Row } from "antd";
import { TeamMember } from "./About";

interface TeamSectionProps {
  team: TeamMember[];
}

const TeamSection: React.FC<TeamSectionProps> = ({ team }) => (
  <section className="team-section">
    <h2>Meet Our Team</h2>
    <Row gutter={[16, 16]} justify="center">
      {team.map((member, index) => (
        <Col xs={24} sm={12} md={8} key={index}>
          <Card
            hoverable
            cover={
              <img
                alt={member.name}
                src={member.photoUrl}
                className="team-photo"
              />
            }
            className="team-card"
          >
            <Card.Meta title={member.name} description={member.role} />
            <p className="team-bio">{member.bio}</p>
          </Card>
        </Col>
      ))}
    </Row>
  </section>
);

export default TeamSection;
