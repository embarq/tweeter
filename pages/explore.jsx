import Layout from "../components/layout";
import PostsFilters from "../components/posts-filters";

export default function ExplorePage({ props }) {
  const handleFiltersChange = filterKey => {
    console.log('[handleFiltersChange]', filterKey)
  }
  return (
    <Layout>
      <div className="container mx-auto md:pt-6 md:flex">
        <div className="w-full md:w-2/3 px-4">
          {/* <PostsList posts={posts} author={currentUser} className="mt-6" /> */}
        </div>
        <aside className="hidden md:block w-1/3 px-4">
          <article className="card">
            <PostsFilters selectedFilter="tweets" onSelect={handleFiltersChange} />
          </article>
        </aside>
      </div>
    </Layout>
  )
}
