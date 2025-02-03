import { useState } from "react"
import { supabase } from "../lib/supabase"

export const SignIn = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSignIn = () => {
        supabase.auth.signInWithPassword({
            email: username,
            password: password
        })
    }
    return( 
        <div className="flex flex-col items-center justify-center h-screen gap-2">
            <h1 className="text-2xl font-bold">Sign In</h1>
            <input className="border border-gray-300 rounded-md p-2" type="text" placeholder="Email" onChange={(e) => setUsername(e.target.value)} />
            <input className="border border-gray-300 rounded-md p-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSignIn}>Sign In</button>
        </div>
    )
}