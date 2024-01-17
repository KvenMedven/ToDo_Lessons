import type {Meta, StoryObj} from '@storybook/react';
import React from "react";
import {action} from '@storybook/addon-actions'
import {EditableSpan} from "../EditableSpan";

const meta: Meta<typeof EditableSpan> = {
  title: 'Todolist/EditableSpan',
  component: EditableSpan,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onChange:{
      description:"Value EditableSpan   onChange",
      action: action('f')
    },
  },
  args:{
    value:"afd"
  }
};
export default meta;
type Story = StoryObj<typeof EditableSpan>;
export const EditableSpanStory: Story = {

};

