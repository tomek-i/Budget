import React, { ComponentProps } from 'react';
import { ComponentMeta, Story } from '@storybook/react';
import { Checkbox } from './Checkbox';
//tailwind
import '../../../css/style.scss';
import { Label } from '../Label';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Checkbox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<ComponentProps<typeof Checkbox>> = (args) => (
  <Checkbox {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  label: 'Hi',
  disabled: true,
  checked: false,
};
