import { Component } from 'react'
import { createPortal } from 'react-dom'
import { globalPortalHost } from '../constants/ui'

export default class Portal extends Component {
  /** @type {HTMLElement} */
  host = null
  state = {
    mounted: false
  }

  componentDidMount() {
    this.host = document.createElement('div')
    this.host.id = this.props.id

    const globalPortal = document.getElementById(globalPortalHost)

    if (globalPortal) {
      globalPortal.appendChild(this.host)
      this.setState({ mounted: true })
    }
  }

  componentWillUnmount() {
    const globalPortal = document.getElementById(globalPortalHost)
    globalPortal?.removeChild(this.host)
  }

  render() {
    if (!this.state.mounted) {
      return null
    }

    return createPortal(
      this.props.children,
      this.host
    )
  }
}
