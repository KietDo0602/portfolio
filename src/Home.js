import React, {useEffect, useRef, useState} from 'react';
import { gsap, ScrollTrigger } from "gsap/all";
import './App.css';
import CustomChatBot from './components/ChatBot';
import {disableScroll, enableScroll} from './components/Scroll';
import Footer from './components/Footer';
import {Link} from 'react-router-dom';


gsap.registerPlugin(ScrollTrigger);

function Home() {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState(false);
  const loaderRef = useRef();
  const coverRef = useRef();
  const chatBotRef = useRef();
  const mainPageContainerRef = useRef();
  const mainPageTitleRef = useRef();
  const titlePageRef = useRef();
  const skillPage1Ref = useRef();
  const skillPage2Ref = useRef();
  const skillPage3Ref = useRef();
  const skillScrollRef = useRef();
  const skillTabTextContainerRef = useRef();
  const footerRef = useRef();
  const titleContainerRef = useRef();
  const aboutPageRef = useRef();
  const frontSkillRef = useRef();
  const backSkillRef = useRef();
  const softwareSkillRef = useRef();
  
  // Kill previous instances of ScrollTrigger
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((instance) => {
        instance.kill();
      });
      // This in case a scroll animation is active while the route is updated
      gsap.killTweensOf(window);
    };
  }, [])

  // Main Page Scroll logic
  useEffect(() => {
    // console.clear()
    document.title="Kiet Do";
    gsap.to(mainPageTitleRef.current, {
      scrollTrigger: {
        trigger: titlePageRef.current,
        start: "top top",
        end: "bottom top",
        pin: mainPageContainerRef.current,
        // markers: true,
        scrub: 0
      },
      y: "100%",
    })
  }, []);
  

  // About Page Scroll Logic
  useEffect(() => {
    let startXCoord = 90;
    let st = ScrollTrigger.create({
      trigger: aboutPageRef.current,
      pin: titleContainerRef.current,
      start: "top 70vh",
      end: "bottom 90%",
    });
    for (let i = 1; i < 8; ++i) {
      gsap.set(`.aboutPageDesc${i}`, { 
        xPercent: (i % 2 === 1 ? startXCoord: -startXCoord),
        color: "white"
      });
      gsap.to(`.aboutPageDesc${i}`, {
        scrollTrigger: {
          trigger: aboutPageRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
          // markers: true,
        },
        xPercent: (i % 2 === 1 ? -10: 10),
        color: "black"
      })
    }
  }, []);

  // Skill Page Scroll Logic
  useEffect(() => {
    ScrollTrigger.create({
      trigger: skillScrollRef.current,
      pin: skillTabTextContainerRef.current,
      start: "top top",
      end: "bottom bottom",
    });
    ScrollTrigger.create({
      trigger: skillPage1Ref.current,
      start: "50px 200px",
      end: "bottom-=150px 200px",
      // markers: true,
      onEnter: () => {
        if (frontSkillRef) frontSkillRef.current.classList.add("select");
      },
      onEnterBack: () => {
        if (backSkillRef) backSkillRef.current.classList.remove("select");
        if (softwareSkillRef) softwareSkillRef.current.classList.remove("select");
        if (frontSkillRef) frontSkillRef.current.classList.add("select");
      }
    });
    ScrollTrigger.create({
      trigger: skillPage2Ref.current,
      start: "50px 200px",
      end: "bottom-=150px 200px",
      // markers: true,
      onEnter: () => {
        if (frontSkillRef) frontSkillRef.current.classList.remove("select");
        if (backSkillRef) backSkillRef.current.classList.add("select");
      },
      onEnterBack: () => {
        if (softwareSkillRef) softwareSkillRef.current.classList.remove("select");
        if (backSkillRef) backSkillRef.current.classList.add("select");
      }
    });
    ScrollTrigger.create({
      trigger: skillPage3Ref.current,
      start: "50px 200px",
      end: "bottom-=150px 200px",
      // markers: true,
      onEnter: () => {
        if (frontSkillRef) frontSkillRef.current.classList.remove("select");
        if (backSkillRef) backSkillRef.current.classList.remove("select");
        if (softwareSkillRef) softwareSkillRef.current.classList.add("select");
      }
    });
  }, []);

  // Resume Page Logic
  useEffect(() => {
    let isMobile = false;
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
        isMobile = true;
    }
    if (isMobile === false) {
      var resumePage = document.getElementsByClassName("resumePage");
      resumePage[0].addEventListener("mousemove", function(event) {
        parallaxed(event, "resumeTitle");
      });
  
      function parallaxed(e, className) {
        var amountMovedX = (e.clientX * -0.8 / 8);
        var amountMovedY = (e.clientY * -0.3 / 8);
        var x = document.getElementsByClassName(className);
        x[0].style.transform = 'translate(' + amountMovedX + 'px,' + amountMovedY + 'px)';
      }
    }
  }, []);

  // Project Page Scroll Logic
  useEffect(() => {
    gsap.set('.project', {yPercent: 15, autoAlpha: 0});
    ScrollTrigger.batch(".project", {
      onEnter: batch => {
        gsap.to(batch, {yPercent: 0, autoAlpha: 1, duration: 0.7});
      },
    });
  }, []);

  // Footer Page Scroll Logic
  useEffect(() => {
    gsap.set(footerRef.current, {yPercent: 10, autoAlpha: 0});
    ScrollTrigger.create({
      trigger: footerRef.current,
      onEnter: () => {
        gsap.to(footerRef.current, {yPercent: 0, autoAlpha: 1, duration: 0.7});
      },
    });
  }, []);

  // On Page Load after everything else have loaded
  useEffect(() => {
    disableScroll();
    // gsap.set(mainPageTitleRef.current, {yPercent: -100});
    var tl = gsap.timeline();
    tl.to(loaderRef.current, {animationPlayState: "paused", duration: 0, delay: 1.6})
    .to(coverRef.current, {yPercent: -120, duration: 1.9, ease: "slow(0.7, 0.7, false)", visibility: "none"})
    // .to(mainPageTitleRef.current, {yPercent: 0, duration: 1, ease: "bounce.out"})
    .call(enableScroll)
  }, []);


  return (
    <div className="App">
      <div className="cover coverAnimation" ref={coverRef}> 
        <div className="loaderContainer">
          <div className="loader" ref={loaderRef}></div>
        </div>
      </div>
      {open ? <CustomChatBot chat={chat}/> : null}
      <div className={'chatBotButton ' + (chat ? ' selected' : 'unselected')} ref={chatBotRef} onClick={() => {setChat(!chat); setOpen(true)}}></div>
      {/* Title Page */}
      <section className="titlePage panel" ref={titlePageRef}>
        <div>
          <h1 className="largeFontSize hidden mainPageTitle" ref={mainPageContainerRef}><span className="titleSpan" ref={mainPageTitleRef}>kiet</span></h1>
        </div>
      </section>

      {/* About Page */}
      <section className="aboutPage normal-panel" ref={aboutPageRef}>
        <div className="titleContainer" ref={titleContainerRef}>
          <div className="center">
            <h1 className="mediumFontSize hidden aboutPageDesc1">I'M <span className="bold">KIET</span>!</h1>
            <h1 className="largeFontSize hidden aboutPageDesc2">ABOUT ME</h1>
            <h1 className="smallFontSize bottomParagraph aboutPageDesc3">WEB DEVELOPER BASED IN <strong>WATERLOO</strong></h1>
            <h1 className="smallFontSize bottomParagraph aboutPageDesc4">ENJOYS BIG TALKS AND TRAINS 🚂</h1>
            <h1 className="smallFontSize bottomParagraph aboutPageDesc5">PASSIONATE, LAID BACK</h1>
            <h1 className="smallFontSize bottomParagraph aboutPageDesc6">EXCITED TO LEARN NEW TECHNOLOGIES</h1>
            <h1 className="smallFontSize bottomParagraph aboutPageDesc7">ALWAYS OPEN TO CRITICISMS</h1>
          </div>
        </div>
      </section>

      {/* Skills Page */}
      <section className="skillScroll" ref={skillScrollRef}>
        <section className="skillPage normal-panel" ref={skillPage1Ref}>
          <div className="skillTab">
            <div className="skillTabTextContainer" ref={skillTabTextContainerRef}>
              <h1 className='select option frontSkill' ref={frontSkillRef}>FRONT-END</h1>
              <h1 className='option backSKill' ref={backSkillRef}>BACK-END</h1>
              <h1 className='option softwareSkill' ref={softwareSkillRef}>SOFTWARE</h1>
            </div>
          </div>
          <div className="single-column">
            <div className="skillTextContainer">
              <h1 className="skillFont">HTML</h1>
              <h1 className="skillFont">CSS</h1>
              <h1 className="skillFont">JAVASCRIPT</h1>
              <h1 className="skillFont">REACT</h1>
              <h1 className="skillFont">BOOTSTRAP</h1>
              <h1 className="skillFont">MATERIAL UI</h1>
              <h1 className="skillFont">GSAP</h1>
              <h1 className="skillFont">THREE.JS</h1>
            </div>
          </div>
        </section>
        <section className="skillPage2 normal-panel" ref={skillPage2Ref}>
          <div className="backendSKills">
            <div className="double-left">
              <div className="middle">
                <h1 className="skillFont">REACT</h1>
                <h1 className="skillFont">NODE.JS</h1>
                <h1 className="skillFont">EXPRESS.JS</h1>
                <h1 className="skillFont">JAVA SPRING</h1>
                <h1 className="skillFont">REDUX</h1>
                <h1 className="skillFont">REDIS</h1>
                <h1 className="skillFont">GRAPHQL</h1>
                <h1 className="skillFont">REST</h1>
              </div>
            </div>
            <div className="double-right">
              <div className="middle">
                <h1 className="skillFont">GITHUB</h1>
                <h1 className="skillFont">HEROKU</h1>
                <h1 className="skillFont">AWS</h1>
                <h1 className="skillFont">MYSQL</h1>
                <h1 className="skillFont">NO-SQL</h1>
                <h1 className="skillFont">CLI</h1>
                <h1 className="skillFont">NPM</h1>
                <h1 className="skillFont">VSCODE</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="skillPage3 normal-panel" ref={skillPage3Ref}>
          <div className="single-column">
            <div className="skillTextContainer">
              <h1 className="skillFont">JAVA</h1>
              <h1 className="skillFont">C++</h1>
              <h1 className="skillFont">PYTHON</h1>
              <h1 className="skillFont">JAVAFX</h1>
              <h1 className="skillFont">JAVA SWING</h1>
              <h1 className="skillFont">OPENCV</h1>
              <h1 className="skillFont">VIM</h1>
              <h1 className="skillFont">ECLIPSE</h1>
              <h1 className="skillFont">INTELLIJ</h1>
            </div>
          </div>
        </section>
      </section>

      {/* Resume Page */}
      <section className="resumePage panel">
        <h1 className="resumeTitle">RESUME</h1>
        <Link to="/files/resume.pdf">
          <div className="buttonResume">
            <div className="resumeButton"><p className="inline-border">RESUME.DOWNLOAD()</p></div>
          </div>
        </Link>
      </section>

      {/* Projects Pages */}
      <section className="projectPage">
        <div className="projectContainer">
          <div className="project_column">
            <h1 className="projectTitle">SELECTED PROJECTS</h1>
            <div className="project first-project transform">
              <Link to="/">
                <div className="projectImage">
                  {/* <img className="projectImageSrc" src="https://www.datamation.com/wp-content/uploads/2021/10/artificial-intelligence-g48cb9bf7d_1920.jpg" alt="Project"/> */}
                </div>
              </Link>
              <div className="projectDesc">
                <h1>ADVANCED CAPTCHA</h1>
                <p>A unique take on conventional Catpchas</p>
                <p>Status: Work In Progress</p>
              </div>
            </div>
            <div className="project transform">
              <Link to="/">
                <div className="projectImage">
                  {/* <img className="projectImageSrc" src="https://www.datamation.com/wp-content/uploads/2021/10/artificial-intelligence-g48cb9bf7d_1920.jpg" alt="Project"/> */}
                </div>
              </Link>
              <div className="projectDesc">
                <h1>SIMPLE RANDOM WALK</h1>
                <p>Where will an object end up if they walk in random directions?</p>
                <p>Status: Work In Progress</p>
              </div>
            </div>
          </div>
          <div className="project_column">
            <div className="project transform">
              <Link to="/">
                <div className="projectImage">
                  {/* <img className="projectImageSrc" src="https://www.datamation.com/wp-content/uploads/2021/10/artificial-intelligence-g48cb9bf7d_1920.jpg" alt="Project"/> */}
                </div>
              </Link>
              <div className="projectDesc">
                <h1>COVID-19 SIMULATOR</h1>
                <p>Visualize the effectiveness of certain Covid measures</p>
                <p>Status: Work In Progress</p>
              </div>
            </div>
            <div className="project transform">
              <Link to="/">
                <div className="projectImage">
                  {/* <img className="projectImageSrc" src="https://www.datamation.com/wp-content/uploads/2021/10/artificial-intelligence-g48cb9bf7d_1920.jpg" alt="Project"/> */}
                </div>
              </Link>
              <div className="projectDesc">
                <h1>SEXUALITY SPECTRUM</h1>
                <p>Spectrum of sexuality and attraction</p>
                <p>Status: Work In Progress</p>
              </div>
            </div>
            <div className="allproject-container">
              <Link to="/all-projects">
                <h1 className="all-project-button">ALL PROJECTS</h1>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Contacts Page */}
      <Footer ref={footerRef}/>
    </div>
  );
}

export default Home;
