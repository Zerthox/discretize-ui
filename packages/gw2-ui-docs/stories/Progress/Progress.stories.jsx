import React from 'react';
import { number, text } from '@storybook/addon-knobs';
import { Progress } from 'gw2-ui';

import categories from '../categories';
import readme from './Progress.readme.md';
import docs from './Progress.docs.md';

export default {
  category: categories.HELPERS,
  name: 'Progress',
  readme,
  docs,
  story: () => (
    <Progress
      component={text('component', 'span')}
      style={{ fontSize: number('style.fontSize', 24) }}
    />
  ),
};
