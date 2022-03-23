import React, {useEffect} from 'react';
import { gsap, ScrollTrigger, CustomEase } from "gsap/all";
import './App.css';
import EarthModel from './Components/EarthModel';
import SkillsBar from './Components/SkillsBar';
import Draggable from 'react-draggable'
import { default as mail } from './assets/mail.svg';
import { default as github } from './assets/github-icon.svg';
import { default as linkedin } from './assets/linked-in-icon.svg';

function App() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // GSAP Configurations
    let sections = gsap.utils.toArray("section"),
    currentSection = sections[0];

    gsap.defaults({ease: CustomEase.create("custom", "M0,0 C0.77,0 0.175,1 1,1 "), duration: 1.5});

    // stretch out the body height according to however many sections there are. 
    gsap.set("body", {height: (sections.length * 100) + "%"});

    // create a ScrollTrigger for each section
    sections.forEach((section, i) => {
      ScrollTrigger.create({
        // use dynamic scroll positions based on the window height (offset by half to make it feel natural)
        start: () => (i - 0.5) * window.innerHeight,
        end: () => (i + 0.5) * window.innerHeight,
        // when a new section activates (from either direction), set the section accordingly.
        onToggle: self => self.isActive && setSection(section)
      });
    });
    
    function setSection(newSection) {
      if (newSection !== currentSection) {
        gsap.to(currentSection, {scale: 1, autoAlpha: 0, x: 0, y: 0})
        gsap.to(newSection, {scale: 1, autoAlpha: 1, x: 0, y: 0});
        currentSection = newSection;
        const className = currentSection.getAttribute('class');
        if (className === "first panel") {
          Fade("fade", -180);
          Fade("page1-description", 180);
        } else if (className === "panel second-panel") {
          Fade("secondPageTitle", -500);
          FadeAcross("secondPageTextContainer", -500);
          FadeAcross("pageTitleMiddle", 500);
        } else if (className === "panel third-panel") {
          FadeAcross("titleContainerPage3", -500);
          FadeAcross("SkillsBarContainer", 500);
        } else if (className === "panel fourth-panel") {
          FadeAcross("backgroundTitle-4", -200);
        } else if (className === "panel fifth-panel") {
          Translate("page5TitleSpan", 100);
          FadeAcross("row1", -200);
          FadeAcross("row2", 200);
        } else if (className === "panel sixth-panel") {
          Fade("page6Title", -300);
          FadeAcross("earthModel", -1000);
          FadeAcross("educationDescription", 1000);
        } else if (className === "panel seventh-panel") {
          Fade("page7Title", -360);
        } else if (className === "panel eighth-panel") {
          Fade("page8Title", -360);
          // FadeAcross("socialContainer", -300);
          let tl = gsap.timeline();
          tl.to(".github", {x: -1000, duration: 0})
          .to(".mail", {y: 1000, duration: 0})
          .to(".linkedin", {x: 1000, duration: 0})
          .to(".github", {x: 0, duration: 0.8})
          .to(".mail", {y: 0, duration: 0.8})
          .to(".linkedin", {x: 0, duration: 0.8})
          
        } else if (className === "panel ninth-panel") {
          let tl = gsap.timeline();
          tl.to(".backgroundTitle-9", {x: 800, y: 800, duration: 0})
          .to(".madewithRightColumn", {x: 1000, duration: 0})
          .to(".madewithLeftColumn", {x: -1000, duration: 0})
          .to(".backgroundTitle-9", {x: 0, y: 0, duration: 0.6})
          .to(".madewithLeftColumn", {x: 0, duration: 0.6})
          .to(".madewithRightColumn", {x: 0, duration: 0.6})
        }
      }
    }

    function Fade(name, num) {
      gsap.fromTo(`.${name}`, {
        autoAlpha: 0, 
        y: num
        }, {
        scrollTrigger: {
          trigger: `.${name}`,
          toggle: "restart none none none",
        },
        duration: 1.5, 
        autoAlpha: 1, 
        y: 0,
        ease: CustomEase.create("custom", "M0,0 C0.77,0 0.175,1 1,1 ")
      });
    }
    function FadeAcross(name, num) {
      gsap.fromTo(`.${name}`, {
        x: num,
        autoAlpha: 1
        }, {
        scrollTrigger: {
          trigger: `.${name}`,
          toggle: "restart none none none",
        },
        duration: 1.5, 
        x: 0,
        autoAlpha: 1,
        ease: CustomEase.create("custom", "M0,0 C0.77,0 0.175,1 1,1 ")
      });
    }
    function Translate(name, num) {
      gsap.fromTo(`.${name}`, {
        transform: `translate(0, ${num}%)`,
        }, {
        scrollTrigger: {
          trigger: `.${name}`,
          toggle: "restart none none none",
        },
        duration: 1.5, 
        transform: "translate(0,0)",
        ease: CustomEase.create("custom", "M0,0 C0.77,0 0.175,1 1,1 ")
      });
    }
    
  });

  useEffect(() => {
    var panel9 = document.getElementsByClassName("ninth-panel");
    panel9[0].addEventListener("mousemove", function(event) {
      parallaxed9(event);
    });

    function parallaxed9(e) {
      var amountMovedX = (e.clientX * -0.3 / 12);
      var amountMovedY = (e.clientY * -0.3 / 12);
      var x = document.getElementsByClassName("backgroundTitle-9");
      x[0].style.transform='translate(' + amountMovedX + 'px,' + amountMovedY + 'px)';
    }

    var panel4 = document.getElementsByClassName("fourth-panel");
    panel4[0].addEventListener("mousemove", function(event) {
      parallaxed4(event);
    });

    function parallaxed4(e) {
      var amountMovedX = (e.clientX * -0.3 / 12);
      var amountMovedY = (e.clientY * -0.3 / 12);
      var x = document.getElementsByClassName("backgroundTitle-4");
      x[0].style.transform='translate(' + amountMovedX + 'px,' + amountMovedY + 'px)';
    }
    
  })

  return (
    <div className="App">
      {/* First Page */}
      <section className="first panel">
        <Draggable bounds="body"><div className="title-container fade"><h1 className="page1-title lines" title="Click and drag to move around!">KIET DO</h1></div></Draggable>
        <Draggable bounds="body"><h2 className="page1-description hovertext lines">SOFTWARE ENGINEER / WEB DEVELOPER</h2></Draggable>
      </section>

      {/* Second Page */}
      <section className="panel second-panel">
        <h2 className="secondPageTitle white">MY NAME IS <strong>KIET</strong></h2>
        <Draggable><h1 className="pageTitleMiddle hovertext">WHO AM I?</h1></Draggable>
        <div className="secondPageTextContainer">
          <h2 className="secondPageDescription">I’M A SOFTWARE ENGINEER / WEB DEVELOPER @ WATERLOO</h2>
          <h2 className="secondPageDescription">PASSIONATE, LAID BACK</h2>
          <h2 className="secondPageDescription">EXCITED TO LEARN NEW TECHNOLOGIES</h2>
          <h2 className="secondPageDescription">OPEN TO CRITICISMS TO IMPROVE ON MISTAKES</h2>
        </div>
      </section>

      {/* Third Page */}
      <section className="panel third-panel">
        <Draggable>
          <div className="titleContainerPage3">
            <h1 className="pageTitle page3Title hovertext">SKILLS</h1>
          </div>
        </Draggable>
        <SkillsBar fade="SkillsBarContainer"/>
      </section>

      {/* Fourth Page */}
      <section class="panel fourth-panel">
        <h1 className="backgroundTitle-4">RESUME</h1>
        <div className="center-button" onClick={()=> {
            window.open("https://firebasestorage.googleapis.com/v0/b/kietdo-580f0.appspot.com/o/Resume123.pdf?alt=media&token=e6eabc0e-a04e-40e0-84fb-ea05f5c1cca1", "resume");
          }}>
          <div className="resumeButton"><p className="inline-border">RESUME.DOWNLOAD()</p></div>
        </div>
      </section>

      {/* Fifth Page */}
      <section class="panel fifth-panel">
        <Draggable><h1 className="pageTitle page5Title hovertext"><span className="page5TitleSpan">PROJECTS</span></h1></Draggable>
        <div class="row row1">
          <div class="column">
            <div class="card">
              <h3 className="cardTitle">UBREAKABLE KAPTCHA</h3>
              <h4>THE TURING TEST...</h4>
              <br/>
              <br/>
            </div>
          </div>
          <div class="column">
            <div class="card">
              <h3 className="cardTitle">COVID-19 SIMULATOR</h3>
              <h4>UNDERSTANDING THE EFFECTIVENESS OF MASKS...</h4>
              <br/>
              <br/>
            </div>
          </div>
        </div>
        <div class="row row2">
          <div class="column">
            <div class="card">
              <h3 className="cardTitle">SEXUALITY SPECTRUM</h3>
              <h4>SPECTRUM OF SEXUALITY AND ATTRACTION</h4>
              <br/>
              <br/>
            </div>
          </div>
          <div class="column">
            <div class="card">
              <h3 className="cardTitle">SIMPLE RANDOM WALK</h3>
              <h4>SEE HOW LONG YOUR VARIABLE HAVE WALKED, WHEN HAVE IT REACHED CERTAIN PLACES</h4>
              <br/>
            </div>
          </div>
        </div>
      </section>

      {/* Sixth Page */}
      <section class="panel sixth-panel">
        <Draggable><h1 className="pageTitle page6Title hovertext">EDUCATION</h1></Draggable>
        <EarthModel fade="earthModel"/>
        <div className="seperationLine"></div>
        <div className="educationDescription">
          <h3 className="year">2020 - CURRENT</h3>
          <h3 className="degree">BACHELOR OF STATISTICS <span className="computing-minor">/W COMPUTING MINOR</span></h3>
          <h2 className="university uni">UNIVERSITY OF <span>WATERLOO</span></h2>
          <br/>
          <h3 className="year">2013 - 2020</h3>
          <h3 className="degree">IB DIPLOMA & IGCSE</h3>
          <h2 className="university school">BRITISH INTERNATIONAL SCHOOL <span>HANOI</span></h2>
        </div>
      </section>

      {/* Seventh Page */}
      {/* <section class="panel seventh-panel">
        <Draggable><h1 className="pageTitle page7Title hovertext">HOBBIES</h1></Draggable>
        <div className="hobbiesList">
          <h3>READING</h3>
          <h3>HIKING</h3>
          <h3>SWIMMING</h3>
          <h3>PODCAST</h3>
          <h3>DOCUMENTARIES / TRUE-CRIME</h3>
          <h3>SPACE AND SCI-FI</h3>
          <h3>VIDEO GAMES</h3>
        </div>

        <div className="learningList">
          <h3>CODING</h3>
          <h3>APPLICATIONS</h3>
          <h3>WEBSITES</h3>
          <h3>ALGORITHMS</h3>
          <h3>LOGIC</h3>
          <h3>MATH</h3>
        </div>
      </section> */}

      {/* Eighth Page */}
      <section class="panel eighth-panel">
        <Draggable><h1 className="pageTitle page8Title hovertext">CONTACT</h1></Draggable>
        <div className="socialContainer">
          <a href="https://github.com/kietdo0602"><img className="socialsButton github" src={github}  alt="github-icon"/></a>
          <a href="mailto:kietdo0602@gmail.com"><img className="socialsButton mail" src={mail} alt="mail-icon"/></a>
          <a href="https://www.linkedin.com/in/kietdo/"><img className="socialsButton linkedin" src={linkedin} alt="linkedin-icon"/></a>
        </div>
        {/* <div className="divideLineLeft"></div>
        <div className="divideLineRight"></div>
        <h1 className="or">OR</h1>
        <div className="submitForm">
          <input className="nameField textField" type="text" id="fname" name="name" placeholder="Name" />
          <input className="emailField textField" type="email" id="email" name="email" placeholder="Email" />
          <textarea className="messageField" id="message" name="message" placeholder="Message" maxlength="5000"/>
        </div>
        <div className="buttonContainer"><div className="submitButton">SUBMIT</div></div> */}
      </section>

      {/* Ninth Page */}
      <section class="panel ninth-panel">
        <h1 className="backgroundTitle-9">MADE WITH</h1>
        <div className="madewithLeftColumn">
          <h2 className="htmlIcon">HTML</h2>
          <h2>CSS</h2>
          <h2>JS</h2>
          <h2>REACT</h2>
          <h2>GSAP, THREE.JS</h2>
          <h2>NODE.JS</h2>
        </div>
        <div className="madewithRightColumn">
          <h2>~40 HOURS OF CODING</h2>
          <h2>~120 SONGS</h2>
          <h2>~20 HOURS OF THINKING</h2>
        </div>
      </section>
    </div>
  );
}

export default App;
