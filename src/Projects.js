import React, {useState, useRef, useEffect} from 'react';
import './Projects.css';
import { data } from './data/ProjectData';
import LazyImage from './components/LazyImage';
import {disableScroll, enableScroll} from './components/Scroll';
import { gsap } from "gsap/all";


function Projects() {
    const [search, setSearch] = useState('');
    const [projectProgress, setProjectProgress] = useState('all');
    const [front, setFront] = useState(true);
    const [back, setBack] = useState(true);
    const [software, setSoftware] = useState(true);
    const coverRef = useRef();
    const loaderRef = useRef();
    const all = useRef();
    const start = useRef();
    const ongoing = useRef();
    const finished = useRef();


    useEffect(() => {
        window.scrollTo(0, 0);
        document.title="Kiet's Project";
    }, [])

    useEffect(() => {
        var tl = gsap.timeline();
        tl.call(disableScroll)
        .to(loaderRef.current, {animationPlayState: "paused", duration: 0, delay: 1.6})
        .to(coverRef.current, {yPercent: -120, duration: 1.5, ease: "slow(0.7, 0.7, false)", visibility: "none"})
        .call(enableScroll)
    }, []);

    function TagFilter(item) {
        if (projectProgress === "all") return true;
        if (item.state === projectProgress) {
            return true;
        } else {
            return false;
        }
    }
    
    function SearchFilter(item) {
        if (search.length <= 0 || search.trim().length <= 0) return true;
        let searchResult = search.toLowerCase();
        let name = item.name.toLowerCase();
        let state = item.state.toLowerCase();
        let type = item.type.toLowerCase();
        let desc = item.desc.toLowerCase();
        if ( name.includes(searchResult) || state.includes(searchResult) || type.includes(searchResult) || desc.includes(searchResult)) {
            return true;
        } else {
            return false;
        }
    }
    
    function TypeFilter(item) {
        if (front === true && item.type === "front") {
            return true;
        } else if (back === true && item.type === "back") {
            return true;
        } else if (software === true && item.type === "software") {
            return true;
        } else {
            return false;
        }
    }

    function handleChange(event) {
        event.preventDefault();
        setSearch(event.target.value);
    }
    
    return (
        <>
            <div className="cover coverAnimation" ref={coverRef}> 
                <div className="loaderContainer">
                <div className="loader" ref={loaderRef}></div>
                </div>
            </div>
            <div className="proj">
                <div className="horizontal-bar-1">
                    <h1 className="Title">PERSONAL PROJECTS</h1>
                </div>
                <div className="horizontal-bar-2">
                    <div className="projectProgressBar">
                        <p onClick={() => setProjectProgress('all')} ref={all} className={(projectProgress === 'all' ? 'bold' : '')}>ALL PROJECTS</p>
                        <p onClick={() => setProjectProgress('starting')} ref={start} className={(projectProgress === 'starting' ? 'bold' : '')}>STARTING</p>
                        <p onClick={() => setProjectProgress('on-going')} ref={ongoing} className={(projectProgress === 'on-going' ? 'bold' : '')}>ON-GOING</p>
                        <p onClick={() => setProjectProgress('finished')} ref={finished} className={(projectProgress === 'finished' ? 'bold' : '')}>FINISHED</p>
                    </div>
                </div>
                <div className="horizontal-bar-3">
                    <div className="search-container">
                        <input className="search" spellCheck="false" id="searchleft" 
                        type="search" name="q" placeholder="Search" value={search} onChange={handleChange}/>
                        <label className="button searchbutton" for="searchleft"><span className="mglass">&#9906;</span></label>
                    </div>
                    <div className="projectTypeBar">
                        <p onClick={() => setFront(!front)} className={(front ? 'front' : '')}>FRONT-END</p>
                        <p onClick={() => setBack(!back)} className={(back ? 'back' : '')}>BACK-END</p>
                        <p onClick={() => setSoftware(!software)} className={(software ? 'software' : '')}>SOFTWARE</p>
                    </div>
                </div>
                <div className="container">
                    {data.filter(TagFilter).filter(SearchFilter).filter(TypeFilter).map((item) =>
                        <a className="link" href={item.href}>
                            <div className={"tile " + (item.type + '-shadow')}>
                                <LazyImage className="image" src={item.img}/>
                                <div className={"bottom-container" + (item.pride ? " pride" : '')}>
                                    <h1 className="projectName">{item.name}</h1>
                                    <h1 className="projectDesc">
                                        {item.desc}
                                    </h1>
                                    <h1 className="tag">{item.state.toUpperCase()}</h1>
                                </div>
                            </div>
                        </a>
                    )}
                </div>
            </div>
        </>
    )
}

export default Projects;