import Layout from '../../components/layout'
import matter from 'gray-matter'
import path from 'path'
import fs from 'fs'

const markdownPath = path.join(process.cwd(), 'posts_markdown')

export default function Post({ post }) {
  return (
    <Layout>{ post }</Layout>
  )
}

export async function getStaticProps({ params }) {
  const file = fs.readFileSync(`${markdownPath}/${params.title}.md`, 'utf8')
  const { content } = matter(file)
  return {
    props: {
      post: content
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
