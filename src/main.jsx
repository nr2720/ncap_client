import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Terms from './pages/Terms.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
  },
  {
    path: 'legal',
    element: <Terms/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
