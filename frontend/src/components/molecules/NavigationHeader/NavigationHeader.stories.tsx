import React, { ComponentProps } from 'react';
import { ComponentMeta, Story } from '@storybook/react';
import { NavigationHeader } from './NavigationHeader';
//tailwind
import '../../../css/style.scss';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'NavigationHeader',
  component: NavigationHeader,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof NavigationHeader>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<ComponentProps<typeof NavigationHeader>> = (args) => (
  <NavigationHeader {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
