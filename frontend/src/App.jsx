import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PreLoader from "./components/PreLoader";
import Users from "./pages/Users";
import Challan from "./components/Challan";
import Unauthorized from "./pages/Unauthorized";
import { createClient } from "@supabase/supabase-js";

// Creates a supabase client
const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [session, setSession] = useState(null);
    const location = useLocation();

    // Fetch session and set up auth state listener
    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
        };

        fetchSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <PreLoader />;
    }

    const role = session?.user?.role || 'admin'; 

    return (
        <>
            {location.pathname !== "/login" && location.pathname !== "/" && location.pathname !== "/unauthorized" && <Navbar />}
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={
                 role === 'admin' || role === 'moderator'
                 ? <Dashboard session={session} />
                 : <Navigate to="/unauthorized" />
}                   />
                <Route path="/users" element={
                    role === 'admin' ? <Users /> : <Navigate to="/unauthorized" />
                } />
                <Route path="/challan" element={
                    role === 'admin' || role === 'moderator' ? <Challan /> : <Navigate to="/unauthorized" />
                } />
                <Route path="/unauthorized" element={<Unauthorized />} />
            </Routes>
        </>
    );
}

export default App;
