import React, { useState, useEffect } from 'react';

const StarIcon = ({ coinId }) => {

    const [like, setLike] = useState(false);

    /**
     * Gestion de l'étoile colonne gauche par LocaleStorage,
     * If favori => localeStorage (coinList) = étoile pleine
     * Else étoile vide :
     */
    useEffect(() => {

        if(window.localStorage.coinList) {
            let favList = window.localStorage.coinList.split(',');

            if(favList.includes(coinId)) {
                setLike(true);
            }
        }
       
    }, []);

    const idChecker = (id) => {
        let favList = null;   

        if(window.localStorage.coinList) { // Define favList Si coinList existe dans locale Storage:
            favList = window.localStorage.coinList.split(',');
        }

        if(favList) { // If favList existe:
            if(favList.includes(id)) { // If id dans favList:
                window.localStorage.coinList = favList.filter( (coin) => coin !== id); // If token => delete, else => add; 
                setLike(false); 
            } else { // Si id n'est pas dans favList:  
                window.localStorage.coinList = [...favList, coinId]; // == Push;
                setLike(true); 
            }
        } else { // Si fav List n'existe pas :
            window.localStorage.coinList = coinId;
            setLike(true);
        }
    }

    return (
        <img src={ like ? "./assets/star-full.svg" : "./assets/star-empty.svg"} alt="icon-star" width="20"
             onClick={ () => idChecker(coinId) }
        />  // étoile colonne gauche si true / false; 
    );
};

export default StarIcon;