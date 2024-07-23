import NavToko from './nav-toko'

export default function Boky({ taloha, vaovao, onSelect }) {
	return (
		<div className="row w-100 gx-5 fw-bold">
			<div id="taloha" className="col">
				<p className="d-none d-lg-block text-primary mb-3 h2">
					Testamenta Taloha
				</p>
				<p className="d-block d-lg-none text-primary mb-4 h4 text-center">
					Testamenta Taloha
				</p>
				<NavToko
					showModal={onSelect}
					boky={taloha}
					title="Testamenta taloha"
					color="btn-outline-primary"></NavToko>
			</div>

			<div id="vaovao" className="col">
				<p className="d-none d-lg-block text-success mb-3 h2">
					Testamenta Vaovao
				</p>
				<p className="d-block d-lg-none text-success mb-4 h4 text-center">
					Testamenta Vaovao
				</p>
				<NavToko
					showModal={onSelect}
					boky={vaovao}
					title="Testamenta taloha"
					color="btn-outline-success"></NavToko>
			</div>
		</div>
	)
}
