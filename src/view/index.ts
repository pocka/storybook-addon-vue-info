import addons from '@storybook/addons'

import { Events } from '../addon'
import { InfoAddonOptions } from '../options'
import { StoryInfo } from '../types/info'

export function renderToPanel(
  info: StoryInfo,
  options: InfoAddonOptions
): void {
  const channel = addons.getChannel()

  channel.emit(Events.ShowDocs, { info, options })
}
