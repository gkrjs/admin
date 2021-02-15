import React, { FC, useState } from "react";
import { Button, Descriptions, Result, Avatar, Space, Statistic } from "antd";
import { LikeOutlined, UserOutlined } from "@ant-design/icons";

import type { BasicLayoutProps, ProSettings } from "@ant-design/pro-layout";
import ProLayout, {
  PageContainer,
  SettingDrawer,
} from "@ant-design/pro-layout";
import defaultProps from "./_defaultProps";
const BasicLayout: FC = ({ children }) => {
  const [settings, setSetting] = useState<Partial<ProSettings>>({});
  const [pathname, setPathname] = useState("/welcome");
  return (
    <div
      id="test-pro-layout"
      style={{
        height: "100vh",
      }}
    >
      <ProLayout
        {...defaultProps}
        location={{
          pathname,
        }}
        collapsedButtonRender={false}
        collapsed
        fixSiderbar
        navTheme="dark"
        fixedHeader
        disableContentMargin
        headerRender={false}
      >
        <ProLayout
          collapsed={false}
          collapsedButtonRender={false}
          fixSiderbar
          route={{
            routes: defaultProps.route?.routes,
          }}
          navTheme="light"
          rightContentRender={() => (
            <div>
              <Avatar shape="square" size="small" icon={<UserOutlined />} />
            </div>
          )}
          disableContentMargin
          menuHeaderRender={false}
        >
          <div
            style={{
              height: "100vh",
              overflow: "auto",
            }}
          >
            <PageContainer content="欢迎使用">{children}</PageContainer>
          </div>
        </ProLayout>
      </ProLayout>
      <SettingDrawer
        pathname={pathname}
        getContainer={() => document.getElementById("test-pro-layout")}
        settings={settings}
        onSettingChange={(changeSetting) => setSetting(changeSetting)}
      />
    </div>
  );
};
export default BasicLayout;
