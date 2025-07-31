import React from 'react';
import StatsCard from './StatsCard';
import Properties from './Properties';
import { useState } from 'react-router-dom';
import body from './body';
import PropertyDetails from './PropertyDetails';
import { Home } from "lucide-react";


const DashboardContent = (props) => {
    const { category, name, city_village, rental_price_per_month} = props.data
    const categories = [
  "rental apartment",
  "commercial space",
  "plot",
  "villa"
];
    // const [redirect, pages] = useState('');
    // function hc(e){
    //     const r = e.target.value;
    //     pages((prev) =>({
    //         redirect : r
    //         <PropertyDetails
    //     }))
    // }
    return (
        <>
            <body />
            <span className="property-card">
                <StatsCard
                    iconBg="#dbeafe"
                    iconSvg={
                        <svg width="24" height="24" fill="none" stroke="#3b82f6" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M3 9.75L12 3l9 6.75M4.5 10.5v9a.75.75 0 0 0 .75.75h3.75V15a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v5.25h3.75a.75.75 0 0 0 .75-.75v-9">
                            </path>
                        </svg>
                    }
                    value={category}
                    title={`${name} - ${city_village}`}
                    change={rental_price_per_month ? rental_price_per_month : '-'}
                    changeType="positive"
                    /* onClick = { pages } */
                />
            </span>


        </>
    );
};


export default DashboardContent;