import Head from 'next/head'
import NavToko from '../components/nav-toko'
import { getBoky } from '../services/bible.services'
import styles from '../styles/Home.module.css'
import { post } from '../services/fetch.service'
import { useRef, useState } from 'react'
import Modal from '../components/modal'
import { COMPILER_NAMES } from 'next/dist/shared/lib/constants'
import { initCap } from '../utils/string.utils'
import TokoModal from '../components/toko-modal'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Boky from '../components/boky'

export default function Home(props) {
	let { boky } = props
	const [book, setBook] = useState(0)	// Id book
	const [nbrToko, setNbrToko] = useState(0)	// Number of verses
	const [selectedToko, setSelectedToko] = useState(0) 	// Toko selected
	const openModalBtn = useRef()
	const taloha = boky.filter(b => b.id_boky <= 39)
	const vaovao = boky.filter(b => b.id_boky > 39)
	const router = useRouter()

	const resetBook = () => {
		setBook(0)
	}

	const getBookName = (id = null) => {
		if (!id) {
			id = book
		}
		if (id) {
			if (id <= 39) {
				// Taloha
				return initCap(taloha.find(b => b.id_boky == book).anarana)
			}
			else if (id <= 66) {
				return initCap(vaovao.find(b => b.id_boky == book).anarana)
			}
		}
		return '[NO_BOOK_SELECTED]'
	}

	const getColorClass = () => {
		return book > 39? "success": "primary"
	}

	const showModal = async id => {
		setBook(id)
		openModalBtn.current.click()
	}

	const selectBook = (num) => {
		setModalTitle(prev => `${prev}, ${num}`)
	}

	return (
		<>
			<Head>
				<title>Baiboliko - Ny Tenin'Andriamanitra</title>
			</Head>
			<div
				className="d-flex align-items-start align-items-lg-center justify-content-center mt-lg-4"
			>
				<Boky taloha={taloha} vaovao={vaovao} onSelect={showModal}></Boky>
				<button ref={openModalBtn} type="button" className="visually-hidden" data-bs-toggle="modal" data-bs-target="#toko_modal">
					{/* To open the modal */}
				</button>
			</div>
			<TokoModal handleHamaky={(baiboly) => {
				router.push({
					pathname: `/${book}`,
					query: {
						toko: baiboly.toko,
						start: baiboly.start,
						end: baiboly.end,
						boky: baiboly.boky
					}
				})
			} } colorClass={getColorClass()} idBoky={book} boky={getBookName()}></TokoModal>
		</>
	)
}

export async function getStaticProps() {
	const boky = getBoky()
	return {
		props: {
			boky,
		},
	}
}
