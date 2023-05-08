import { useEffect } from "react";

const resumeURL = "https://firebasestorage.googleapis.com/v0/b/kietdo-580f0.appspot.com/o/OfficialResume.pdf?alt=media&token=810d9860-229c-47ce-8f52-b22729cc2cfb";

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