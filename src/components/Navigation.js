import React, { PureComponent } from 'react';
import Link from 'react-router-dom/Link';
import withRouter from 'react-router/withRouter';
import Menu from 'antd/lib/menu';
import styled from 'styled-components';

import Section from '~/components/Common/Section';
import logoSrc from '../../public/images/logo.png';

const StyledNavigation = styled.div`
  display: flex;
  flex-flow: column;

  .ant-menu {
    font-size: 12px;
    line-height: 30px;

    .ant-menu-item {
      top: 3px;
    }
  }
`;

const Logo = styled.img`
  height: 20px;
  margin-right: 10px;
`;

const Header = styled(Section)`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  padding: 5px 16px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 700;

  a {
    color: ${config.colors.maingrey};
    text-decoration: none;
  }
`;

class MainHeader extends PureComponent {
  render() {
    const { pathname } = this.props.location;
    const view = pathname.substr(1, pathname.length - 1) || 'dashboard';

    return (
      <StyledNavigation>
        <Header>
          <Title>
            <Logo src={logoSrc} alt="verkehrsmonitor logo" />
            <Link to="/">verkehrsmonitor</Link>
          </Title>
          <Menu
            className="navigation__menu"
            mode="horizontal"
            selectedKeys={[view]}
          >
            <Menu.Item key="dashboard">
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="about">
              <Link to="/ueber">Über</Link>
            </Menu.Item>
            <Menu.Item key="imprint">
              <Link to="/impressum">Impressum</Link>
            </Menu.Item>
          </Menu>
        </Header>
      </StyledNavigation>
    );
  }
}

export default withRouter(MainHeader);
