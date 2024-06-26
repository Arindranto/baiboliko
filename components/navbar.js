import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function NavBar() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light fixed-top bg-light w-100">
			<div className="container-fluid mx-lg-5 mx-sm-3 my-sm-0 my-lg-2">
				<a className="navbar-brand fw-bold" href="#">
					Baiboliko
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse"
					id="navbarSupportedContent"
				>
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<a
								className="nav-link active"
								aria-current="page"
								href="#"
							>
								Home
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">
								Link
							</a>
						</li>
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								href="#"
								id="navbarDropdown"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								Dropdown
							</a>
							<ul
								className="dropdown-menu"
								aria-labelledby="navbarDropdown"
							>
								<li>
									<a className="dropdown-item" href="#">
										Action
									</a>
								</li>
								<li>
									<a className="dropdown-item" href="#">
										Another action
									</a>
								</li>
								<li>
									<hr className="dropdown-divider" />
								</li>
								<li>
									<a className="dropdown-item" href="#">
										Something else here
									</a>
								</li>
							</ul>
						</li>
						<li className="nav-item">
							<a
								className="nav-link disabled"
								href="#"
								tabIndex="-1"
								aria-disabled="true"
							>
								Disabled
							</a>
						</li>
					</ul>
					<form className="d-flex">
						<div className="input-group">
							<input
								className="form-control"
								type="search"
								placeholder="Hitady..."
								aria-label="Search"
							/>
							<button
								className="btn btn-outline-success input-group-text"
								type="submit"
							>
								<FontAwesomeIcon icon={faMagnifyingGlass} />
							</button>
						</div>
					</form>
				</div>
			</div>
		</nav>
	)
}
