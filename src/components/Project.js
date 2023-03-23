import React from 'react'
import Nav_Bar from './Nav_Bar'
import data from '../data/powerplant.json'
import {PolarArea} from 'react-chartjs-2';
import { useState } from 'react';
import './Style/Project.css'


export default function Project() {
    const label_of_energy = [];
    const sum_of_all_energy = [];
    const label_country = [];
    const sum_of_country_produce_energy = [];
    const [number, setNumber] = useState(10);
    const [data_country, setData_country] = useState([]);
    const [sum_of_top_country, setSum_of_top_country] = useState([]);
    const [first, setFirst] = useState(true);
    const [btn_plus_country, setbtn_plus_country] = useState(false);
    const [btn_minus_country, setbtn_minus_country] = useState(false);

    data.forEach((item) => { // put the primary_fuel into the label_of_energy array and remove duplicates
        if (! label_of_energy.includes(item.primary_fuel)) {
            label_of_energy.push(item.primary_fuel);
            sum_of_all_energy.push(0);
        }
        if(! label_country.includes(item.country_long)){
            label_country.push(item.country_long);
            sum_of_country_produce_energy.push(0);
        }
    });

    
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < label_of_energy.length; j++) {
            if (data[i].primary_fuel === label_of_energy[j]) {
                sum_of_all_energy[j] += Math.log10(data[i].capacity_mw);
            }
        }
        for (let j = 0; j < label_country.length; j++) {
            if (data[i].country_long === label_country[j]) {
                sum_of_country_produce_energy[j] += data[i].capacity_mw;
            }
        }
    }
    
    if( first ){
    let temp1 = [];
    let temp2 = [];
     for(let i = 0; i < number; i++){
            temp1.push(label_country[i]);
            temp2.push(sum_of_country_produce_energy[i]);
        }
        setData_country(temp1);
        setSum_of_top_country(temp2);
        setFirst(false);
    }

if(btn_minus_country || btn_plus_country){
        let temp = number;
        if(btn_minus_country){
            if(temp < label_country.length && temp > 10){
                temp = temp - 10;  
            }
            if(temp === label_country.length){
                temp = temp - (temp % 10);
            }
            setbtn_minus_country(false);
        }
        if(btn_plus_country){
            if(temp < label_country.length && number >= 10){
                temp = number + 10;
            }
            if(label_country.length - temp < 10){
                temp =  label_country.length;
            }
            setbtn_plus_country(false);
        }

        let temp1 = [];
        let temp2 = [];
        for(let i = 0; i < temp; i++){
            temp1.push(label_country[i]);
            temp2.push(sum_of_country_produce_energy[i]);
        }
        setData_country(temp1);
        setSum_of_top_country(temp2);
        setNumber(temp);
        console.log(temp)
    }


        



    const config = {
        type: 'polarArea',
        data: {
            // set the label_of_energys to the primary_fuel
            labels: [label_of_energy[0], label_of_energy[1], label_of_energy[2], label_of_energy[3], label_of_energy[4], label_of_energy[5], label_of_energy[6], label_of_energy[7], label_of_energy[8], label_of_energy[9], label_of_energy[10], label_of_energy[11], label_of_energy[12], label_of_energy[13], label_of_energy[14] ],
            datasets: [
                {
                    label: 'Energy Production',
                    data: sum_of_all_energy,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                        'rgba(255, 0, 0, 0.5)',
                        'rgba(255, 255, 0, 0.5)',
                        'rgba(0, 255, 0, 0.5)',
                        'rgba(0, 255, 255, 0.5)',
                        'rgba(0, 0, 255, 0.5)',
                        'rgba(222, 155, 244, 0.5)',
                        'rgba(23, 144, 232, 0.5)',
                        'rgba(155, 23, 204, 0.5)',
                        'rgba(128, 128, 128, 0.5)',

                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                        'rgba(255, 0, 0, 0.5)',
                        'rgba(255, 255, 0, 0.5)',
                        'rgba(0, 255, 0, 0.5)',
                        'rgba(0, 255, 255, 0.5)',
                        'rgba(0, 0, 255, 0.5)',
                        'rgba(222, 155, 244, 0.5)',
                        'rgba(23, 144, 232, 0.5)',
                        'rgba(155, 23, 204, 0.5)',
                        'rgba(128, 128, 128, 0.5)',

                    ],
                    tension: 0.1

                }
            ]

        },
        options: { 

            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: ''
                    

                }
            }

        }
    }
        const config2 = {
            type: 'polarArea',
            data: {
                // set the label_of_contry top 10
                labels:  data_country ,
                datasets: [
                    {
                        label: 'Energy Production',
                        data: sum_of_top_country,
            }]
        }
    }
    return (
        <div>
            <Nav_Bar/>
            <div className='container'>
                <br/><br/>
                <center>
                <div className='container-xl'>
                    <h2>All capacity_mw with log(10) of Energy Produced by Fuel Type around the World</h2>
                    <div className='container-sm'>
                        <div className='container-sm'>
                            <div className='container-sm'>
                                <div className='container-sm chart'>
                                    <PolarArea data={
                                            config.data
                                        }
                                        options={
                                            config.options
                                        }/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </center>
            </div>
            <center>
            <div className='container'>
                <br/><br/><br/><br/>
                    <h2>Top {number} Country Most Product Electric Energy</h2>
                    <br/>
                    <button className='btn btn-success' onClick={() => setbtn_plus_country(true)}>more Country</button> &nbsp; &nbsp; &nbsp;
                    <button className='btn btn-danger' onClick={() =>  setbtn_minus_country(true)}>less Country</button>
                    <div className='container-sm'>
                        <div className='container-sm'>
                            <div className='container-sm'>
                                <div className='container-sm chart'>
                                    <PolarArea data={
                                            config2.data
                                        }
                                        options={
                                            config.options
                                        }/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </center>
        </div>
    )
}
