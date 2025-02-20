// Context is just another react hook.
/*Context is mainly useful when you want to send info between components at the same level or from a component of lower level
to upper level. The downside of Context is that they become less efficient the more they are used. So try to use them globally 
while minimizing their span*/

import { useState, useEffect, useContext, createContext } from 'react'
import { auth, db } from '../../firebase'
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore' //Firebase methods

const AuthContext = createContext()

// Custom hook through which context can be accessed from
export function useAuth(){
    return useContext(AuthContext)
}

// In this project, this context will be used to provide authentication to the user from firebase
export function AuthProvider(props){
    const { children } = props;
    const [globalUser, setGlobalUser] = useState(null)
    const [globalData, setGlobalData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    // Authentication handlers
    function signup(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function resetPassword(email){
        return sendPasswordResetEmail(auth, email)
    }

    function logout(){
        setGlobalUser(null)
        setGlobalData(null)
        return signOut(auth);
    }

    const value = { globalUser, globalData, setGlobalData, isLoading, setIsLoading, signup, login, logout }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, async (user)=>{ 
            console.log('CURRENT USER: ', user)
            setGlobalUser(user)
            // If there is no user, empty the user state and return from this listener
            if(!user){
                console.log('No active user')
                return
            }
            // If there is a user, then check if the user has data in the database, and if they do, then fetch said data and update the global state
            try{
                setIsLoading(true)

                // First we create a reference for the document (lablled json object)
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef) // Take a snap of current document to see if there is anythin there

                let firebaseData = {}
                if(docSnap.exists()){
                    console.log('Found user data')
                    firebaseData = docSnap.data()
                }
                setGlobalData(firebaseData)
            }catch(err){
                console.log(err.message)
            }finally{
                setIsLoading(false)
            }
        }) // The function onAuthStateChanged will listen for all the events such as signup, login, logout
        return unsubscribe // For cleaup when closing the app
    }, [])

    return(
        // Any props passed into AuthContext will become a global variable
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )   
}
