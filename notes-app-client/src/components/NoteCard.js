import React from 'react'

export const NoteCard = ({ note }) => {
  return (
    <>
      <p>{note.text}</p>
      
      <p>Дата создания: <strong>{new Date(note.date).toLocaleDateString()}</strong></p>
    </>
  )
}
