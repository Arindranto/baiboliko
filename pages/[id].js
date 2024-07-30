import { useRouter } from "next/router"
import DbConnection from "../db/utils/DbConnection"
import Head from "next/head"

export default function Boky({ soratra, colorClass, body }) {
     const text = soratra.map((s) => <span key={s.andininy}>
          <span className="fw-bold">{' '}{s.andininy}.{' '}</span>
          <span className="me-2">{s.soratra}</span>
     </span>)
     const getTitle = (body) => {
          if (body) {
               return `${body.boky}${body.toko > 0? " " + body.toko: ""}${body.start > 0? ", " + body.start: ""}${body.end > 0? " - " + body.end:""}`
          }
          return ''
     }
     return (
          <>
               <Head>
                    <title>Baiboliko - {getTitle(body)}</title>     
               </Head>     
               <div className="d-flex flex-column align-items-center justify-content-start pb-5 overflow-auto h-100">
                    <h1 className={`d-none d-lg-block mt-3 fs-2 fw-bold text-center py-2 px-5 rounded-5 border border-5 border-${colorClass} text-${colorClass}`}>{getTitle(body)}</h1>
                    <h1 className={`d-block d-lg-none mt-3 fs-4 fw-bold text-center py-1 px-4 rounded-5 border border-3 border-${colorClass} text-${colorClass}`}>{getTitle(body)}</h1>
                    <div className="d-none d-lg-block container-fluid px-5 py-3 text-justify" style={{ "textAlign": "justify" }}>
                         {text}
                    </div>
                    <div className="d-block d-lg-none container-fluid px-5 py-3 text-justify" style={{ "textAlign": "start" }}>
                         {text}
                    </div>
               </div>
          </>
     )
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
     const query = `
          select tsa.andininy, group_concat(
               concat(
                    tsa.soratra,
                    case when f.soratra is not null and (f.marika is null or f.marika != 'soramandry') then ' * ' || f.soratra end
               )
          ) as soratra
          /*group_concat(
               concat(case when filaharana = 1 then andininy || '- ' end,	-- andininy
               case when f.marika = 'soramandry' then '[' || f.soratra || '] ' end,	-- soramandry
               tsa.soratra,	-- soratra
               case when f.soratra is not null and (f.marika is null or f.marika != 'soramandry') then ' * ' || f.soratra end)) -- marika*/
          from toko_sy_andininy tsa
          left join fanampiny f on f.toko_sy_andininy = tsa.id_toko_sy_andininy
               where boky = ? and toko = ? and andininy between ? and ?
          group by andininy  order by andininy, filaharana
     `
     // const query = "SELECT andininy, soratra FROM toko_sy_andininy WHERE boky = ? AND toko = ? AND andininy BETWEEN ? AND ? ORDER BY andininy ASC"
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