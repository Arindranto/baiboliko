import { useRef, useState } from "react"
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
          console.log(circles.length, currentActive)
          setCurrentActive((prev) => {
               circles.forEach((circle, idx) => {
                    if (idx + 1 <= step) {
                      circle.classList.add(`${styles.active}`);
                    } else {
                      circle.classList.remove(`${styles.active}`);
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
     return (
          <Modal onClose={ () => {
               selectStep(1)
               console.log('Closing...')     
          } } dialogClass="modal-fullscreen-lg-down modal-lg" centered={false} titleClass={`text-${colorClass}`} id_modal="toko_modal" title={`${boky}${selectedToko > 0? ", " + selectedToko: ""}`} backdrop={false} buttons={[]}>
               <div className="d-flex flex-column align-items-center justify-content-center text-center">
                    <div className={styles["progress-container"]}>
                         <div className={styles.progress} ref={progressRef}></div>
                         <div className={`${styles.circle} ${styles.active}`}>Toko</div>
                         <div className={styles.circle}>Andininy faha</div>
                         <div className={styles.circle}>Ka hatrmin'ny</div>
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