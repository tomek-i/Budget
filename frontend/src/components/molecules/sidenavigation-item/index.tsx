import React, { createElement, Fragment, useState } from 'react';
import './sidenavigation.css';
import { Navigation } from '../../atoms/navigation/navigation';
import { List } from '../../atoms/list/list';
import { ListItem } from '../../atoms/listitem/listitem';
export interface SideNavigationItemProps {
  title: string;
}

export const SideNavigationItem: React.FC<SideNavigationItemProps> = ({
  title,
  children,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <Fragment>
      <ListItem className="header_link">
        <a
          className="links_group active"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {title}
        </a>
        <div className={`links_group ${isCollapsed ? 'collapse' : 'show'}`}>
          {children}
          {/* <List type={'unordered'}>
            <ListItem>
              <a>Analytics</a>
            </ListItem>
            <ListItem>
              <a>Visits</a>
            </ListItem>
            <ListItem>
              <a>Other</a>
            </ListItem>
          </List> */}
        </div>
      </ListItem>
    </Fragment>
  );
};
