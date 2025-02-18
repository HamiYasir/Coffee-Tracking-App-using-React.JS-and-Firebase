import { coffeeOptions } from '../utils'
import { useState } from 'react'

import Modal from './Modal'
import Authentication from './Authentication'

export default function CoffeeForm(props){
    const { isAuthenticated } = props

    const [selectedCoffee, setSelectedCoffee] = useState(null)
    const [showCoffeeTypes, setShowCoffeeTypes] = useState(false)
    const [coffeeCost, setCoffeeCost] = useState(0)
    const [hour, setHour] = useState(0)
    const [minute, setMinute] = useState(0)
    const [showModal, setShowModal] = useState(false)

    function handleSubmitForm(){
        if(!isAuthenticated){
            setShowModal(true)
            return
        }
        console.log(selectedCoffee, coffeeCost, hour, minute);
    }

    return(
        <>
            {showModal && (
                <Modal handleCloseModal={()=>{setShowModal(false)}}>
                    <Authentication/>
                </Modal>
            )}
            
            <div className="section-header">
                <i className="fa-solid fa-pencil"/>
                <h2>Start Tracking Today</h2>
            </div>
            <h4>Select coffe type</h4>
            <div className="coffee-grid">
                {coffeeOptions.slice(0, 5).map((option, optionIndex)=>{
                    return(
                        <button onClick={()=>{
                                    setSelectedCoffee(option.name)
                                    setShowCoffeeTypes(false)
                                }} 
                                className={'button-card '+( option.name === selectedCoffee ? ' coffee-button-selected' : ' ')} 
                                key={optionIndex}>
                            <h4>{option.name}</h4>
                            <p>{option.caffeine}</p>
                        </button>
                    )
                })}
                <button onClick={()=>{
                            setShowCoffeeTypes(true)
                            setSelectedCoffee(null)
                        }} 
                        className={'button-card '+( showCoffeeTypes ? ' coffee-button-selected' : ' ')}>
                    <h4>Other</h4>
                    <p>N/A</p>
                </button>
            </div>
            {showCoffeeTypes && ( 
                <select onChange={(event)=>{setSelectedCoffee(event.target.value)}} id="coffeee-list" name="coffee-list">
                    <option value={null}>Select Type</option>
                    {coffeeOptions.map((option, optionIndex)=>{
                        return(
                            <option value={option.name} key={optionIndex}>
                                {option.name} ({option.caffeine}mg)
                            </option>
                        )
                    })}
                </select>
            )}
            <h4>Add the cost (₹)</h4>
            <input className="w-full" type="number" placeholder="15" value={coffeeCost} onChange={(event)=>{setCoffeeCost(event.target.value)}}/>
            <h4>Time since consumption</h4>
            <div className="time-entry">
                <div>
                    <h6>Hours</h6>
                    <select onChange={(event)=>{setHour(event.target.value)}} id="hour-select">
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((hour, hourIndex)=>{
                            return(
                                <option key={hourIndex}>{hour}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                <h6>Minutes</h6>
                    <select onChange={(event)=>{setMinute(event.target.value)}} id="mins-select">
                        {[0, 15, 30, 45].map((min, minIndex)=>{
                            return(
                                <option key={minIndex}>{min}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <button onClick={handleSubmitForm}>
                <p>Add Entry</p>
            </button>
        </>
    )
}