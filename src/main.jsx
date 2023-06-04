import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ApiPokemon from './components/ApiPokemon.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApiPokemon />
  </React.StrictMode>,
)
