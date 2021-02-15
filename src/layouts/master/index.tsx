import React, { useState } from "react";
import type { FC, CSSProperties } from "react";
import { Drawer, Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import classes from "./index.module.less";
import classNames from "classnames";
const { Header, Sider, Content } = Layout;
const styles: Record<string, CSSProperties> = {
  fixedSidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100%",
  },
  fixedHeader: {
    position: "fixed",
    top: 0,
    left: "150px",
    zIndex: 999,
    width: "100%",
  },
  fixedContent: {
    width: "1200px",
    minHeight: "1200px",
    margin: "0 auto",
  },
};
const BasicLayout: FC = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const toggle = () => setCollapsed(!collapsed);
  return (
    <Layout className={classes["basic-layout"]}>
      <Header
        className={classes["basic-layout-header"]}
        style={{ padding: 0, ...styles.fixedHeader }}
      >
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: toggle,
          }
        )}
      </Header>

      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="lg"
          collapsedWidth="0"
          style={styles.fixedSidebar}
          className={classNames(
            // classes["basic-layout-sidebar"],
            classes["basic-layout-sidebar"]
          )}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Content
          className={classes["basic-layout-content"]}
          style={styles.fixedContent}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default BasicLayout;
