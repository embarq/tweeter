import { useEffect, useState } from "react"
import Button from './button'

const postsFiltersEntries = {
  'tweets': false,
  'tweets_replies': false,
  'media': false,
  'likes': false,
}

const postsFiltersLabels = {
  'tweets': 'Tweets',
  'tweets_replies': 'Tweets & Replies',
  'media': 'Media',
  'likes': 'Likes',
}

export default function PostsFilters({ onSelect, selectedFilter = 'tweets' }) {
  const [filterEntries, setFilterEntries] = useState(postsFiltersEntries)

  const selectFilter = filterKey => {
    if (filterKey in filterEntries) {
      const nextState = { ...filterEntries }
      for (let key in filterEntries) {
        if (filterEntries.hasOwnProperty(key)) {
          nextState[key] = false
        }
      }
      nextState[filterKey] = true
      setFilterEntries(nextState)
    } else {
      throw new Error(`Unexpected filter change: "${ filterKey }"`)
    }
  }

  const handleFilterEntryClick = (e) => {
    selectFilter(e.currentTarget.id)
    onSelect(e.currentTarget.id)
  }

  useEffect(() => {
    selectFilter(selectedFilter)
  }, [])

  return (
    <ul className="list-none">{
    Object.keys(postsFiltersEntries).map(filterKey => (
      <li key={filterKey}>
        <Button
          id={filterKey}
          onClick={handleFilterEntryClick}
          kind={filterEntries[filterKey] ? 'primary' : 'clear'}
          className="w-full justify-start">
          {postsFiltersLabels[filterKey]}
        </Button>
      </li>
    ))}</ul>
  )
}
