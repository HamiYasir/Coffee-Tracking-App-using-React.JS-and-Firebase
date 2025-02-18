import { useState } from 'react'

import Modal from './Modal'
import Authentication from './Authentication'

export default function Layout(props){
    const {children} = props;

    const [showModal, setShowModal] = useState(false)

    const header = (
        <header>
            <div>
                <h1 className="text-gradient">CoffeeGO</h1>
                <p>Track your Coffee!</p>
            </div>
            <button onClick={()=>{setShowModal(true)}}>
                <p>Sign up for free</p>
                <i className="fa-solid fa-mug-hot"></i>
            </button>
        </header>
    )

    const footer = (
        <footer>
            <p>
                <span className="text-gradient">CoffeeGO</span> was made by <a target="_blank" href="https://github.com/HamiYasir">Hami Yasir</a> using the <a target="_blank" href="https://www.fantacss.smoljames.com">FantaCSS</a>design library.<br/>
                Check out the project on <a target="_blank" href="https://github.com/HamiYasir/Coffee-Tracking-App-using-React.JS-and-Firebase">GitHub</a>
            </p>
        </footer>
    )

    return(
        <>
            {showModal && (            
                <Modal handleCloseModal={()=>{setShowModal(false)}}>
                    <Authentication/>
                </Modal>
            )}
            {header}
            <main>
                {children}
            </main>
            {footer}
        </>
    )
}