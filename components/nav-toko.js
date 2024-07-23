import { initCap } from '../utils/string.utils'

export default function NavToko({ boky, color, showModal }) {
     return (
          <div className="row g-3 justify-content-start align-content-start overflow-y-auto px-2" style={{ height: '75vh' }}>
            { boky.map(t => 
               (<div key={t.id_boky} className="col-sm-12 col-md-6 col-xl-4">
                    <button onClick={() => showModal(t.id_boky)} className={`d-none d-xl-block btn ${color} w-100 fw-bold`} style={{fontSize: "1.1rem",height: "60px"}}>{initCap(t.anarana)}</button>
                    <button onClick={() => showModal(t.id_boky)} className={`d-block d-xl-none btn ${color} w-100 fw-bold`} style={{height: "60px"}}>{initCap(t.anarana)}</button>
               </div>))
               }
          </div>
     )
}