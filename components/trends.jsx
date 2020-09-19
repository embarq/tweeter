import classNames from 'classnames'

const topics = [
  { name: 'programming', count: 20 },
  { name: 'lifestyle', count: 10 },
  { name: 'music', count: 30 },
]

export default function Trends({ className }) {
  return (
    <div className={classNames('card', className)}>
      <h2 className="card-header">Trends for you</h2>
      <ul className="list-none">{
      topics.map(topic => (
        <li className="mt-6" key={topic.name}>
          <strong className="block text-gray-800 font-semibold">#{topic.name}</strong>
          <span className="mt-2 text-xs text-gray-500">{topic.count} Tweets</span>
        </li>
      ))}</ul>
    </div>
  )
}
