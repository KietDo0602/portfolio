import './NotFoundPage.css';
import { useEffect } from 'react';
import {Link} from 'react-router-dom';

  

export default function NotFoundPage() {
    useEffect(() => {
        document.title="Error"
    })
    return(
        <div className="notFoundPage">
            <div className="notFoundContainer">
                <h1>404</h1>
                <Link to="/"><p> RETURN TO HOME PAGE </p></Link>
            </div>
        </div>
    )
}