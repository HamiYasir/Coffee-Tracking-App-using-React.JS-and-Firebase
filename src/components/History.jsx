import { useAuth } from "../context/AuthContext";
import { calculateCurrentCaffeineLevel, coffeeConsumptionHistory, getCaffeineAmount, timeSinceConsumption } from "../utils";

export default function History(){
    const { globalData } = useAuth()

    return(
        <>
            <div className="section-header">
                <i className="fa-solid fa-timeline"/>
                <h2>History</h2>
            </div>
            <p><i>Hover for more information!</i></p>
            <div className="coffee-history">
                {/* CoffeeConsumptionHistory is an object. We are turing it into an array using Object.keys in order to map through it */}
                {Object.keys(globalData).sort((a,b)=>b-a).map((utcTime, coffeeIndex)=>{
                    const coffee = globalData[utcTime]
                    const timeSinceConsume = timeSinceConsumption(utcTime) // Will return time in a formatted style
                    const originalAmount = getCaffeineAmount(coffee.name)
                    const remainingAmount = calculateCurrentCaffeineLevel({[utcTime]: coffee})

                    const summary = `${coffee.name} | ${timeSinceConsume} | ₹${coffee.cost} | ${remainingAmount}mg / ${originalAmount}mg`

                    return(
                        <div title={summary} key={coffeeIndex}>
                            <i className="fa-solid fa-mug-hot"/>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

// Object.keys(CoffeeConsumptionHistory) will return an array of keys from the object CoffeeConsumptionHistory
// .sort((a,b)=>b-a) will sort the elements in descending order