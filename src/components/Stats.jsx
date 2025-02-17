import { calculateCoffeeStats, calculateCurrentCaffeineLevel, coffeeConsumptionHistory, getTopThreeCoffees, statusLevels } from "../utils"

function StatCard(props){
    const { large, title, children } = props
    return(
        <div className={'card stat-card '+(large ? ' col-span-2' : ' ')}>
            <h4>{title}</h4>
            {children}
        </div>
    )
}

export default function Stats(){
    const stats = calculateCoffeeStats(coffeeConsumptionHistory)

    const caffineLevel = calculateCurrentCaffeineLevel(coffeeConsumptionHistory)
    const warningLevel = caffineLevel < statusLevels['low'] ? 'low' : 
                        caffineLevel < statusLevels['moderate'] ? 'moderate' : 'high'


    return(
        <>
            <div className="section-header">
                <i className="fa-solid fa-chart-simple"/>
                <h2>Stats</h2>
            </div>
            <div className="stats-grid">
                <StatCard large title="Active Caffine Level">
                    <div className="status">
                        <p><span className="stat-text">{caffineLevel}</span>mg</p>
                        <h5 style={{ color: statusLevels[warningLevel].color, background: statusLevels[warningLevel].background }}>{warningLevel}</h5>
                    </div>
                    <p>{statusLevels[warningLevel].description}</p>
                </StatCard>
                <StatCard title="Daily Caffine">
                    <p><span className="stat-text">{stats.daily_caffeine}</span>mg</p>
                </StatCard>
                <StatCard title="Avg # of Coffees">
                    <p><span className="stat-text">{stats.average_coffees}</span></p>
                </StatCard>
                <StatCard title="Daily Cost (₹)">
                    <p>₹ <span className="stat-text">{stats.daily_cost}</span></p>
                </StatCard>
                <StatCard title="Total Cost (₹)">
                    <p>₹ <span className="stat-text">{stats.total_cost}</span></p>
                </StatCard>
            </div>
            <table className="stat-table">
                <thead>
                    <tr>
                        <th>Coffee Names</th>
                        <th>Number of Purchases</th>
                        <th>Percentage of Total</th>
                    </tr>
                </thead>
                <tbody>
                    {getTopThreeCoffees(coffeeConsumptionHistory).map((coffee, coffeeIndex)=>{
                        return(
                            <tr key={coffeeIndex}>
                                <td>{coffee.coffeeName}</td>
                                <td>{coffee.count}</td>
                                <td>{coffee.percentage}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}