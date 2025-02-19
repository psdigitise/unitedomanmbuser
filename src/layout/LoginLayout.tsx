import React from 'react'
import { Outlet } from 'react-router-dom';
import { LoginHeader } from '../components/LoginHeader';
import { Footer } from '../components/Footer';


export const LoginLayout: React.FC = () => {
    return (
        <div>
            <LoginHeader />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
