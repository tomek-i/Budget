import React, { ComponentProps } from 'react';
import { ComponentMeta, Story } from '@storybook/react';
import { TopNavigation } from './TopNavigation';
//tailwind
import '../../../css/style.scss';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Organism/TopNavigation',
  component: TopNavigation,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof TopNavigation>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<ComponentProps<typeof TopNavigation>> = (args) => (
  <TopNavigation {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
