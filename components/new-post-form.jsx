import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import classNames from 'classnames'
import fire from '../core/firebase'
import { currentUser } from '../constants/state'
import Button from './button'
import PostReplyOptionInput from './post-reply-option-input'
import { image } from '../util/icons'

export default function NewPostForm({ className }) {
  const [ postContent, setPostContent ] = useState('')
  const [ state, setState ] = useState({
    loading: false,
    success: false,
    error: null
  })
  const uid = useRecoilValue(currentUser)
  const handleContentChange = ({ target }) => setPostContent(target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    setState({ ...state, loading: true, error: null })
    const payload = {
      author: uid,
      limit: 'everyone',
      content: postContent,
      created_at: Date.now(),
    }

    fire.firestore().collection('posts').add(payload)
      .then(() => {
        setState({ ...state, loading: false })
      })
      .catch(err => {
        setState({ ...state, loading: false, error: err.message })
      })
  }

  return (
    <div className={classNames('card', className)}>
      <form onSubmit={handleSubmit}>
        <div className="card-header">Tweet something</div>
        <textarea type="text" className="textarea focus:outline-none focus:bg-white focus:border-indigo-400 mt-2" placeholder="What's happening?" rows="2" required maxLength={200} onChange={handleContentChange} />
        <div className="text-right text-gray-500 text-xs">{postContent.length}/200</div>
        <footer className="mt-2 flex justify-between">
          <Button type="button" kind="clear" className="text-purple-600">{image}</Button>
          <Button type="submit" loading={state.loading}>Tweet</Button>
        </footer>
      </form>
    </div>
  )
}
