import React, { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, Story } from '@storybook/react';
import { List } from './list';
import { ListItem } from '../listitem/listitem';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/List',
  component: List,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['unordered', 'ordered'],
      },
    },
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof List>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<ComponentProps<typeof List>> = (args) => (
  <List {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  type: 'ordered',
  children: (
    <>
      <ListItem>random</ListItem>
      <ListItem>child</ListItem>
      <ListItem>entries</ListItem>
      <ListItem>here</ListItem>
    </>
  ),
};
