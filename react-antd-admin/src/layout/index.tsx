import './index.less';

import { Layout } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { RouteView } from '@/routes/routeView';
import { userStore } from '@/stores/user';

import HeaderComponent from './header';
import MenuComponent from './menu';
import TagsView from './tagView';

const { Sider, Content } = Layout;

const LayoutPage: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [navigate, location]);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="layout-page">
      <HeaderComponent collapsed={collapsed} toggle={toggle} />

      <Layout hasSider>
        <Sider
          className="layout-page-sider"
          trigger={null}
          collapsed={collapsed}
          breakpoint="lg"
          width={250}
          style={{
            boxSizing: 'border-box',
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 64,
            bottom: 0
          }}
        >
          <MenuComponent menuList={userStore.menuList} />
        </Sider>

        <Layout
          style={{
            padding: '0 10px',
            margin: collapsed ? '64px 0 0 80px' : '64px 0 0 250px',
            height: 'max-content'
          }}
        >
          <TagsView />
          <Content className="layout-page-content">
            <RouteView />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
