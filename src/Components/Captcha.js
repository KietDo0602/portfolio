import '../Kaptcha.css';
import React, {useState, useEffect, useRef} from 'react';
import { Buffer } from 'buffer';
import axios from 'axios';

const WEBSITE_URL = "https://enigmatic-meadow-34576.herokuapp.com";

const Captcha = (props) => {
    const [pageLoad, setPageLoad] = useState(false);
    const [info, setInfo] = useState(false);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [questionLoaded, setQuestionLoaded] = useState(false);
    const [verified, setVerified] = useState(false);
    const [loadState, setLoadState] = useState('idle');
    const [quizLoad, setQuizLoad] = useState(false);
    const [question, setQuestion] = useState({
        'type': 0,
        'qid': '',
        'image': null,
        'image_list': [],
        'word_list': [],
        'video': null,
        'question': null
    });
    const circle_loader = useRef();
    async function fetchToken() {
        let data = JSON.stringify({
            "ip": localStorage.getItem('ipAddress'),
            "no_questions": props.no_questions,
            "question_type": props.question_types
        });
        
        let config = {
            method: 'post',
            url: `${WEBSITE_URL}/api/session/add`,
            headers: { 
              'Content-Type': 'application/json',
              'ip': localStorage.getItem('ipAddress'),
            },
            data : data
        };
        setError(false);
        axios(config)
        .then(function (response) {
            if (response.data.session !== "existed") {
                window.localStorage.clear();
                let session = response.data.session_id;
                window.localStorage.setItem('session-token', session);
                setPageLoad(true);
            } else {
                setPageLoad(true);
            }
        })
        .catch(function (error) {
            setError(true);
            console.log(error);
        });
    }

    async function fetchQuestion() {
        let token = window.localStorage.getItem('session-token');
        var config = {
            method: 'get',
            url: `${WEBSITE_URL}/api/session/get`,
            headers: { 
              'session-token': token,
              'ip': localStorage.getItem('ipAddress'), 
              'Content-Type': 'application/json'
            },
        };
        setError(false);
        setLoadState('loading');
        axios(config)
        .then(function (res) {
            const data = res.data;
            if (res.data.verified === true) {
                if (localStorage.getItem('ipAddress') == null) {
                    fetchUserIP();
                }
                setOpen(false);
                setLoadState('verified');
                setVerified(true);
                return;
            } else {
                setLoadState('idle');
                setVerified(false);
                const type = data.question_type;
                let obj = {
                    'type': type,
                    'qid': data.qid,
                    'image': (type === 4 ? data.image : null),
                    'image_list': (type === 3 ? data.image_list : null),
                    'video': (type === 5 ? data.video : null),
                    'question': ((type === 1 || type === 4 || type === 2) ? data.question : null),
                };
                setQuestion(obj);
                setQuizLoad(false);
                setQuestionLoaded(true);
                setOpen(true);
            }
        }).catch(function (error) {
            setOpen(false);
            setError(true);
            console.log(error);
        })
    }


    const [answer, setAnswer] = useState('');
    const handleSubmitType1 = async ( event ) => {
        event.preventDefault();
        let dupAnswer = answer;
        var data = JSON.stringify({
            "type": 1,
            "qid": question.qid,
            "answer": dupAnswer
        });
        var config = {
            method: 'post',
            url: `${WEBSITE_URL}/api/session/post`,
            headers: { 
              'session-token': window.localStorage.getItem('session-token'), 
              'Content-Type': 'application/json'
            },
            data : data
        };
        setQuestionLoaded(false);
        setAnswer('');
        setQuestion({...question, type: 0, image: null, image_list: [], word_list: [], video: null, question: null})
        setQuizLoad(true);
        
        axios(config)
        .then(function (response) {
            if (response) {
                fetchQuestion();
                setAnswer('');
                setQuestion({...question, type: 0, image: null, image_list: [], word_list: [], video: null, question: null})
                return response;
            }
        }).catch(err => {
            setOpen(false);
            setError(true);
            console.log(err);
        })
    };
    const handleSubmitType4 = async ( event ) => {
        event.preventDefault();
        let dupAnswer = answer;
        var data = JSON.stringify({
            "type": 4,
            "qid": question.qid,
            "answer": dupAnswer
        });
        var config = {
            method: 'post',
            url: `${WEBSITE_URL}/api/session/post`,
            headers: { 
              'session-token': window.localStorage.getItem('session-token'), 
              'Content-Type': 'application/json'
            },
            data : data
        };
        setQuestionLoaded(false);
        setAnswer('');
        setQuestion({...question, type: 0, image: null, image_list: [], word_list: [], video: null, question: null})
        setQuizLoad(true);
        
        axios(config)
        .then(function (response) {
            if (response) {
                fetchQuestion();
                setAnswer('');
                setQuestion({...question, type: 0, image: null, image_list: [], word_list: [], video: null, question: null})
                return response;
            }
        }).catch(err => {
            setOpen(false);
            setError(true);
            console.log(err);
        })
    };
    const handleSubmitType2 = async ( event ) => {
        event.preventDefault();
        let dupAnswer = answer;
        var data = JSON.stringify({
            "type": 2,
            "qid": question.qid,
            "answer": dupAnswer
        });
        var config = {
            method: 'post',
            url: `${WEBSITE_URL}/api/session/post`,
            headers: { 
              'session-token': window.localStorage.getItem('session-token'), 
              'Content-Type': 'application/json'
            },
            data : data
        };
        setQuestionLoaded(false);
        setAnswer('');
        setQuestion({...question, type: 0, image: null, image_list: [], word_list: [], video: null, question: null})
        setQuizLoad(true);
        
        axios(config)
        .then(function (response) {
            if (response) {
                fetchQuestion();
                setAnswer('');
                setQuestion({...question, type: 0, image: null, image_list: [], word_list: [], video: null, question: null})
                return response;
            }
        }).catch(err => {
            setOpen(false);
            setError(true);
            console.log(err);
        })
    };
    const fetchUserIP = async () => {
        const { data: { ip } } = await axios.get("https://www.cloudflare.com/cdn-cgi/trace", {
            responseType: "text",
            transformResponse: data =>
            Object.fromEntries(data.trim().split("\n").map(line => line.split("=")))
        });
        localStorage.setItem("ipAddress", ip);
    }
    useEffect(() => {
        fetchUserIP()
        .catch(console.error).then(() => {
            fetchToken();
        })
    }, []);
    return (
        <>
            { pageLoad ? 
                <div>
                    <div className="captcha-outer">
                        <p className="title">Kaptcha</p>
                        <div className="info" onClick={() => {setInfo(true); setOpen(false)}}>?</div>
                        <div 
                            className={`circle-loader ${(loadState === 'loading') ? 'circle-loader-animation' : ''} ${(loadState === 'verified') ? 'circle-loader-animation load-complete' : ''}`} 
                            onClick={() => {
                                fetchQuestion();
                            }}
                            ref={circle_loader}>
                                {verified && (loadState === 'verified') ? <div className="checkmark draw"></div> : ''}
                        </div>
                        { ( error ) ? 
                            <div className="error" onClick={(event) => {
                                event.preventDefault();
                                setError(false);
                                setLoadState('idle'); 
                                setVerified(false);
                                setQuestion({...question, type: 0, image: null, image_list: [], word_list: [], video: null, question: null});
                                fetchUserIP()
                                .then(() => {
                                    fetchToken();
                                })
                            }}>
                                Session Expired. Click here to renew cookies
                            </div> 
                        : null }
                    </div>
                    { ( open ) ? 
                        <div className="c-content">
                            <div className="modal-backdrop" onClick={() => {
                                setLoadState('idle');
                                setOpen(false);
                                setQuestion({...question, type: 0, image: null, image_list: [], word_list: [], video: null, question: null})
                            }}></div>
                            <div className={`modal-content ${(questionLoaded ? 'fadein-animation' : '')}`}>
                                <span className="close" onClick={() => {
                                    setLoadState('idle');
                                    setOpen(false);
                                    setQuestion({...question, type: 0, image: null, image_list: [], word_list: [], video: null, question: null})
                                }}>
                                    &times;
                                </span>
                                <div>
                                    {quizLoad ? <div className="circle-loader circle-loader-animation load-padding"></div> : null}
                                    {( question.type === 1 ) ?
                                        <form onSubmit={handleSubmitType1}>
                                            <div className={`question-type-1`}>
                                                <label className="questionLabel">Answer the question</label>
                                                <label className="instruction">Read the given question in the black box and provide answer in the text field and click next.</label>
                                                <label className="questionLabel">Question:</label>
                                                <img className="questionImage" src={URL.createObjectURL( new Blob([Buffer.from(question.question, "base64").buffer], { type: 'image/jpg' }) )} alt="generated question"/>
                                                <label  className="answerTag" htmlFor="answer">Answer:</label>
                                                <input className="input" type="text" name="answer" placeholder="Sample answers: apple, 4, cake" value={answer} onChange={e => setAnswer(e.target.value)}/>
                                                <div className="buttonParent">
                                                    <button className="nextButton" type="submit">NEXT</button>
                                                </div>
                                            </div>
                                        </form>
                                    : ''}
                                    {( question.type === 4 ) ?
                                        <form onSubmit={handleSubmitType4}>
                                            <div className="question-type-4">
                                                <label className="instruction">Look at the image, read the given question in the black box and provide answer in the text field.</label>
                                                <div className="frame"><img className="image" src={URL.createObjectURL( new Blob([Buffer.from(question.image, "base64").buffer], { type: 'image/jpg' }) )} alt="img user look at to decode"/></div>
                                                <label className="questionLabel">Question:</label>
                                                <img className="questionImage" src={URL.createObjectURL( new Blob([Buffer.from(question.question, "base64").buffer], { type: 'image/jpg' }) )} alt="generated question"/>
                                                <label  className="answerTag" htmlFor="answer">Answer:</label>
                                                <input className="input" type="text" autocomplete="off" name="answer" placeholder="Sample answers: apple, 4, cake" value={answer} onChange={e => setAnswer(e.target.value)}/>
                                                <div className="buttonParent">
                                                    <button className="nextButton" type="submit">NEXT</button>
                                                </div>
                                            </div>
                                        </form>
                                    : ''}
                                    {( question.type === 2 ) ?
                                        <form onSubmit={handleSubmitType2}>
                                            <div className="question-type-2">
                                                <label className="instruction">Type in these words in the text field.</label>
                                                <img className="questionImage" src={URL.createObjectURL( new Blob([Buffer.from(question.question, "base64").buffer], { type: 'image/jpg' }) )} alt="generated question"/>
                                                <label  className="answerTag" htmlFor="answer">Answer:</label>
                                                <input className="input" type="text" autocomplete="off" name="answer" placeholder="Sample answers: apple, 4, cake" value={answer} onChange={e => setAnswer(e.target.value)}/>
                                                <div className="buttonParent">
                                                    <button className="nextButton" type="submit">NEXT</button>
                                                </div>
                                            </div>
                                        </form>
                                    : ''}
                                </div>
                            </div>
                        </div>
                    : null }
                    { ( info ) ? 
                        <div className="c-content">
                            <div className="modal-backdrop" onClick={() => {
                                setInfo(false);
                            }}></div>
                            <div className={`modal-content info-content ${(info ? 'fadein-animation' : '')}`}>
                                <span className="close" onClick={() => {
                                    setInfo(false); 
                                }}>
                                    &times;
                                </span>
                                <h1 className="kaptcha-info title">Welcome to Kaptcha!</h1>
                                <p className="kaptcha-info">Kaptcha is a Captcha service that validates if you are a human or a robot, but mainly focuses on filtering out spam bots. To pass the test, follow the instruction to answer the question and provide the answer in the given text-field.</p>
                            </div>
                        </div>
                    : null }
                </div> 
            : <p className="page-load">Loading...</p> }
        </>
    );
}
 
export default Captcha;