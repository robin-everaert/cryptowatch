import React from 'react';

const Header = () => {
    return (
            <div className="header-top">
                <div className="container-img">
                   <img src="./logo512.png" alt="Le logo de react" />  
                   <img src="./redux.svg" alt="Le logo de redux" />  
                </div>
                <h1>CRYPTOWATCH</h1>
                <h2>React - Redux</h2>
    
            </div>         
    );
};

export default Header;