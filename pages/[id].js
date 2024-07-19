import { useRouter } from "next/router"
import DbConnection from "../db/utils/DbConnection"

export default function Boky({ soratra, colorClass, body }) {
     const text = soratra.map((s) => <span key={s.andininy}>
          <span className="fw-bold">{' '}{s.andininy}.{' '}</span>
          <span>{s.soratra}</span>
     </span>)
     console.log(body)
     const getTitle = (body) => {
          if (body) {
               return `${body.boky}${body.toko > 0? " " + body.toko: ""}${body.start > 0? ", " + body.start: ""}${body.end > 0? " - " + body.end:""}`
          }
          return ''
     }
     return (<div className="d-flex flex-column align-items-center justify-content-center">
          <h1 className={`mt-3 fs-2 fw-bold text-center py-2 px-5 rounded-5 border border-5 border-${colorClass} text-${colorClass}`}>{getTitle(body)}</h1>
          <div className="container-fluid px-5 py-3 text-justify" style={{ "text-align": "justify !important" }}>
               {text}
          </div>
     </div>)
}

/*export async function getStaticPaths() {
     const paths = Array.from({ length: 69 }, (v, k) => k + 1).map((id) => ({
          params: {
               id: `${id}`
          }
     }))
     const fallback = false // 404 if not found
     return {
          paths,
          fallback
     }
}*/

export async function getServerSideProps(context) {
     const con = new DbConnection()
     const { id } = context.params
     let { boky, toko, start, end } = context.query
     toko = toko == 0? 1: toko;
     start = start == 0? 1: start;
     end = end == 0? 999: end;
     const query = "SELECT andininy, soratra FROM toko_sy_andininy WHERE boky = ? AND toko = ? AND andininy BETWEEN ? AND ? ORDER BY andininy ASC"
     const soratra = con.all(query, id, toko, start, end)
     const colorClass = +id <= 39? 'primary': 'success'
     end = Math.max(...soratra.map(s => s.andininy))
     return {
          props: {
               body: {
                    ...context.query,
                    toko,
                    start,
                    end
               },
               soratra,
               colorClass
          }
     }
}