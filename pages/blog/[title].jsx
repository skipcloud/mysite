import Layout from '../../components/layout'
import matter from 'gray-matter'
import path from 'path'
import fs from 'fs'

const markdownPath = path.join(process.cwd(), 'posts_markdown')

export default function Post({ post }) {
  return (
    <Layout metadata={{
        title: post.data.title,
        description: `A blog post titled "${post.data.title}"`
      }}>
      { post.content }
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const file = fs.readFileSync(`${markdownPath}/${params.title}.md`, 'utf8')
  const parsedFile = matter(file)
  return {
    props: {
      post: {
        content: parsedFile.content,
        data: parsedFile.data
      }
    }
  }
}

export async function getStaticPaths() {
  const posts = fs.readdirSync(markdownPath)
  const paths = posts.map(post => {
    return {
      params: {
        title: post.replace(/.md$/, '')
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}
