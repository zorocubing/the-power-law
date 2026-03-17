import { client } from '@/sanity/lib/client'

async function getPosts() {
  return await client.fetch(`*[_type == "post"] | order(publishedAt desc)`)
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">The Power Law</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet. Go write one in /studio!</p>
      ) : (
        <ul>
          {posts.map((post: { _id: string; title: string; excerpt: string }) => (
            <li key={post._id} className="mb-4">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-600">{post.excerpt}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}