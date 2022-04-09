import PropTypes from 'prop-types'
import Head from 'next/head'
import Header from '../../components/header'
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
        <meta charset="utf-8" />
      </Head>

      <Header />
      { props.children }
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}
