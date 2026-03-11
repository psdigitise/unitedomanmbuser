import React from 'react'
import { Outlet } from 'react-router-dom';
//import { LoginHeader } from '../components/LoginHeader';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';


export const LoginLayout: React.FC = () => {
    return (
        <div>
            {/* <LoginHeader /> */}
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
