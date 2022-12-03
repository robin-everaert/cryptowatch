import React, { useState, useEffect } from 'react';
import TableLine from './TableLine';
import { useSelector } from 'react-redux';
import TableFilters from './TableFilters';

const Table = ({ coinsData }) => {

    const [rangeNumber, setRangeNumber] = useState(100); // Input => top;
    const [orderBy, setOrderBy] = useState(""); // Tri Tableau;
    const [searchCoin, setSearchCoin] = useState("");

    /**
     * Redux :
     */
    const showList = useSelector((state) => state.listReducer);
    const showStable = useSelector((state) => state.stableReducer);
    const showSearch = useSelector((state) => state.searchReducer);
    
    /**
     * Table input headet table :
     */
    const tableHeader = ["Prix", "MarketCap", "Volume", "1j", "1s", "1m", "Offre en circulation", "ATH"];

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
     * Search :
     */
    useEffect(() => {

        setSearchCoin(showSearch);
    }, [showSearch]);

    return (
        <div className="table-container">
          
            <TableFilters />

            <ul className="table-header">

                {/**
                * Container top : 
                */}
                <div className="range-container">
                    
                    <input className="number-range" type="text" value={ rangeNumber }
                    onChange={ (e) => setRangeNumber(e.target.value) } 
                    />
                    
                    <input className="input-range" type="range" min="1" max="250" value={ rangeNumber } 
                    onChange={ (e) => setRangeNumber(e.target.value)}
                    />
                </div>

                {/**
                * Input tri + logique tri : 
                */}
                { tableHeader.map((el) => (
                    <li key={ el } className={ el }>
                        <input type="radio" name="header-el" id={ el } 
                        defaultChecked={ el === orderBy || el === orderBy + "reverse" ? true : false }
                        onClick={ () => {
                            if(orderBy === el) {
                                setOrderBy(el + "reverse")
                            } else {
                                setOrderBy(el)
                            }                           
                        }}
                        />
                        <label htmlFor={ el }>{ el }</label>
                    </li>
                ))}
                
            </ul>

            {/**
            * Start Affichage Crypto : 
            */}
            { coinsData && coinsData
            .slice(0, rangeNumber)

           /**
            * Tri Liste :
            */
            .filter((coin) => {
            if (showList) {
              let list = window.localStorage.coinList.split(",");
              if (list.includes(coin.id)) {
                return coin;          
              } 
              } 
              else {
                return coin;
              }
            })

            /**
            * Tri Stable Coin :
            */
            .filter((coin) => {
              if(showStable) {
                return coin;
              } else {
                if(excludeCoin(coin.symbol)) {
                  return coin;
                }
              }
            })

            /**
            * Search 
            **/
            .filter( (coin) => {
              return coin.name.toLowerCase().includes(searchCoin);
            })

            /**
            * Tri :
            **/
            .sort((a, b) => {
              switch (orderBy) {
                case "Prix":
                  return b.current_price - a.current_price;
                case "Volume":
                  return b.total_volume - a.total_volume;
                case "MarketCap":
                  return b.market_cap - a.market_cap;
                case "1j":
                  return (
                    b.market_cap_change_percentage_24h -
                    a.market_cap_change_percentage_24h
                  );
                case "1s":
                  return (
                    b.price_change_percentage_7d_in_currency -
                    a.price_change_percentage_7d_in_currency
                  );
                case "1m":
                  return (
                    b.price_change_percentage_30d_in_currency -
                    a.price_change_percentage_30d_in_currency
                  );
                case "ATH":
                  return b.ath_change_percentage - a.ath_change_percentage;
                case "Offre en circulation": 
                  return (
                    b.circulating_supply - a.circulating_supply
                  );
                case "#reverse":
                  return a.market_cap - b.market_cap;
                case "Prixreverse":
                  return a.current_price - b.current_price;
                case "Volumereverse":
                  return a.total_volume - b.total_volume;
                case "MarketCapreverse":
                  return a.market_cap - b.market_cap;
                case "1jreverse":
                  return (
                    a.market_cap_change_percentage_24h -
                    b.market_cap_change_percentage_24h
                  );
                case "1sreverse":
                  return (
                    a.price_change_percentage_7d_in_currency -
                    b.price_change_percentage_7d_in_currency
                  );
                case "1mreverse":
                  return (
                    a.price_change_percentage_30d_in_currency -
                    b.price_change_percentage_30d_in_currency
                  );
                case "Offre en circulationreverse": 
                return (
                  a.circulating_supply - b.circulating_supply
                );

                case "ATHreverse":
                  return a.ath_change_percentage - b.ath_change_percentage;
              }
            })
            .map( (coin, index) => 
                <TableLine coin={ coin } index={ index } key={ index }  />
            )}
        </div>
    );
};

export default Table;