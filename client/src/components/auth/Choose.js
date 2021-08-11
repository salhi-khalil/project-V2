import React from 'react';
import { Link} from 'react-router-dom';


const Choose = ()=> {
        
    return (
        <section className="landing-area">
        <div className="chosen">
            <div className="landing-area-inner">
                <h1 className="x-large">Welcome Again  Visitor</h1>  
                <div className="buttons">
                    <Link to="/register" className=" button button-primary">ARE YOU A DOCTOR ?</Link>
                    <Link to="/register" className="button button-light">OR A PATIENT ?</Link>
                </div>
            </div>
        </div>
    </section>
    )
}


;

export default Choose
