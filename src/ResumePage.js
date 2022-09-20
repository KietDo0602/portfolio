import { useEffect } from "react";

const resumeURL = "https://firebasestorage.googleapis.com/v0/b/kietdo-580f0.appspot.com/o/Official%20Resume.pdf?alt=media&token=31a893fd-5723-442d-8df5-59691a09bb78";

const ResumePage = () => {
    useEffect(() => {
        document.title="Kiet's Resume";
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