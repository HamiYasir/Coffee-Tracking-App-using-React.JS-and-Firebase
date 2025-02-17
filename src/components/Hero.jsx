// This is basically going to be the front door of your website

export default function Hero(){
    return(
        <>
            <h1>Coffee Tracking on the Go!</h1>
            <div className="benefits-lists">
                <h3 className="font-bolder">Try <span className="text-gradient">CoffeeGo!</span> and start...</h3>
                <ul>
                    <li>Tracking every coffee</li>
                    <li>Measuring your blood caffine levels</li>
                    <li>Costing and quantifying your addiction</li>
                </ul>
            </div>
            <div className="card info-card">
                <div>
                <i className="fa-solid fa-circle-info"></i>
                </div>
                <h5>Did you know?</h5>
                <p>
                    Caffeine has a half-life of about 5 hours in the average adult, 
                    meaning if you consume 200 mg of caffeine at 12 PM, about 100 mg 
                    will still be in your system by 5 PM.
                </p>
            </div>
        </>
    )
}