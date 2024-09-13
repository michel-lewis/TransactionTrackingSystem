import { BrowserRouter as Router,  Route ,Routes} from 'react-router-dom';
import Dashboard from './component/Dashboard.tsx'


import './App.css'

function App() {

  return (
    <Router>  
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App
