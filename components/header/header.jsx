import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import styles from './header.module.css'

export default function Header() {
  const router = useRouter()
  return (
    <header>
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
      <li 
        key={name} 
        className={router.pathname === links[name] ? styles.activePage : ''}>
        <Link href={links[name]}>
          {name} 
        </Link>
      </li>
    )    
  })
}
