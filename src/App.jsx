import Canvas from "./canvas"
import Customizer from "./pages/Customizer"
import Home from "./pages/Home"
import Checkout from "./pages/Checkout"
import MenuDefault from "./components/Menu"
import MenuExplain from "./pages/MenuExplainPage"
import Logo from '/ncp.png'

import state from "./store"

import { useRef } from 'react';

function App() {

  const homeReturn = () => {
    state.customizer = false;
    state.intro = true;
    state.checkout = false;
    state.explainAbout = false;
    state.explainContact = false;
    state.explainLogo = false;
    state.explainTerms = false;
    state.isSent = false;
    }

    const canvasRef = useRef();

  return (
    <>
      <main className="app transition-all ease-in">
          <img className="absolute logoCap z-20" src={Logo} alt="NcapLogo" onClick={homeReturn} />
          <MenuDefault/>
          <Home/>
          <Canvas ref={canvasRef} />
          <Customizer />
          <Checkout />
          <MenuExplain />
      </main>
    </>
  )
}

export default App
