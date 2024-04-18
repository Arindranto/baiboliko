import Head from 'next/head';
import NavToko from '../components/nav-toko';
import { getBoky } from '../services/bible.services'
import styles from '../styles/Home.module.css';

export default function Home(props) {
  let { boky } = props
  const taloha = boky.filter((b) => b.id_boky <= 39 )
  const vaovao = boky.filter((b) => b.id_boky > 39)
  return (
    <>
      <Head>
        <title>Tenin'Andriamanitra</title>
      </Head>
      <div className="d-flex justify-content-center" style={{ paddingTop: '10vh', paddingBottom: '3vh' }}>
        <div
          className="row w-100 w-lg-75 gx-5 fw-bold"
        >
          <div
            id="taloha"
            className="col"
          >
            <p className="d-none d-lg-block text-primary mb-3 h2">Testamenta Taloha</p>
            <p className="d-block d-lg-none text-primary mb-3">Testamenta Taloha</p>
            <NavToko boky={taloha} title="Testamenta taloha" color="btn-outline-primary"></NavToko>
          </div>
          
          <div id="vaovao" className="col">
            <p className="d-none d-lg-block text-success mb-3 h2">Testamenta Vaovao</p>
            <p className="d-block d-lg-none text-success mb-3">Testamenta Vaovao</p>
            <NavToko boky={vaovao} title="Testamenta taloha" color="btn-outline-success"></NavToko>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const boky = getBoky()
  return {
    props: {
      boky
    }
  }
}
