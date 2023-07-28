import { Pages } from '../pages'
import './styles/index.css'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Pages />
      </div>
    </BrowserRouter>
  )
}

export default App
