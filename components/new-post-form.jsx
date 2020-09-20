import { useRef, useState } from 'react'
import classNames from 'classnames'
import fire from '../core/firebase'
import Button from './button'
import PostReplyOptionInput from './post-reply-option-input'
import { useCurrentUserId } from '../core/hooks'
import { image, IconTrash } from '../util/icons'
import { cloudinaryUpload } from '../core/media'

export default function NewPostForm({ className }) {
  const fileInputRef = useRef()
  const [ postContent, setPostContent ] = useState('')
  const [ state, setState ] = useState({
    loading: false,
    success: false,
    error: null
  })
  const [attachments, setAttachments] = useState([])
  const uid = useCurrentUserId()
  const handleContentChange = ({ target }) => setPostContent(target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    event.persist()
    setState({ ...state, loading: true, error: null })
    const payload = {
      author: uid,
      limit: 'everyone',
      content: postContent,
      created_at: Date.now(),
    }

    Promise
      .all(
        attachments.map(({ file }) => cloudinaryUpload(file))
      )
      .then(responses => {
        payload.attachments = responses.map(res => res.public_id)
        return fire.firestore().collection('posts').add(payload)
      })
      .then(() => {
        setAttachments([])
        setPostContent('')
        event.target.reset()
        setState({ ...state, loading: false })
      })
      .catch(err => {
        setState({ ...state, loading: false, error: err.message })
      })
  }

  const handleFileInputChange = () => {
    if (fileInputRef.current.files.length > 0) {
      let files = Array.from(fileInputRef.current.files).map(file => {
        const localUrl = URL.createObjectURL(file)
        return {
          localUrl,
          file
        }
      })
      setAttachments(files)
    }
  }

  const handleAttachmentBtnClick = (event) => {
    event.stopPropagation()
    fileInputRef.current.click()
  }

  const handleRemoveAttachment = (localUrl) => {
    setAttachments(
      attachments.filter(entry => entry.localUrl !== localUrl)
    )
  }

  return (
    <div className={classNames('card', className)}>
      <form onSubmit={handleSubmit}>
        <div className="card-header">Tweet something</div>
        <textarea
          type="text"
          className="textarea focus:outline-none focus:bg-white focus:border-indigo-400 mt-2"
          style={{maxHeight: '120px'}}
          placeholder="What's happening?"
          rows="2"
          required
          minLength={1}
          maxLength={200}
          onChange={handleContentChange} />
        <div className="text-right text-gray-500 text-xs">{postContent.length}/200</div>
        <footer className="mt-2 flex justify-between">
          <input
            type="file" accept="image/*" multiple className="hidden"
            ref={fileInputRef} onChange={handleFileInputChange} />
          <Button
            onClick={handleAttachmentBtnClick}
            type="button" kind="clear" className="text-purple-600">
            {image}
          </Button>
          <Button type="submit" loading={state.loading}>Tweet</Button>
        </footer>
        {attachments && (
          <ul className="list-none flex mt-4">{
          attachments.map(({ localUrl }) => (
            <li key={localUrl} className="mr-3 relative pt-2 pr-1">
              <img src={localUrl} alt="Preview" className="w-16 h-16 rounded-lg shadow-sm" />
              <Button
                onClick={() => handleRemoveAttachment(localUrl)}
                className="px-1 py-1 absolute top-0 right-0 h-4" title="Remove" type="button">
                <IconTrash width="14" height="14" />
              </Button>
            </li>
          ))
          }</ul>
        )}
      </form>
    </div>
  )
}
