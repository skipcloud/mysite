import Layout from '../components/layout'
import styles from './index.module.css'

export default function Home() {
  return (
    <Layout>
      <main className={styles.main}>
        <img 
          src="https://www.vets4pets.com/siteassets/species/cat/close-up-of-cat.jpg?w=585&scale=down" 
          alt="A picture of Skip"
        />
        <section>
          <h2>about</h2>
          hi there, im skip { String.fromCodePoint(0x1F44B)  }
          <br />
          im a self taught software engineer
          <br />
          currently living in London
          <br />
          i built this website myself (excuse the mess)
          <br />
          i own way too many plants
          <br />
          dogs are pretty much the best thing since sliced bread
        </section>
      </main>
    </Layout>
  )
}
