import { useState } from 'react';
import ParticlesBg from 'particles-bg'
import '../style/App.css';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import ImageLinkForm from '../components/ImageLinkForm'
import Rank from '../components/Rank'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      <ParticlesBg type="cobweb" bg={false}/>
    </div>

  )
}

export default App
