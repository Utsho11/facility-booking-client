import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/layout/SideBar";

const { Content } = Layout;

const User = () => {
  return (
    <Layout>
      <SideBar />
      <Content className="dashboard-container">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default User;
