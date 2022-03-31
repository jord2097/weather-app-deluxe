import 'bootstrap/dist/css/bootstrap.min.css';
import './currentcard.css'
import './css/weather-icons.min.css'
import React from 'react';
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'

function CurrentCard(props) {
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
    const feelsLike = Math.round(props.feelsLike, 1)
    const wind = Math.round(props.wind, 1)

    return (
    <div className="shadow-xl rounded-lg h-auto overflow-hidden max-w-2xl m-auto divide-y-2 divide-light-blue-400">
        <div className="m-5">
            <div className="sm mt-6 my-10">
                <p className="tracking-tight text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-orange-700">{props.city}, {props.country}</p>
                <div className="flex flex-wrap my-2">
                <p className="flex-auto text-gray-500 tracking-wide font-bold">
                    {props.description}
                </p>
                <p className="text-gray-500 tracking-wide">
                    {dayText}{" "}{date}{" "}{monthText}
                </p>
                </div>               
            </div>
            <div className="flex my-6 h-auto tracking-wide">
                <div className="text-gray-500 text-left flex-auto m-auto">
                    <span className="text-5xl font-mono bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-red-700">{minTemp}/{maxTemp}°C</span>
                    <span className="mt-2 flex flex-col tracking-wide">feels like {feelsLike}°C</span>
                    {""}
                </div>
                <div>
                    <Image src={icon} alt={props.description} />
                </div>
            </div>
            <div className="flex my-2 text-gray-500">
                <span className="tracking-wide mr-4">
                    <span className="wi wi-strong-wind text-xl mr-2"></span>
                    {wind} m/s
                </span>
                <span className="tracking-wide">
                    <span className="wi wi-humidity text-xl mr-2"></span>
                    {props.humidity}%
                </span>                
            </div>
            <div className="flex my-2 text-gray-500">
                <span className="tracking-wide mr-4">
                    <span className="wi wi-sunrise text-xl mr-2"></span>
                    {get24HrTime(props.sunrise)}
                </span>
                <span className="tracking-wide">
                    <span className="wi wi-sunset text-xl mr-2"></span>
                    {get24HrTime(props.sunset)}
                </span>                
            </div>
        </div>
        
    </div>  






    /* <p className="heading">{props.city}, {props.country}</p>
    <p className="subheading">{props.description}</p>
    <Card.Text>{dayText}{" "}{date}{" "}{monthText}</Card.Text>
    <Card.Text>{minTemp}/{maxTemp}°C </Card.Text> 
    <Image className="mx-auto" src={icon} alt={props.description}></Image>
    <Card.Text>Sunrise: {get24HrTime(props.sunrise)} BST</Card.Text>
    <Card.Text>Sunset: {get24HrTime(props.sunset)} BST</Card.Text>                               
    <Card.Text>Wind Speed: {wind}mph</Card.Text>      */
    )
}

export default CurrentCard