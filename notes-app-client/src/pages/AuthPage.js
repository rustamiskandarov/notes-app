import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
		const data = await request('http://localhost:5000/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
		const data = await request('http://localhost:5000/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h3>Личные заметки v1.0</h3>
			  <div className="card grey lighten-5">
          <div className="card-content">
            <span className="card-title">Авторизация</span>
				<div>
				<div className="input-field">
					<input
					placeholder="Введите логин в вормате email@mail.ru"
					id="email"
					type="text"
					name="email"
					className="yellow-input"
					value={form.email}
					onChange={changeHandler}
					/>
					<label htmlFor="email">Email</label>
				</div>

				<div className="input-field">
					<input
					placeholder="Введите пароль не менее 6 символов"
					id="password"
					type="password"
					name="password"
					className="yellow-input"
					value={form.password}
					onChange={changeHandler}
					/>
					<label htmlFor="email">Пароль</label>
				</div>
            </div>
          </div>
          <div className="card-action">
            <button
						  className="btn cyan darken-2 mr-10"
              style={{marginRight: 10}}
              disabled={loading}
              onClick={loginHandler}
            >
              Войти
            </button>
            <button
              className="btn grey lighten-1 black-text"
						  style={{ marginRight: 10 }}
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
			<button
				className="btn grey lighten-1 black-text"
				onClick={registerHandler}
				disabled={loading}
			>
				Войти гостем
			</button>
          </div>
        </div>
      </div>
    </div>
  )
}
