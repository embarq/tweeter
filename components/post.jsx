import classNames from 'classnames'
import { usePostDetails } from '../core/hooks'
import Button from './button'
import * as icons from '../util/icons'

export default function Post({ className, data }) {
  const { author, attachments } = usePostDetails(data)
  const createdAt = new Date(data.created_at).toLocaleString()

  const avatar = author && author.avatar
    ? <img src={author.avatar} alt="Avatar" className="w-10 h-10 rounded-lg" />
    : <div className="w-10 h-10 rounded-lg text-gray-400">{icons.smile}</div>

  return (
    <article className={classNames('card', className)}>
      <header className="mb-5 flex items-center">
        <a className="mr-4">{avatar}</a>
        <p>
          <a className="block">
            <span className="inline-block mr-1">{author && author.fullname}</span>
            <span className="text-gray-500 text-sm">@{author && author.username}</span>
          </a>
          <a className="text-gray-500 text-xs">{createdAt}</a>
        </p>
      </header>
      <main className="pb-2">
        {data.content}
        <div className="mt-2">
        {Array.isArray(attachments) && <ul className="list-none flex justify-center rounded-md">{
          attachments.map(({ link, id }) =>
            <li key={id}>
              <img src={link} alt="Attachment" style={{maxHeight: '200px'}}
                className="" />
            </li>
          )
        }</ul>}
        </div>
        <div className="text-right mt-2 text-xs text-gray-500">
          <span className="mr-3">0 Comments</span><span className="mr-3">0 Retweets</span><span>0 Saved</span>
        </div>
      </main>
      <footer className="">
        <div className="flex py-1 border-t border-b border-gray-200">
          <Button kind="clear" className="flex items-center justify-center w-1/4">
            {icons.comment}<span className="inline-block ml-3">Comment</span>
          </Button>
          <Button kind="clear" className="flex items-center justify-center w-1/4">
            {icons.repost}<span className="inline-block ml-3">Retweet</span>
          </Button>
          <Button kind="clear" className="flex items-center justify-center w-1/4">
            {icons.heart}<span className="inline-block ml-3">Like</span>
          </Button>
          <Button kind="clear" className="flex items-center justify-center w-1/4">
            {icons.save}<span className="inline-block ml-3">Save</span>
          </Button>
        </div>
      </footer>
    </article>
  )
}
