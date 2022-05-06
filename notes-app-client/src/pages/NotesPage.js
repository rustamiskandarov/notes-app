import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {NotesList} from '../components/NotesList'

export const NotesPage = () => {
  const [notes, setNotes] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const fetchNotes = useCallback(async () => {
	  
    try {
		const fetched = await request('http://localhost:5000/api/notes/', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setNotes(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  if (loading) {
    return <Loader/>
  }

  return (
    <>
      {!loading && <NotesList notes={notes} />}
    </>
  )
}
