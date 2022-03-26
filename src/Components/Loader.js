import './Loader.css';
import { TailSpin } from  'react-loader-spinner'

const Loader = () => {
    return ( <div className="loader">
        <div className="tailSpin">
            <TailSpin color="black" height={100} width={100} />
        </div>
    </div> );
}
 
export default Loader;