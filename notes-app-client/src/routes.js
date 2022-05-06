import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import {CreatePage} from './pages/CreatePage'
import {AuthPage} from './pages/AuthPage'
import { NotesPage } from './pages/NotesPage'

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
		<Switch>
			<Route path="/notes" exact>
				<NotesPage />
			</Route>
			<Route path="/create" exact>
				<CreatePage />
			</Route>
		
			<Redirect to="/create" />
		</Switch>
    )
  }

  return (
	  <Switch>
		  <Route path="/" exact>
			  <AuthPage />
		  </Route>
		  <Redirect to="/" />
	  </Switch>
  )
}
