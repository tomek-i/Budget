import React, { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, Story } from '@storybook/react';
import { Shimmer } from './shimmer';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/Shimmer',
  component: Shimmer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    type: { control: { type: 'select', options: ['line', 'box', 'round'] } },
  },
} as ComponentMeta<typeof Shimmer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<ComponentProps<typeof Shimmer>> = (args) => (
  <Shimmer {...args} />
);

export const Line = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Line.args = {
  type: 'line',
  height: '4',
};
export const Box = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Box.args = {
  type: 'box',
  width: '12',
  height: '12',
};
export const Round = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Round.args = {
  type: 'round',
  width: '12',
  height: '12',
};
