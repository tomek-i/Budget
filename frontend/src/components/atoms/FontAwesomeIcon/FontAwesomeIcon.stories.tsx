import React, { ComponentProps } from 'react';
import { ComponentMeta, Story } from '@storybook/react';
import { FontAwesomeIcon } from './FontAwesomeIcon';
//tailwind
import '../../../css/style.scss';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'FontAwesomeIcon',
  component: FontAwesomeIcon,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof FontAwesomeIcon>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<ComponentProps<typeof FontAwesomeIcon>> = (args) => (
  <FontAwesomeIcon {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
