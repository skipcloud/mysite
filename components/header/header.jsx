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
  const links = ['home', 'blog', 'music'];

  return links.map(value => {
    let path = `/${value}`;
    if (value === 'home') {
      path = '/'
    }

    console.log(`/${path}`)
    return (
      <li 
        key={value} 
        className={router.pathname === path ? styles.activePage : ''}>
        <Link href={path}>
          {value} 
        </Link>
      </li>
    )    
  })
}
