import React, { useState, useEffect } from 'react';
import colors from "../styles/_settings.scss"; 

const PercentChange = ({ percent }) => {

    const [color, setcolor] = useState();

    /**
     * Couleur chiffre si positif ou négatif :
     */
    useEffect(() => {
        if(percent) {
            if(percent >= 0) {
                setcolor(colors.green1);
            }
            else {
                setcolor(colors.red);
            }
        }
        else {
            setcolor(colors.white);    
        }   
    }, [percent]);

    return (
        <div>
            <p className="percent-change-container" style={{ color }}>
                { percent ? percent.toFixed(2) + "%" : "-" }
            </p>
        </div>
    );
};

export default PercentChange;