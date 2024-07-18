import { useEffect, useRef, useState } from "react"
import Modal from "./modal"
import styles from './toko-modal.module.css'

export default function TokoModal({ boky, colorClass, nbrToko, selectedToko, onTokoSelected }) {
     const [currentActive, setCurrentActive] = useState(1)
     const progressRef = useRef()
     const handleSelectedToko = (toko) => {
          onTokoSelected(toko)
          selectStep(currentActive + 1)
     }
     const selectStep = (step) => {
          const circles = document.querySelectorAll(`.${styles.circle}`)
          setCurrentActive((prev) => {
               console.log(colorClass)
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
               return step
          })
     }

     useEffect(() => {
          console.log('boky changed')
          selectStep(1)
     }, [boky, colorClass])
     return (
          <Modal dialogClass="modal-fullscreen-lg-down modal-lg" centered={false} titleClass={`text-${colorClass}`} id_modal="toko_modal" title={`${boky}${selectedToko > 0? ", " + selectedToko: ""}`} backdrop={false} buttons={[]}>
               <div className="pb-4 px-2 px-lg-5">
                    <div className={`d-flex ${styles["progress-container"]} position-relative justify-content-between w-100`}>
                         <div className={`${styles.progress} bg-${colorClass}`} ref={progressRef}></div>
                         <div className={`${styles.circle} fw-bold`}>Toko</div>
                         <div className={`${styles.circle} fw-bold`}>Andininy faha</div>
                         <div className={`${styles.circle} fw-bold`}>Ka hatramin'ny</div>
                    </div>
               </div>
               <div className="row gy-3">
                    { Array.from({length: nbrToko}).map((_, idx) => (
                         <div key={idx} className="col-2 col-lg-2 d-flex justify-content-center">
                              <button className={`d-none d-lg-block btn px-3 fs-4 fw-bold btn-outline-${colorClass}`} style={{ width: '90px' }} onClick={() => { handleSelectedToko(idx + 1) }}>{idx + 1}</button>
                              <button className={`d-block d-lg-none btn px-3 fw-bold btn-outline-${colorClass}`} style={{ minWidth: '70px' }} onClick={() => { handleSelectedToko(idx + 1) }}>{idx + 1}</button>
                         </div>
                    )) }
               </div>
          </Modal>
     )
}