import { initCap } from '../utils/string.utils'

export default function NavToko({ boky, color }) {
     return (
          <div className="row g-3 justify-content-start align-content-start overflow-y-auto px-2" style={{ height: "80vh" }}>
            { boky.map(t => 
               (<div key={t.id_boky} className="col-sm-12 col-md-6 col-lg-4">
                    <button className={`d-none d-lg-block btn ${color} w-100 fw-bold`} style={{height: "50px"}}>{initCap(t.anarana)}</button>
                    <button className={`d-block d-lg-none btn ${color} w-100 fw-bold`} style={{height: "60px"}}>{initCap(t.anarana)}</button>
               </div>))
               }
          </div>
     )
}