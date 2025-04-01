import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import CoffeeList from './components/CoffeeList'
import Slider from './components/Slider'

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
    <Header onSearch={setSearchQuery} />
    <Slider />
    <CoffeeList searchQuery={searchQuery} />
    <Footer />
    </>
  )
}

export default App;
