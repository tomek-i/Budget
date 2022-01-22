import React, { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, Story } from '@storybook/react';
import { Papershredder } from './papershredder';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/Papershredder',
  component: Papershredder,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Papershredder>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<ComponentProps<typeof Papershredder>> = (args) => (
  <Papershredder {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
