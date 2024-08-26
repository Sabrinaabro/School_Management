import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PreLoader from "./components/PreLoader";
import Users from "./pages/Users";
import { createClient } from "@supabase/supabase-js";

// creates a supabase client.
const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const [session, setSession] = useState(null);

    // This will read the session of a user.
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        // changed from 2500 to 1000 for a better UX.

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <PreLoader />;
    }

    return (
        <>
            {location.pathname !== "/login" && <Navbar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard session={session} />} />
                <Route path="/users" element={<Users />} />
            </Routes>
        </>
    );
}

export default App;
