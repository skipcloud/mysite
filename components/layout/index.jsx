import PropTypes from 'prop-types'
import Head from 'next/head'
import Header from '../../components/header'
import styles from './layout.module.css'


export default function Layout(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{props.page_title}</title>
        <meta name="description" content="Personal website of Skip Gibson, self taught software engineer" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header />
      { props.children }
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}
