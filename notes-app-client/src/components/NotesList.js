import React from 'react'

export const NotesList = ({ notes: notes }) => {
	if (!notes.length) {
		return <p className="center">Ссылок пока нет</p>
	}

	return (
		<div className="row">
			{notes.map((note, index) => {
				return (
					<div className="col s6 card grey lighten-5">
						<div className="card-content">
							<span className="card-title">{note.text}</span>
						</div>
						<div class="card-action">
							<p>Дата создания: <strong>{new Date(note.date).toLocaleDateString()}</strong></p>
						</div>

						
					</div>
				)
			})}
		</div>
	)
}
