import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import ThankYou from './pages/ThankYou.jsx'
import Cancel from './pages/Cancel.jsx'
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
  },
  {
    path: 'thank-you',
    element: <ThankYou/>
  },
  {
    path: 'cancel',
    element: <Cancel/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
