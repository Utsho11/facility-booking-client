import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout>
      <Navbar />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default MainLayout;
