import matter from 'gray-matter'
import path from 'path'
import fs from 'fs'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import Layout from '../../components/layout'

import styles from './[title].module.css'

const markdownPath = path.join(process.cwd(), 'posts_markdown')

export default function Post({ post }) {
  return (
    <Layout metadata={{
        title: post.data.title,
        description: `A blog post titled "${post.data.title}"`
      }}>
      <header className={styles.header}>
        <h1>{post.data.title}</h1>
      </header>
      <div dangerouslySetInnerHTML={{__html: post.content}}></div>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const file = fs.readFileSync(`${markdownPath}/${params.title}.md`, 'utf8')
  const parsedFile = matter(file)
  const content = await markdownToHtml(parsedFile.content)
  return {
    props: {
      post: {
        data: parsedFile.data,
        content
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

function markdownToHtml(markdown) {
  const content = unified()
    // parse to AST
    .use(remarkParse)
    // convert to HTML (and keep HTML found in AST)
    .use(remarkRehype, {allowDangerousHtml: true})
    // reparse but include HTML in the markdown in the AST
    .use(rehypeRaw)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown)
    .then(file => String(file))
  return content
}
