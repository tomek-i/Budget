import { Hamburger } from '../../atoms/Buttons/Hamburger';
import { Header } from '../../atoms/Header';
import React, { useState } from 'react';
import '../../../css/style.scss';

export type NavigationHeaderProps = {};

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Header className="sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <Hamburger
              text="Open Sidebar"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
          </div>
          {/* Header: Right side */}
          <div className="flex items-center">
            {children}
            {/* <SearchModal /> */}
            {/* <Notifications /> */}
            {/* <Help /> */}
            {/*  Divider */}
            {/* <hr className="w-px h-6 bg-gray-200 mx-3" /> */}
            {/* <UserMenu /> */}
          </div>
        </div>
      </div>
    </Header>
  );
};
