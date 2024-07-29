import { FC, useCallback, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { API_BASE_PATH } from "../utils/constants";
import Layout from "../components/Layout";


const Home: FC = () => {
  const fetchSongs = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_PATH}/songs`)
      const data = response.json()
      console.log(data)
    } catch (err) {
      console.log(`An error occurred when when fetching data: ${err} `)
    }
  }, []);
  useEffect(() => {
    fetchSongs()
  }, []);

  return (
    <Layout>
      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.searchSection}>
            <div className="">
              <div>
                <h2>Your Library</h2>
                <button>favorites</button>
              </div>
              <span>You have 10 songs in your library</span>
            </div>
            <div>
              <div>
                <span>
                  Sort from A-Z
                </span>
                <input type="checkbox" />
              </div>
              <div>
                <input type="text" />
              </div>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  )
};

export default Home;
