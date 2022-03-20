import React, {useState} from 'react';
import '../Components/SkillsBar.css'
import { gsap } from "gsap/all";


const transition = () => {
  gsap.fromTo(".box", {ease: "power3.out", filter: "blur(5px) contrast(100%)", transform: "translate(0,100%)"}, {duration: 1.1  , ease: "power3.out", filter: "blur(0px) contrast(500%)", transform: "translate(0,0)"});
}

const SkillsBar = (props) => {
    const [choice, setChoice] = useState("ALL");
    return (<div className={props.fade}><div className="skillbar">
        <h2 className={'options ' + ((choice === "ALL") ? " select" : '')} onClick={() => { setChoice("ALL"); transition(); }}>ALL</h2>
        <h2 className={'options ' + ((choice === "FRONT-END") ? " select" : '')} onClick={() => {setChoice("FRONT-END"); transition();}}>FRONT-END</h2>
        <h2 className={'options ' + ((choice === "BACK-END") ? " select" : '')} onClick={() => {setChoice("BACK-END"); transition();}}>BACK-END</h2>
        <h2 className={'options ' + ((choice === "SOFTWARE") ? " select" : '')} onClick={() => {setChoice("SOFTWARE"); transition();}}>SOFTWARE</h2>
        <h2 className={'options ' + ((choice === "GENERAL") ? " select" : '')} onClick={() => {setChoice("GENERAL"); transition();}}>GENERAL</h2>
      </div>
      <div className="box">
        {choice === "ALL" ? 
        <div className="skills-row">
          <div className="skills-column"> 
            <h3>HTML, CSS, JAVASCRIPT</h3>
            <h3>REACT</h3>
            <h3>JAVA, C++, PYTHON</h3>
            <h3>SPRING BOOT</h3>
            <h3>BOOTSTRAP</h3>
            <h3>GSAP, THREE.JS</h3>
            <h3>GITHUB</h3>
          </div>
          <div className="skills-column">
            <h3>LINUX</h3>
            <h3>REDUX</h3>
            <h3>GRAPHQL</h3>
            <h3>REST API</h3>
            <h3>FIGMA</h3>
            <h3>RACKET</h3>
          </div>
        </div> : ''}
        {choice === "FRONT-END" ? 
        <div className="skills-row">
          <div className="single-column">
          <h3>HTML, CSS, JAVASCRIPT</h3>
          <h3>REACT</h3>
          <h3>BOOTSTRAP, MATERIAL UI</h3>
          <h3>GSAP, THREE.JS</h3>
          </div>
        </div> : ''}
        {choice === "BACK-END" ? 
        <div className="skills-row">
          <div className="single-column">
            <h3>JAVASCRIPT</h3>
            <h3>REACT</h3>
            <h3>JAVA, C++, PYTHON</h3>
            <h3>SPRING BOOT</h3>
            <h3>GITHUB</h3>
            <h3>REDUX, GRAPHQL</h3>
            <h3>REST API</h3>
          </div>
        </div> : ''}
        {choice === "SOFTWARE" ? 
        <div className="skills-row">
          <div className="single-column"> 
            <h3>JAVASCRIPT</h3>
            <h3>JAVA, C++, PYTHON</h3>
            <h3>SPRING BOOT</h3>
            <h3>GITHUB</h3>
            <h3>REDUX, GRAPHQL</h3>
          </div>
        </div> : ''}
        {choice === "GENERAL" ? 
        <div className="skills-row">
          <div className="single-column">
            <h3>ADOBE PHOTOSHOP, ILLUSTRATOR, PREMIERE</h3>
            <h3>MICROSOFT OFFICE</h3>
            <h3>FIGMA</h3>
            <h3>RACKET</h3>
            <h3>WRITING REPORTS AND RESERACH PAPERS</h3>
          </div>
        </div> : ''}
      </div>
    </div>)
  }

export default SkillsBar;