import React, { createElement, Fragment, useState } from 'react';
// import './sidenavigation.css';
import { Navigation } from '../../atoms/navigation/navigation';
import { List } from '../../atoms/list/list';
import { ListItem } from '../../atoms/listitem/listitem';
export interface SideNavigationProps {
  className?: string;
}

export const SideNavigation: React.FC<SideNavigationProps> = ({
  className,
  children,
  ...props
}) => {
  const [dashboardCollapsed, setDashboardCollapsed] = useState(true);
  const [usersCollapsed, setUsersCollapsed] = useState(true);

  return (
    //sidebar_wrapper
    <div className=" fixed inset-y-0 left-0 h-screen overflow-y-auto overflow-x-hidden transition ease-in-out w-3/12">
      <Navigation className="sidebar">
        <List type={'unordered'} className="sidebar_nav">
          <ListItem className="header_link">
            <a
              className="links_group active"
              onClick={() => setDashboardCollapsed(!dashboardCollapsed)}
            >
              Dashboard
            </a>
            <div
              className={`links_group ${
                dashboardCollapsed ? 'collapse' : 'show'
              }`}
            >
              <List type={'unordered'}>
                <ListItem>
                  <a>Analytics</a>
                </ListItem>
                <ListItem>
                  <a>Visits</a>
                </ListItem>
                <ListItem>
                  <a>Other</a>
                </ListItem>
              </List>
            </div>
          </ListItem>
          <ListItem className="header_link ">
            <a
              className="links_group active"
              onClick={() => setUsersCollapsed(!usersCollapsed)}
            >
              Users
            </a>
            <div
              className={`links_group ${usersCollapsed ? 'collapse' : 'show'}`}
            >
              <List type={'unordered'}>
                <ListItem>
                  <a>Management</a>
                </ListItem>
                <ListItem>
                  <a>My Profile</a>
                </ListItem>
                <ListItem>
                  <a>Edit Profile</a>
                </ListItem>
                <ListItem>
                  <a>Change Password</a>
                </ListItem>
              </List>
            </div>
          </ListItem>
        </List>
      </Navigation>
    </div>
  );
};
