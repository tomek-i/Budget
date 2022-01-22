import React, { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, Story } from '@storybook/react';
import { MenuBottonOpen } from './menuButton';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/MenuButtons/Open',
  component: MenuBottonOpen,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof MenuBottonOpen>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<ComponentProps<typeof MenuBottonOpen>> = (args) => (
  <MenuBottonOpen {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  visible: true,
  items: [
    {
      text: 'test',
      onClick: () => console.log('clicked'),
      enabled: true,
    },
    {
      text: 'test2',
      onClick: () => console.log('test2'),
      enabled: true,
    },
    {
      text: '-',
      onClick: () => console.log('-'),
      enabled: true,
    },
    {
      text: 'test33',
      onClick: () => console.log('3'),
      enabled: true,
    },
  ],
};
