import React, { useState, useEffect } from 'react';
import { Treemap, Tooltip } from "recharts";
import colors from "../styles/_settings.scss";


const GlobalChart = ({ coinsData }) => {

    const [showTreemap, setShowTreemap] = useState(true);

    /**
     * Color Treemap :
     */
    const colorPicker = (number) => {
      if(number >= 20) {
            return colors.color1;
      } else if(number >= 5) {
            return colors.green2;
      }  else if(number >= 0) {
            return colors.green1;
      } else if(number >= -5) {
            return colors.red1;
      } else if(number >= -20) {
            return colors.red2;
      } else {
            return colors.black2;
      }
    }

    /**
     * Exclusion des Stables Coins :
     */
    const excludeCoin = (coin) => {
        if(
            coin === "usdt" || coin === "usdc" || coin === "busd" || coin === "ust" || coin === "dai" || coin === "tusd" || coin === "usdn" || 
            coin === "usdp" || coin === "fei" || coin === "gusd" || coin === "tribe" || coin === "frax" || coin === "lusd" || coin === "husd" ||
            coin === "rsr" || coin === "usdx" || coin === "xsgd" || coin === "eurs" || coin === "susd" || coin === "ousd" || coin === "cusd" ||
            coin === "qc" || coin === "vai" || coin === "sbd" || coin === "dgd" || coin === "musd" || coin === "rsd" || coin === "usdk" ||
            coin === "idrt" || coin === "bitcny" || coin === "eosdt" || coin === "xaur" || coin === "xchf" || coin === "dgx" || coin === "usnbt" ||
            coin === "ilt" || coin === "mim" || coin === "eurt" || coin === "alusd" || coin === "tor" || coin === "tryb" || coin === "xidr" ||
            coin === "mtr" || coin === "par" || coin === "ceur" || coin === "1gold" || coin === "zusd" || coin === "brcp" || coin === "coffin" ||
            coin === "usdb" || coin === "dpt" || coin === "mdo" || coin === "mds" || coin === "xusd" || coin === "kbc" || coin === "usdq" || 
            coin === "usdp"
        ) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Treemap :
     */
    const [dataArray, setDataArray] = useState([]);

    useEffect(() => {
        let chartData = [];

        if(coinsData.length > 0) {
            for(let i = 0; i < 50; i++) {
                if(excludeCoin(coinsData[i].symbol)) {
                    chartData.push({
                        name: coinsData[i].symbol.toUpperCase() + " " + coinsData[i].market_cap_change_percentage_24h.toFixed(2) + "%",
                        size: coinsData[i].market_cap,
                        fill: colorPicker(coinsData[i].price_change_percentage_24h),
                    });
                }   
            }
        }
        setDataArray(chartData);
    }, [coinsData]);

    /**
     * Valeur en Hover Treemap : 
     */
    const TreemapToolTip = ({ active, payload }) => {
        if(active && payload && payload.length) {

            return (
                <div className="custom-tooltip">
                    <p className="label">{ payload[0].payload.name }</p>
                </div>
            );
        }
        return null;    
    }

    return (
        <div className="global-chart">

            <h2>Treemap:</h2>
            <p>
                Une Treemap, aussi appelée carte à cases ou carte proportionnelle, est une technique de visualisation de données. Elle permet de visualiser les informations hiérarchisées en arborescence comme sur un diagramme en arbre. Les données sont organisées en branches et en sous-branches.
            </p>
            <p>
                La différence avec le diagramme en arbre est qu'une Treemap indique aussi la quantité associée à chaque catégorie. En effet, chaque catégorie est représentée par un rectangle dont la taille représente la quantité correspondante.
            </p>
            <button onClick={ () => setShowTreemap(!showTreemap) }>{ showTreemap ? "Masquer la treemap" : "Afficher la Treemap" }</button>

            { showTreemap && <Treemap
                width={ 1000 }
                height={ 181 }
                data={ dataArray }
                dataKey="size"
                stroke="rgb(51, 51, 51)"
                fill="#000"
                aspectRatio="3"
            >
            <Tooltip content={ <TreemapToolTip /> } />    
            </Treemap> 
            }
             
        </div>
    );
};

export default GlobalChart;