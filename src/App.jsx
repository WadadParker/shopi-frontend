import { Route, Routes } from 'react-router'
import Home from './pages/Home.jsx'

function App() {
  return (
    <div className='h-screen'>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
