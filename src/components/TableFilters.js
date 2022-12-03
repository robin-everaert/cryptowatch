import React, { useState, useEffect } from 'react';
import { setStableState } from '../actions/stable.action';
import { setListDisplay } from '../actions/list.action';
import { setSearch } from '../actions/search.action';
import { useDispatch } from 'react-redux';

const TableFilters = () => {

    const [showStable, setShowStable] = useState(true);
    const [showFavList, setShowFavList] = useState(false);
    const [showSearch, setShowSearch] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setStableState(showStable));
        dispatch(setListDisplay(showFavList));
        dispatch(setSearch(showSearch));
    }, [showStable, showFavList, showSearch]);

    return (
        <div className="table-filters">

                <button onClick={ () => setShowFavList(!showFavList) } >{ showFavList ? "Masquer vos favoris" : "Afficher vos favoris" }</button>               
                <button onClick={ () => setShowStable(!showStable) } className="show-stable">{ showStable ? "Avec Stable Coin" : "Sans Stable Coin" }</button>
                <div className="search-coin-container">
                    <input type="text" onChange={ (e) => setShowSearch(e.target.value) } placeholder="Chercher par monnaie: " />   
                </div>
                  
        </div>
    );
};

export default TableFilters;