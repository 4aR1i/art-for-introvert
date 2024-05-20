import { Link, Outlet } from "react-router-dom";
import { Layout, theme } from "antd";
import logo from "@/assets/icons/logo.svg";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG, boxShadowTertiary },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{ display: "flex", alignItems: "center", background: colorBgContainer, boxShadow: boxShadowTertiary }}
      >
        <div className="logo-container">
          <Link to={"/"}>
            <img src={logo} alt="Logo" />
          </Link>
        </div>
      </Header>
      <Content className="content-container">
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
            marginTop: 24,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Art or introvert ©{new Date().getFullYear()} Created by 4aR1i</Footer>
    </Layout>
  );
};

export default App;
