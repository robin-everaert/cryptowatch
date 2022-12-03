import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PercentChange from './PercentChange';

const Summary = () => {

    const [summaryData, setSummaryData] = useState([]);

    useEffect(() => {
        
        axios
        .get('https://api.coingecko.com/api/v3/global')
        .then((res) => setSummaryData(res.data.data));
    }, []);

    return (

        <div className="summary-container">
                       
              <h2>Synthèse:</h2>
                
                <div className="global-mkt">
                    <img src="./assets/check.svg" alt="" />
                    Global Market Cap: 
                    <PercentChange percent={ summaryData.market_cap_change_percentage_24h_usd }/>
                </div>
                <p>
                <img src="./assets/check.svg" alt="" />
                    Crypto-Monnaies: { " " } 
                    { summaryData.active_cryptocurrencies && 
                    summaryData.active_cryptocurrencies.toLocaleString() }
                </p>
                <p>
                    <img src="./assets/check.svg" alt="" />
                    Marchés: { " " } 
                    { summaryData.markets && 
                    summaryData.markets }
                </p>
                
                <p>
                    <img src="./assets/check.svg" alt="" />
                    BTC dominance: {" "}
                    { summaryData.market_cap_percentage &&
                      summaryData.market_cap_percentage.btc.toFixed(1) + "%" } 
                </p>
                <p>
                    <img src="./assets/check.svg" alt="" />
                    ETH dominance: {" "}
                    { summaryData.market_cap_percentage &&  
                      summaryData.market_cap_percentage.eth.toFixed(1) + "%" } 
                </p>  
    
        </div>
    );
};

export default Summary;