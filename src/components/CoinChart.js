import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import colors from "../styles/_settings.scss"; 

const CoinChart = ({ coinId, coinName }) => {

        const [duration, setDuration] = useState(30); // Durée graphique => initial = 30j;
        const [coinData, setCoinData] = useState(); // data token unique;

        /**
         * Tableau bouton graphique:
         */
        const headerData = [
          [1, "1 jour"],
          [3, "3 jours"],
          [7, "7 jours"],
          [30, "1 mois"],
          [91, "3 mois"],
          [181, "6 mois"],
          [365, "1 an"],
          [3000, "Max"],
        ];

        /**
         * Get Data pour le graphique :
         */
        useEffect(() => {
    let dataArray = [];

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${duration}${
          duration > 32 ? "&interval=daily" : ""
        }`
      )
      .then((res) => {
        for (let i = 0; i < res.data.prices.length; i++) {
          let price = res.data.prices[i][1];

          dataArray.push({
            date: new Date(res.data.prices[i][0]).toLocaleDateString(),
            price: price < "50" ? price : parseInt(price),
          });
        }
        setCoinData(dataArray);
      });
  }, [coinId, duration]);

    return (
        <div className="coin-chart">
            <p>{ coinName }</p>

            { /* 
            * Btn du graphique,
             */ }
            <div className="btn-container"> 
                { headerData.map( (el) => {
                    return (
                        <div  
                        key={ el[0] }
                        htmlFor={ "btn" + el[0] }
                        onClick={ () => setDuration(el[0]) }
                        className={ el[0] === duration ? "active-btn" : "" }
                        >
                            { el[1] }
                        </div>
                    )
                })}
            </div>
            
            {/**
            * Start Graphique :
             */}
            <AreaChart 
            width={ 680 }
            height={ 250 }
            data={ coinData }
            margin={{ top: 10, left: 100, right: 0, bottom: 0}} >

                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="7%" stopColor={colors.colorPrimary} stopOpacity={0.8} />
                        <stop offset="93%" stopColor={colors.colorPrimary} stopOpacity={0} />
                    </linearGradient>
                </defs>
                
                <XAxis dataKey="date" />
                <YAxis domain={ ["auto", "auto"] } />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area 
                type="monotone" 
                dataKey="price" 
                stroke={ colors.colorPrimary } 
                fillOpacity={ 1 } 
                fill="url(#colorUv" /> 
            </AreaChart>

        </div>
    );
};

export default CoinChart;