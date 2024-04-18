import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap
// Font awesome
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import Head from 'next/head'
import Layout from '../components/layout'
import { useEffect } from 'react'

export default function MyApp({ Component, pageProps }) {
	useEffect(() => {
		document.body.classList.add('h-100')
          require('bootstrap/dist/js/bootstrap.bundle.min.js')
	}, [])
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	)
}
