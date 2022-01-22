import React, { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, Story } from '@storybook/react';
import { LoadingSpinner } from './loading-spinner';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/LoadingSpinner',
  component: LoadingSpinner,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    type: { control: { type: 'select', options: ['bounce'] } },
    color: { control: 'color' },
  },
} as ComponentMeta<typeof LoadingSpinner>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<ComponentProps<typeof LoadingSpinner>> = (args) => (
  <LoadingSpinner {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
