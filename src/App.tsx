import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './app/routes'
import { Bounce, ToastContainer } from 'react-toastify'

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
