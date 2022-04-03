import styles from './header.module.css'

export default function Header() {
  return (
    <header>
      <nav className={styles.navbar}>
        <ul>
          <li>home</li>
          <li>blog</li>
          <li>music</li>
        </ul>
      </nav>
    </header>
  )
}
