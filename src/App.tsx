import Homepage from './components/pages/Homepage'
import AboutPage from './components/pages/About'
import ProjectsPage from './components/pages/ProjectsPage'
import { Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="*" element={<Homepage />} />
    </Routes>
  )
}

export default App
