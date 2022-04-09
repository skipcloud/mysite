import fs from 'fs'
import path from 'path'
import * as React from 'react'
import Link from 'next/link'
import Layout from '../../components/layout'

const postsPath = path.join(process.cwd(), 'posts_markdown')

export default function Blog({ postData }) {
  return (
    <Layout page_title="Blog">
      { posts(postData) }
    </Layout>
  )
}

function posts(posts) {
  const links = posts.map(id => {
    return (
      <li key={id}>
        <Link href={`/posts/${id}`} >{ id }</Link>
      </li>
    )
  })

  return (
    <ul>{ links }</ul>
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
