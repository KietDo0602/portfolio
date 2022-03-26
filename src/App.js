import React, {useEffect, useState, Suspense, lazy} from 'react';
import { gsap, ScrollTrigger, CustomEase } from "gsap/all";
import './App.css';
import EarthModel from './Components/EarthModel';
import SkillsBar from './Components/SkillsBar';
import Draggable from 'react-draggable'
import { default as mail } from './assets/mail.svg';
import { default as github } from './assets/github-icon.svg';
import { default as linkedin } from './assets/linked-in-icon.svg';
import Loader from './Components/Loader';
// import Home from './Home';
const Home = lazy(() => {
  return Promise.all([
    import("./Home"),
    new Promise(resolve => setTimeout(resolve, 600))
  ])
  .then(([moduleExports]) => moduleExports);
});

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loader/>}>
        <Home />
      </Suspense>
    </div>
  );
}

export default App;
