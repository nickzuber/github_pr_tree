import React from 'react'
import fileIcons from 'file-icons-js'
import DiffStats from '../diffStats'
import { StorageSync } from '../../lib'

class File extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  async componentDidMount () {
    const options = await StorageSync.get()

    if (this.unmounted) {
      return
    }

    this.setState({ options })
  }

  componentWillUnmount () {
    this.unmounted = true
  }

  getHighlight ({ name, filter, index }) {
    const prefix = name.substring(0, index)
    const middle = name.substring(index, index + filter.length)
    const suffix = name.substring(index + filter.length)
    return (
      <>
        {prefix}
        {middle ? <span className='github-pr-file-highlight-filter'>{middle}</span> : null}
        {suffix}
      </>
    )
  }

  render () {
    const { name, href, hasComments, isDeleted, isVisible, diffStats, filter } = this.props
    const { options = {} } = this.state
    const className = fileIcons.getClassWithColor(name)
    const topClassName = [
      'github-pr-file',
      isVisible && 'github-pr-file-highlight',
      isDeleted && 'github-pr-file-deleted'
    ].filter(Boolean).join(' ')

    const index = filter ? (name.toLowerCase() || '').indexOf(filter.toLowerCase()) : -1
    const highlightedName = (index === -1) ? name : this.getHighlight({ name, filter, index })

    console.warn(name, options);

    return (
      <div className={topClassName}>
        <span className="icon">
          <svg aria-label="file" class="octicon octicon-file" viewBox="0 0 12 16" version="1.1" width="12" height="16" role="img"><path fill-rule="evenodd" d="M6 5H2V4h4v1zM2 8h7V7H2v1zm0 2h7V9H2v1zm0 2h7v-1H2v1zm10-7.5V14c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V2c0-.55.45-1 1-1h7.5L12 4.5zM11 5L8 2H1v12h10V5z"></path></svg>
        </span>
        <a href={href} className='link-gray-dark'>{highlightedName}</a>
        {options.diffStats && diffStats && <DiffStats diffStats={diffStats} />}
        {hasComments ? (
          <svg className='github-pr-file-comment octicon octicon-comment text-gray' viewBox='0 0 16 16' width='16' height='16' aria-hidden='true'>
            <path fillRule='evenodd' d='M14 1H2c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h2v3.5L7.5 11H14c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 9H7l-2 2v-2H2V2h12v8z' />
          </svg>
        ) : null}
      </div>
    )
  }
}

export default File
