import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'
import {
    GoogleAuthProvider, createUserWithEmailAndPassword, getAuth,
    onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword,
    signInWithPopup, signOut, updateProfile
} from 'firebase/auth'
import axios from 'axios'
import { app } from '../firebase/firebase.config'
import Swal from 'sweetalert2'
export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const resetPassword = email => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }

    const logOut = async () => {
        setLoading(true)
        await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
            withCredentials: true,
        })

        Swal.fire({
            title: 'Logged out successfully',
            icon: 'success',
            confirmButtonText: 'Ok',
        })
        return signOut(auth)
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }

    // Get token from server
    const getToken = async email => {
        const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            { email },
            { withCredentials: true }
        )
        return data
    }

    // save user to the database
    const saveUser = async user => {
        const currentUser = {
            name: user?.displayName,
            email: user?.email,
            role: 'student',
            status: 'Verified',
        }

        const { data } = await axios.put(
            `${import.meta.env.VITE_API_URL}/user`,
            currentUser,
        )
        return data
    }


    // onAuthStateChange
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if (currentUser) {
                getToken(currentUser.email)
                    .then(() => saveUser(currentUser))
                    .catch(err => console.error(err))
            }
            setLoading(false)
        })
        return () => {
            return unsubscribe()
        }
    }, [])

    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        signIn,
        signInWithGoogle,
        resetPassword,
        logOut,
        updateUserProfile,
    }

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node
}

export default AuthProvider
