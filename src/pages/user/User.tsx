import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/layout/SideBar";

const { Content } = Layout;

const User = () => {
  return (
    <Layout>
      <SideBar />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default User;
