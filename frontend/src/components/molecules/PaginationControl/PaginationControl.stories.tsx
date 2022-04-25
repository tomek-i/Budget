import React, { ComponentProps } from 'react';
import { ComponentMeta, Story } from '@storybook/react';
import { PaginationControl } from './PaginationControl';
//tailwind
import '../../../css/style.scss';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'PaginationControl',
  component: PaginationControl,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof PaginationControl>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<ComponentProps<typeof PaginationControl>> = (args) => (
  <PaginationControl {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
