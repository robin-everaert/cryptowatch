import React, { useState, useEffect } from 'react';
import CoinChart from './CoinChart';
import PercentChange from './PercentChange';
import StarIcon from './StarIcon';
import colors from "../styles/_settings.scss"; 
/* import LinesChart from './LinesChart'; */

const TableLine = ({ coin, index }) => {

    /**
     * Affichage graphique au survol :
     */
    const [showChart, setShowChart] = useState(false);

    /**
     * Formatage des prix en fonction de nombre de centime :
     * Formule trouvée sur StackOverflow :  
    **/

     const priceFormater = (number) => {
        if (Math.round(number).toString().length < 4) {
          return new Intl.NumberFormat("us-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 7,
          }).format(number);
        } else {
          return number;
        }
      };

    /**
     * Formatage Maket Cap pour arrondir en milliard $ :
    */
    const mktcapFormater = (number) => {
        
        let newNumber = String(number) // String pour pouvoir manipuler;
        .split("") // Nombre sous forme de tableau;
        .slice(0, -6); // Retire les 6 derniers chiffres du nombre pour arrondir au milliard;
         
        return Number(newNumber.join(""));
    }

    return (
        
        <div className="table-line">

            { /* 
            * Colonne left => icone + nom etc; 
            **/}
            <div className="infos-container"> 
                <span><StarIcon coinId={ coin.id } /></span> { /* Etoile */}
                <p>{ index + 1 }</p>
                <div className="img">
                    <img src={ coin.image } height="20" alt="" />
                </div>
                <div className="infos">
                    <div className="chart-img" 
                    onMouseEnter={ () => setShowChart(true) }  // Affichage graphique; 
                    onMouseLeave={ () => setShowChart(false) }  // Disparition graphique;
                    >
                        <img src="./assets/chart-icon.svg" alt="Chart-icon" />
                        <div className="chart-container" id={ coin.name }>
                            { showChart && <CoinChart coinId={ coin.id } coinName={ coin.name } /> }
                        </div>
                    </div>   
                    <h4>{ coin.name }</h4> 
                    <span className="coin-symbol">- { coin.symbol.toUpperCase() }</span>
                    <a target="_blank" 
                       href={ "https://www.coingecko.com/fr/pi%C3%A8ces/" + coin.name.toLowerCase().replace(" ", "-").replace(" ", "-").replace(" ", "-") }
                    >
                        <img src="./assets/info-icon.svg" alt="Info Icon" />
                    </a>
                </div>
            </div>
            { /**
            * Start Affichage Ligne du tableau :
            **/}
            <p>{ priceFormater(coin.current_price).toLocaleString() } $</p> { /* Prix */}
            <p className="mktcap">{ mktcapFormater(coin.market_cap).toLocaleString() } M$ </p> { /* MarketCap */}
            <p className="volume">{ coin.total_volume.toLocaleString()} $</p> { /* Volume */}
            {/* <PercentChange percent={ coin.price_change_percentage_1h_in_currency } /> */} { /* 1 heure */}
            <PercentChange percent={ coin.price_change_percentage_24h } /> { /* 1 jours */}
            <PercentChange percent={ coin.price_change_percentage_7d_in_currency } /> { /* 1 semaine */}
            <PercentChange percent={ coin.price_change_percentage_30d_in_currency } /> { /* 1 mois */}
            
            <p className="p-circu">{ coin.circulating_supply.toLocaleString() }</p>
            { /*
            * ATH => Si record atteint sur une monnaie
            * On signale à l'utilisateur L'ATH : 
            */}
            { coin.ath_change_percentage > -3 ? (   
                <p style={{ color: 'green' }}>ATH !</p>
            ) : (
                <div className="p-ath">{ <PercentChange percent={ coin.ath_change_percentage } /> }</div> 
            )}       
            
        </div>

    );
};

export default TableLine;