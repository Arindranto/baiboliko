export default function Modal({
	id_modal,
	title,
	backdrop = false,
     dialogClass = "",
     titleClass = "",
	children,
	buttons = [],
     centered = true,
	footer = null,
	onClose = () => {}
}) {
	return (
		<div
			className="modal fade"
			id={id_modal}
			data-bs-backdrop={backdrop? "static": "non-static"}
			data-bs-keyboard={backdrop? "false": "true"}
			tabIndex="-1"
			aria-labelledby={`${id_modal}_label`}
			aria-hidden="true"
		>
			<div className={`modal-dialog modal-dialog-scrollable ${centered? "modal-dialog-centered": ""} ${dialogClass}`}>
				<div className="modal-content">
					<div className="modal-header">
                              <div className="d-flex w-100 justify-content-center">
                                   <h5 className={`modal-title fs-4 fw-bold ${titleClass}`} id={`${id_modal}_label`}>
                                        {title.toUpperCase()}
                                   </h5>
                              </div>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
							onClick={onClose}
						></button>
					</div>
					<div className="modal-body">{children}</div>
					{buttons.length > 0 && (
						<div className="modal-footer">
							{buttons.map(btn => (
								<button
									type="button"
									className={`btn ${btn.className}`}
									data-bs-dismiss="modal"
								>
									{btn.libelle}
								</button>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
