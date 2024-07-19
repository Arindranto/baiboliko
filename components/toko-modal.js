import { useEffect, useRef, useState } from "react"
import Modal from "./modal"
import styles from './toko-modal.module.css'
import { post } from "../services/fetch.service"

const steps = {
     1: "get_toko",
     2: "get_verse",
     3: "get_verse"
}

export default function TokoModal({ idBoky, boky, colorClass, handleHamaky }) {
     const [currentActive, setCurrentActive] = useState(1)
     const [numbers, setNumbers] = useState([])
     const [body, setBody] = useState({
          title: "",
          id_boky: idBoky,
          boky,
          toko: 0,
          start: 0,
          end: 0
     })
     const progressRef = useRef()
     const handleSelection = (n) => {
          selectStep(currentActive + 1, n)
     }
     const selectStep = (step, n) => {
          const circles = document.querySelectorAll(`.${styles.circle}`)
          setBody(prevBody => {
               if (!idBoky || idBoky <= 0) {
                    return prevBody
               }
               let newBody = {
                    ... prevBody,
                    id_boky: idBoky,
                    boky
               }
               switch (step) {
                    case 1:
                         newBody.toko = 0;
                         newBody.start = 0;
                         newBody.end = 0;
                    case 2:
                         newBody.toko = n;
                         newBody.start = 0;
                         newBody.end = 0;
                         break;
                    case 3:
                         newBody.start = n;
                         newBody.end = 0;
                         break;
                    case 4:
                         newBody.end = n;
                         break;
                    default:
                         newBody.start = 0;
                         newBody.end = 0;
                         break;
               }
               newBody.title = getTitle(newBody)
               setCurrentActive((prev) => {
                    circles.forEach((circle, idx) => {
                         circle.classList.remove("border-primary")
                         circle.classList.remove("border-success")
                         circle.classList.remove("text-primary")
                         circle.classList.remove("text-success")
                         if (idx + 1 <= step) {
                           //circle.classList.add(`${styles.active}`)
                           circle.classList.add(`border-${colorClass}`)
                           circle.classList.add(`text-${colorClass}`)
                         } else {
                           //circle.classList.remove(`${styles.active}`)
                           circle.classList.remove(`border-${colorClass}`)
                           circle.classList.remove(`text-${colorClass}`)
                         }
                       });
                    
                    if (step <= circles.length){
                         progressRef.current.style.width = ((step - 1) / (circles.length - 1)) * 100 + "%";   
                    }
     
                    if (step > circles.length) {
                         return circles.length
                    }
                    // if (Object.keys(steps).includes(step)) {
                    (async function fetchData() {
                         const data = await post(`/api/${steps[step]}`, newBody);
                         console.log(steps[step], data, newBody)
                         if (JSON.stringify(numbers) !== JSON.stringify(data)) {
                              setNumbers(data)
                         }
     
                    })()
                    // }
     
                    return step
               })
               return newBody
          })
     }
     
     const getTitle = (body) => {
          if (body) {
               return `${boky}${body.toko > 0? " " + body.toko: ""}${body.start > 0? ", " + body.start: ""}${body.end > 0? " - " + body.end:""}`
          }
          return ''
     }

     useEffect(() => {
          if (idBoky && idBoky > 0) {
               selectStep(1)
          }
     }, [idBoky, colorClass])
     return (
          <Modal dialogClass="modal-fullscreen-lg-down modal-lg" centered={false} titleClass={`text-${colorClass}`} id_modal="toko_modal" title={body.title} backdrop={false} buttons={[{
               libelle: "Hamaky",
               onClick: () => { handleHamaky(body) },
               className: `btn-${colorClass}`
          }]}>
               <div className="pb-4 px-2 px-lg-5">
                    <div className={`d-flex ${styles["progress-container"]} position-relative justify-content-between w-100`}>
                         <div className={`${styles.progress} bg-${colorClass}`}  ref={progressRef}></div>
                         <button className={`${styles.circle} fw-bold`} onClick={() => selectStep(1, body.id_boky)} >Toko</button>
                         <button className={`${styles.circle} fw-bold`} onClick={() => currentActive > 2 && selectStep(2, body.toko)} >Andininy faha</button>
                         <button className={`${styles.circle} fw-bold`} onClick={() => currentActive > 3 && selectStep(3, body.start)} >Ka hatramin'ny</button>
                    </div>
               </div>
               <div className="row gy-3">
                    { numbers.map((n) => (
                         <div key={n} className="col-2 col-lg-2 d-flex justify-content-center">
                              <button className={`d-none d-lg-block btn px-3 fs-4 fw-bold btn-outline-${colorClass}`} style={{ width: '90px' }} onClick={() => { handleSelection(n) }}>{n}</button>
                              <button className={`d-block d-lg-none btn px-3 fw-bold btn-outline-${colorClass}`} style={{ minWidth: '70px' }} onClick={() => { handleSelection(n) }}>{n}</button>
                         </div>
                    )) }
               </div>
          </Modal>
     )
}