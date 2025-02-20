import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Authentication(props){
    const { handleCloseModal } = props
    const [isRegistration, setIsRegistration] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [error, setError] = useState(null)

    // Bring in authentication handlers from AuthContext. useAuth is a custom hook 
    const { signup, login } = useAuth()

    async function handleAuthenticate(){
        if(!email || !email.includes('@') || !password || password.length < 6 || isAuthenticating){return}

        try{
            setIsAuthenticating(true)
            setError(null)
            if(isRegistration){
                // register a user
                await signup(email, password)
            }else{
                // login
                await login(email, password)
            }
            handleCloseModal()
        }catch(err){
            setError(err.message)
            console.log(err.message)
        }finally{
            setIsAuthenticating(false)
        }
    }

    return(
        <>
            <h2 className="sign-up-text">{(isRegistration? 'Sign Up' : 'Login')}</h2>
            <p>{(isRegistration ? 'Create an account' : 'Sign in to your account')}</p>
            {error && (
                <p>
                    {error}
                </p>
            )}
            <input value={email} onChange={(event)=>{setEmail(event.target.value)}} placeholder="Email"/>
            <input value={password} onChange={(event)=>{setPassword(event.target.value)}} placeholder="******" type="password"/>
            <button onClick={handleAuthenticate}>
                <p>{(isAuthenticating ? (isRegistration ? 'signing up...' : 'logging in...' ) : 'Submit')}</p>
            </button>
            <hr/>
            <div className="register-content">
                <p>{(isRegistration ? 'Already have an account?' : 'Don\'t have an account?')}</p>
                <button onClick={()=>{setIsRegistration(!isRegistration)}}>
                    <p>{(isRegistration? 'Sign In' : 'Sign Up')}</p>
                </button>
            </div>
        </>
    )
}