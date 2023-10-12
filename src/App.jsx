import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { Authenticator } from './pages/Authenticator'
import { CreateProject } from './pages/CreateProject'
import NavBar from "./components/NavBar"
import DoneTask from './pages/DoneTask'



function App() {
  return (
   <div>
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={<Authenticator/>}/>
        <Route path='/create-project' element={<CreateProject/>}/>
        <Route path='/done-projects' element={<DoneTask/>}/>
      </Routes>
    </Router>
   </div>
  )
}

export default App
