export default function Footer() {
	const year = new Date().getFullYear()
	return (
		<>
			<footer className="footer fixed-bottom w-100 py-1 py-lg-2 bg-light">
				<div className="container">
					<span className="text-muted">
						Baiboliko by <a target="_blank" href="https://safidy.onrender.com">Safidy Andriantsoa</a> - Copyright &copy; {year}
					</span>
				</div>
			</footer>
		</>
	)
}
