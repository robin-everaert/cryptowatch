import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GlobalChart from './components/GlobalChart';
import Summary from './components/Summary';
import Table from './components/Table';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {

  /**
   * Datas globales utilisées dans graphiques + tableau :
   */
  const [coinsData, setCoinsData] = useState([]);
  useEffect(() => {
    if(!localStorage.coinList) {
      localStorage.setItem("coinList", []);
    }
    axios
    .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y')
    .then((res) => setCoinsData(res.data)) 
    
    /**
     * Nav Bar Scroll :
     */

    let mediaDekstop = window.matchMedia("(min-width: 1025px)");
    let mediaTablette = window.matchMedia("(min-width: 768px) and (max-width: 1024px)");
    let mediaMobile = window.matchMedia("(max-width: 768px)");

    window.addEventListener("scroll", () => {
      if( mediaDekstop.matches && window.scrollY > 1100) {
        document.querySelector(".table-header").classList.add('active');
      } 
      else if(mediaTablette.matches && window.scrollY > 650) {
        document.querySelector(".table-header").classList.add('active');
      }
      else if(mediaMobile.matches && window.scrollY > 800) {
        document.querySelector(".table-header").classList.add('active');
      }
      else {
        document.querySelector(".table-header").classList.remove('active');
      }
    })
  }, []);

  return (
    
    <div className="app-contain">

      <header>
        <Header />
        <Summary />
        <GlobalChart coinsData={ coinsData } /> 
      </header>

      <Table coinsData={ coinsData } />
      
      <Footer />

    </div>
  );
};

export default App;

