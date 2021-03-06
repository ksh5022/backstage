/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import CopyTextButton from '.';
import { ApiProvider, errorApiRef, ApiRegistry, ErrorApi } from 'api';

export default {
  title: 'CopyTextButton',
  component: CopyTextButton,
  decorators: [
    (storyFn: () => JSX.Element) => {
      // TODO: move this to common storybook config, requires core package to be separate from components
      const registry = ApiRegistry.from([
        [
          errorApiRef,
          {
            post(error) {
              // eslint-disable-next-line no-alert
              window.alert(`Component posted error, ${error}`);
            },
          } as ErrorApi,
        ],
      ]);
      return <ApiProvider apis={registry} children={storyFn()} />;
    },
  ],
};

export const Default = () => (
  <CopyTextButton text="The text to copy to clipboard" />
);

export const WithTooltip = () => (
  <CopyTextButton
    text="The text to copy to clipboard"
    tooltipText="Custom tooltip shown on button click"
  />
);

export const LongerTooltipDelay = () => (
  <CopyTextButton
    text="The text to copy to clipboard"
    tooltipText="Waiting 3s before removing tooltip"
    tooltipDelay={3000}
  />
);
