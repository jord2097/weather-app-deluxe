import 'bootstrap/dist/css/bootstrap.min.css';
import './weathercard.css'
import React from 'react';
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'

function WeatherCard(props){
    const day = new Date(parseInt(props.dt) * 1000)
    const dayStrings = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const monthStrings = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const dayText = dayStrings[day.getDay(day)]
    const monthText = monthStrings[day.getMonth(day)]
    const date = day.getDate(day)
    const icon = `http://openweathermap.org/img/wn/${props.icon}@2x.png`

    const get24HrTime = ((sunrise) => {
        const unixconvert = new Date(parseInt(sunrise) * 1000)
        const hours = unixconvert.getHours()        
        const mins = unixconvert.getMinutes() < 10 ? '0' + unixconvert.getMinutes() : unixconvert.getMinutes()      
        return hours + ":" + mins
    })

    const minTemp = Math.round(props.min, 1)
    const maxTemp = Math.round(props.max, 1)
    const wind = Math.round(props.wind, 1)

    

    return (
    <>
        <Card className="mx-auto text-center mt-2">
            <Card.Header>{dayText}{" "}{date}{" "}{monthText}</Card.Header>
            <Card.Body>
                <Image className="mx-auto drop-shadow-xl contrast-75 " src={icon} alt={props.description}></Image>
                <Card.Text>{props.description} <hr /></Card.Text>
                {/* <Card.Text>Sunrise: {get24HrTime(props.sunrise)} BST</Card.Text>
                <Card.Text>Sunset: {get24HrTime(props.sunset)} BST</Card.Text> */}                
                <Card.Text>
                    <span className="wi wi-sunrise text-xl mr-2"></span>
                    {get24HrTime(props.sunrise)}/{get24HrTime(props.sunset)}
                    </Card.Text>
                <Card.Text>
                    <span className="wi wi-thermometer text-xl mr-2"></span>
                    {minTemp}/{maxTemp}°C 
                    </Card.Text>
                <Card.Text>
                    <span className="wi wi-strong-wind text-xl mr-2"></span>
                    {wind} m / s
                </Card.Text>
                
                
            </Card.Body>
        </Card>
    
    
    </>

    )
}

export default WeatherCard;