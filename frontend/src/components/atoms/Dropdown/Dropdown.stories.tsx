import React, { ComponentProps } from 'react';
import { ComponentMeta, Story } from '@storybook/react';
import { DropdownProps, Dropdown } from './Dropdown';
//tailwind
import '../../../css/style.scss';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Dropdown',
  component: Dropdown,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Dropdown>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<ComponentProps<typeof Dropdown>> = (args) => (
  <Dropdown {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
export const WithItems = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithItems.args = {
  items: ['one', 'tww'],
};
