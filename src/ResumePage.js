import { useEffect } from "react";

const resumeURL = "https://firebasestorage.googleapis.com/v0/b/kietdo-580f0.appspot.com/o/resume.pdf?alt=media&token=16620916-df1a-45f0-9476-b0486cdf4e0b";

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