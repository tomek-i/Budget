import React, { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, Story } from '@storybook/react';
import { ContextMenu } from './contextMenu';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/ContextMenu',
  component: ContextMenu,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ContextMenu>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<ComponentProps<typeof ContextMenu>> = (args) => (
  <ContextMenu {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  visible: true,
  // items: [
  //   {
  //     text: 'test',
  //     onClick: () => console.log('clicked'),
  //     enabled: true,
  //   },
  //   {
  //     text: 'test2',
  //     onClick: () => console.log('test2'),
  //     enabled: true,
  //   },
  //   {
  //     text: '-',
  //     onClick: () => console.log('-'),
  //     enabled: true,
  //   },
  //   {
  //     text: 'test33',
  //     onClick: () => console.log('3'),
  //     enabled: true,
  //   },
  // ],
};
