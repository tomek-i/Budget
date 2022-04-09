import React, { ComponentProps } from 'react';
import { ComponentMeta, Story } from '@storybook/react';
import { LoginForm } from './LoginForm';
//tailwind
import '../../../css/style.scss';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'LoginForm',
  component: LoginForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof LoginForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<ComponentProps<typeof LoginForm>> = (args) => (
  <LoginForm {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
