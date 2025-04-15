import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditNote from './features/notes/EditNote'
import NewNote from './features/notes/NewNote'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'
import useTitle from './hooks/useTitle'

function App() {

  useTitle('Ed D. Repairs');

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Layout />}>
            {/* public routes */}
            <Route index element={<Public />}/>
            <Route path='login' element={<Login />} />

            {/* protected routes */}
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
                <Route element={<Prefetch />}>
                  <Route path='dash' element={<DashLayout />}>
                    
                    <Route index element={<Welcome />} />

                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Manager]} />}>
                      <Route path='users'>
                        <Route index element={<UsersList />} />
                        <Route path=':id' element={<EditUser />} />
                        <Route path='new' element={<NewUserForm />} />
                      </Route>
                    </Route>

                    <Route path='notes'>
                      <Route index element={<NotesList />} />
                      <Route path=':id' element={<EditNote />} />
                      <Route path='new' element={<NewNote />} />
                    </Route>

                  </Route> {/* End Dash Routes */}
                </Route>

              </Route> 
            </Route> {/* end protected route */}

          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */