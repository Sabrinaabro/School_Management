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


const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [session, setSession] = useState(null);
    const [role, setRole] = useState(null);
    const location = useLocation();

    
    useEffect(() => {
        const fetchSessionAndRole = async () => {
            
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            if (sessionError) {
                console.error("Session fetch error:", sessionError);
                return;
            }

            setSession(session);
            console.log("Session fetched:", session);

            if (session) {
                
                const { data: user, error } = await supabase
                    .from('users')
                    .select('role')
                    .eq('id', session.user.id)
                    .single(); 

                if (error) {
                    console.error("Error fetching role:", error);
                } else {
                    setRole(user.role); 
                    console.log("User role:", user.role);
                }
            } else {
                console.log("No active session");
            }
        };

        fetchSessionAndRole();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            fetchSessionAndRole();
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

    return (
        <>
           
            {location.pathname !== "/login" && location.pathname !== "/" && location.pathname !== "/unauthorized" && <Navbar />}

            <Routes>
               
                <Route path="/" element={<Home />} />
                
                
                <Route path="/login" element={session ? <Navigate to="/" /> : <Login />} />

                
                <Route path="/dashboard" element={
                    session ? <Dashboard session={session} /> : <Navigate to="/login" />
                } />

            
                <Route path="/users" element={
                    role === 'admin' 
                    ? <Users /> 
                    : <Navigate to="/unauthorized" />
                } />

                
                <Route path="/challan" element={
                    role === 'admin' || role === 'moderator' 
                    ? <Challan /> 
                    : <Navigate to="/unauthorized" />
                } />

                <Route path="/unauthorized" element={<Unauthorized />} />
            </Routes>
        </>
    );
}

export default App;
