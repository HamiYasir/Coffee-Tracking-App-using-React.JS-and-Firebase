export default function Layout(props){
    const {children} = props;

    const header = (
        <header>
            <div>
                <h1 className="text-gradient">CoffeeGO</h1>
                <p>Track your Coffee!</p>
            </div>
            <button>
                <p>Sign up for free</p>
                <i className="fa-solid fa-mug-hot"></i>
            </button>
        </header>
    )

    const footer = (
        <footer>
            <p>
                <span className="text-gradient">CoffeeGO</span> was made by <a target="_blank" href="https://github.com/HamiYasir/Coffee-Tracking-App-using-React.JS-and-Firebase">Hami Yasir</a> using the <a target="_blank" href="https://www.fantacss.smoljames.com">FantaCSS</a>design library.
            </p>
        </footer>
    )

    return(
        <>
            {header}
            <main>
                {children}
            </main>
            {footer}
        </>
    )
}