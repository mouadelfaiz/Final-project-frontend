import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Authenticator from './pages/Authenticator'
import CreateProject from './pages/CreateProject'
import Projects from './pages/Projects'
import NavBar from './components/NavBar'



function App() {
  return (
   <div>
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={<Authenticator/>}/>
        <Route path='/create-project' element={<CreateProject/>}/>
        <Route path='/projects' element={<Projects/>}/>
      </Routes>
    </Router>
   </div>
  )
}

export default App
