import { NavigationHeader } from '../../molecules/NavigationHeader';
import { NotificationButton } from '../../molecules/NotificationButton';
import React from 'react';
import '../../../css/style.scss';
import { SearchButton } from '../../../components/molecules/SearchButton';
import { UserMenu } from '../UserMenu';

export type TopNavigationProps = {};

export const TopNavigation: React.FC<TopNavigationProps> = ({}) => {
  return (
    <NavigationHeader>
      <SearchButton />
      <NotificationButton />
      {/* <Help /> */}
      {/*  Divider */}
      <hr className="w-px h-6 bg-gray-200 mx-3" />
      <UserMenu />
    </NavigationHeader>
  );
};
