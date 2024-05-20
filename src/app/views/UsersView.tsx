import React from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { Typography, Collapse, theme, Spin, Skeleton } from "antd";
import type { CollapseProps } from "antd";
import { CaretRightOutlined, LoadingOutlined } from "@ant-design/icons";
import { useUser } from "@/app/hooks/useUser";
import { usePost } from "@/app/hooks/usePost";
import { IPost } from "@/shared/types";

const { Title } = Typography;

const UsersView: React.FC = () => {
  const { users, loadingUsers } = useUser();
  const { postsByUser, handleGetPostsByUserId } = usePost();

  const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (panelStyle) => {
    return users.map((user) => ({
      key: String(user.id),
      label: user.name,
      children: postsByUser[user.id] ? (
        postsByUser[user.id].map((post: IPost) => (
          <p key={post.id}>
            <Link to={`message/${post.id}`}>
              #{post.id} {post.title}
            </Link>
          </p>
        ))
      ) : (
        <Skeleton active />
      ),
      style: panelStyle,
      className: "post-elem",
    }));
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const panelStyle = {
    marginBottom: 24,
    background: colorBgContainer,
    borderRadius: borderRadiusLG,
    border: "1px solid",
    borderColor: "#ffec3d",
  };

  return (
    <>
      <Title level={2}>Пользователи</Title>
      {loadingUsers ? (
        <div className="preloader-container">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: "#fff566" }} spin />} />
        </div>
      ) : (
        <Collapse
          bordered={false}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          style={{
            background: colorBgContainer,
          }}
          size="large"
          items={getItems(panelStyle)}
          onChange={(userId) => handleGetPostsByUserId(Number(userId.at(-1)))}
        />
      )}
    </>
  );
};

export default UsersView;
