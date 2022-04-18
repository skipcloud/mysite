
export default Post({ post }) {
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
