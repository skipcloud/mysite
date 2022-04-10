import fs from 'fs'
import path from 'path'
import * as React from 'react'
import Link from 'next/link'
import Layout from '../../components/layout'

const postsPath = path.join(process.cwd(), 'posts_markdown')

export default function Blog({ postData }) {
  return (
    <Layout metadata={{
        title: "Blog",
        description: "The index page for Skip Gibson's blog"
      }}>
      { posts(postData) }
    </Layout>
  )
}

export async function getStaticProps() {
  const filePaths = fs.readdirSync(postsPath)

  return {
    props: {
      postData: filePaths.map(function(filePath) {
        return filePath.replace(/.md$/, '')
      })
    }
  }
}

function posts(posts) {
  const links = posts.map(id => {
    return (
      <li key={id}>
        <Link href={`/blog/${id}`} >{ id }</Link>
      </li>
    )
  })

  return (
    <ul>{ links }</ul>
  )
}

