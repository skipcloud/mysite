import Image from "next/image";
import Layout from '../components/layout'
import styles from './index.module.css'
import me from '../public/skip-elevator.jpg'

export default function Home() {
  return (
    <Layout metadata={{
        title: "Skip Gibson",
        description: "The homepage for Skip Gibson's personal website"
      }}>
      <main className={styles.main}>
        <Image 
          styles={styles.img}
          src={me}
          alt="A picture of Skip"
        />
        <section>
          <h2>about</h2>
          hi there, im skip {'\u{1F44B}'}
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
