import React, {useState} from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import data from '../data/data.json'
import {Line} from 'react-chartjs-2';
import Chart from 'chart.js/auto';




export default function Homework() {
    const [value, setValue] = React.useState([70, 90]);
    let [label, setLabel] = React.useState([])
    const [graph_data, setgraph_data] = useState(data)
    const [first, setFirst] = useState(true);
    const handleChange = (event, newValue) => {
        
        setValue(newValue);
        let temp = data.filter((item) => {
            return item.Year >= newValue[0] && item.Year <= newValue[1]
        })
        let temp1 = [];
        for(let i = newValue[0]; i <= newValue[1]; i++){
            temp1.push(i.toString())
        }
        setLabel(temp1);
        setgraph_data(temp)
       
    };
    
    if(first) {
        setgraph_data(data)
        let temp = [];
        for(let i = value[0]; i <= value[1]; i++){
            temp.push(i.toString())
        }
        setLabel(temp);
        setFirst(false)
    }

    

    
    let config = {
        type: 'line',
        data: {
            labels: label,
            datasets: [{
                label: ['Horsepower'],
                data: graph_data.map((item) => item.Horsepower),
                fill: false,
                backgroundColor: 'rgb(255, 0, 0)',
                borderColor: 'rgb(255, 0, 0)',
                tension: 0.1
            }, {
                label: 'Miles_per_Gallon',
                data: graph_data.map((item) => item.MPG),
                fill: false,
                backgroundColor: 'rgb(0, 255, 0)',
                borderColor: 'rgb(0, 255, 0)',
                tension: 0.1
            },
            {
                label: 'cylinders',
                data: graph_data.map((item) => item.Cylinders),
                fill: false,
                backgroundColor: 'rgb(0, 0, 255)',
                borderColor: 'rgb(0, 0, 255)',
                tension: 0.1
            }]
            
        }
    }



    function valuetext(value) {
        return `${value}°C`;
    }
    let text = value

    return (
        <div className='container'>
            <center>
                <br/>
            <h1>Graph Horsepower / Miles per Gallon / Cylinders</h1>
            <div className='container'>
            <Box sx={
                {width: 500}
            }>
              <br/><br/>  
            <h2>Select Year</h2>
            <br/>
                <Slider getAriaLabel={
                        () => 'Temperature range'
                    }
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    min={70}
                    max={90}/>
            </Box>
            </div>
            <br/>
            <br/>
            <Line data={config.data} options={config.options}/>
            </center>
        </div>
    )
}
