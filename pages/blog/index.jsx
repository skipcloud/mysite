import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import * as React from 'react'
import Link from 'next/link'
import Layout from '../../components/layout'

const postsPath = path.join(process.cwd(), 'pages/posts')

export default function Blog({ postData }) {
  return (
    <Layout>
      { posts(postData) }
    </Layout>
  )
}

function posts(posts) {
  const links = posts.map(post => {
    return (
      <li key={post.id}>
        <Link href={`/posts/${post.id}`} >{ post.id }</Link>
      </li>
    )
  })

  return (
    <ul>{ links }</ul>
  )
}

function getPostData() {
  const filePaths = fs.readdirSync(postsPath)

  const content = filePaths.map(function(filePath) {
    if (filePath === '') {
      return
    }
    const file = fs.readFileSync(`${postsPath}/${filePath}`, {encoding: 'utf8'})
    const content = matter(file)

    // this is the original buffer, we already get the
    // string from content.content so just delete it to 
    // reduce prop size
    delete content.orig
    const id = filePath.replace(/.md$/, '')

    console.log(content.orig)
    return {
      id
    }
  })

  return content.filter(post => {
    return post !== undefined
  })
}

export async function getStaticProps() {
  const postData = getPostData()

  return {
    props: {
      postData
    }
  }
}
