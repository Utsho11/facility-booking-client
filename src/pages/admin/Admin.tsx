import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/layout/NavBar";

const { Content } = Layout;
const Admin = () => {
  return (
    <Layout>
      <Navbar />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default Admin;
