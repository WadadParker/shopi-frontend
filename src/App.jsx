import { Route, Routes } from 'react-router'
import Home from './pages/Home.jsx'
import Checkout from './pages/Checkout.jsx'

function App() {
  return (
    <div className='h-screen w-screen'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/checout' element={<Checkout />} />
      </Routes>
    </div>
  )
}

export default App
