import React, { FC, useState } from "react";
import { Button, Descriptions, Result, Avatar, Space, Statistic } from "antd";
import { LikeOutlined, UserOutlined } from "@ant-design/icons";

import type { BasicLayoutProps, ProSettings } from "@ant-design/pro-layout";
import ProLayout, {
  PageContainer,
  SettingDrawer,
} from "@ant-design/pro-layout";
import defaultProps from "./_defaultProps";
const Wrapper: FC = ({ children }) => {
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
        {children}
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
export default Wrapper;
