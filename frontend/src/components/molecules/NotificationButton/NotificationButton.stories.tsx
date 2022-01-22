import React, { ComponentProps } from 'react';
import { ComponentMeta, Story } from '@storybook/react';
import { NotificationButton } from './NotificationButton';
//tailwind
import '../../../css/style.scss';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/NotificationButton',
  component: NotificationButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof NotificationButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<ComponentProps<typeof NotificationButton>> = (args) => (
  <NotificationButton {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
