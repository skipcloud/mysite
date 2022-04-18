import PropTypes from 'prop-types'
import Head from 'next/head'
import Aside from '../../components/aside'
import Main from '../../components/main'
import styles from './layout.module.css'


export default function Layout(props) {
  const { metadata } = props
  return (
    <div className={styles.container}>
      <Head>
        <title>{metadata.title}</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="author" content="Skip Gibson" />
        <meta name="description" content={metadata.description} />
        <meta charSet="utf-8" />
      </Head>

      <Aside />
      <Main>
        { props.children }
      </Main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}
