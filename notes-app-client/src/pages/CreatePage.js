import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'

export const CreatePage = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  const [note, setNote] = useState('')

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
		  await request('http://localhost:5000/api/notes/create', 'POST', {note: note}, {
          Authorization: `Bearer ${auth.token}`
		  
        })
        history.push(`/notes/`)
      } catch (e) {}
    }
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
        <div className="input-field">
          <input
            placeholder="Введите текст"
            id="note"
            type="text"
            value={note}
            onChange={e => setNote(e.target.value)}
            onKeyPress={pressHandler}
          />
				  <label htmlFor="note">Введите текст заметки</label>
        </div>
      </div>
    </div>
  )
}
