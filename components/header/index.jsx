import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { nanoid } from 'nanoid'

import styles from './header.module.css'

export default function Header() {
  const router = useRouter()
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <ul>
          {linkItems(router)}
        </ul>
      </nav>
    </header>
  )
} 

function linkItems(router) {
  const links = {
    'home': '/',
    'blog': '/blog',
    'music': 'https://skipcloud.bandcamp.com'
  }

  return Object.keys(links).map(name => {
    return (
      <li key={nanoid()} >
        <Link href={links[name]}>
          <a className={router.pathname === links[name] ? styles.activePage : ''}>{name}</a> 
        </Link>
      </li>
    )    
  })
}
