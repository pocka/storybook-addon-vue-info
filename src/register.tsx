import * as React from 'react'
import Vue, { ComponentOptions } from 'vue'
import { VueWrapper } from 'vuera'

import addons, { Api, Channel } from '@storybook/addons'

import { AddonName, PanelName, Events } from './addon'
import { InfoAddonOptions } from './options'
import { StoryInfo } from './types/info'

import Wrapper from './components/Wrapper/index.vue'

interface Props {
  channel: Channel
  api: Api
  active: boolean
}

interface State {
  /** Information of current story */
  info?: StoryInfo
  /** Addon options */
  options?: InfoAddonOptions
}

class Info extends React.Component<Props, State> {
  public state: State = {}

  /** Callback to remove event handler */
  private stopListen?: () => void

  /**
   * Callback for ShowDocs event
   */
  private onShowDocs = ({ info, options }: State) => {
    this.setState({ info, options })
  }

  public componentDidMount() {
    const { channel, api } = this.props

    channel.on(Events.ShowDocs, this.onShowDocs)

    this.stopListen = api.onStory(() => {
      // Clear panel when story changes
      this.setState({
        info: undefined,
        options: undefined
      })
    })
  }

  public render() {
    const { info, options } = this.state
    const { active } = this.props

    if (!active || !info || !options) {
      return null
    }

    return (
      <div>
        <VueWrapper component={Wrapper} info={info} options={options} />
      </div>
    )
  }

  public componentWillUnmount() {
    if (this.stopListen) {
      this.stopListen()
    }

    const { channel } = this.props

    channel.removeListener(Events.ShowDocs, this.onShowDocs)
  }
}

addons.register(AddonName, api => {
  addons.addPanel(PanelName, {
    title: 'Info(Vue)',
    render: ({ active, key }) => (
      <Info key={key} channel={addons.getChannel()} api={api} active={active} />
    )
  })
})
