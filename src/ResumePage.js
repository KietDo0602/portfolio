import { useEffect } from "react";

const resumeURL = "https://firebasestorage.googleapis.com/v0/b/kietdo-580f0.appspot.com/o/KD1%20Official%20Resume.pdf?alt=media&token=abf59871-f436-4b84-a483-364b02a42ee4";

const ResumePage = () => {
    useEffect(() => {
        document.title="Kiet Do's Resume";
    })
    return (<>
    <style>
        {`
            * {
                overflow-y: hidden;
                margin: 0;
            }
        `}
    </style>
    <embed style={{width: "100vw", height: "100vh"}}src={resumeURL}/>
    </> );
}
 
export default ResumePage;