import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/homepage/homepage'
import './App.css'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            {/* <Route path="*" element={<NotFound />} />       404 */}
        </Routes>
    )
}

export default App