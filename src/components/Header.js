import React from "react";

import { Menu, Icon } from "semantic-ui-react";

const Header = () => {
  return (
    <Menu inverted>
      <Menu.Item header>React Discovery</Menu.Item>
      <Menu.Item position='right'>
        <Icon name='shopping cart' />
      </Menu.Item>
    </Menu>
  );
};

export default Header;
