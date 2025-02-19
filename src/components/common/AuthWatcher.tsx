import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const AuthWatcher = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [providerId, setProviderId] = useState<string | null>(null);

    useEffect(() => {
        // Get initial provider ID
        const storedProviderId = sessionStorage.getItem('selectedProviderId');
        setProviderId(storedProviderId);
    }, []);

    useEffect(() => {
        if (providerId === null || providerId === 'null') {
            dispatch(logout());
            navigate('/');
        }

        const checkProviderId = () => {
            const currentProviderId = sessionStorage.getItem('selectedProviderId');

            // Update state if providerId has changed
            if (currentProviderId !== providerId) {
                setProviderId(currentProviderId);
            }

            // Logout if providerId is invalid
            if (!currentProviderId || currentProviderId === 'null') {
                dispatch(logout());
                navigate('/');
            }
        };

        // Periodically check sessionStorage
        const interval = setInterval(checkProviderId, 500);

        // Listen for storage changes in other tabs/windows
        const storageListener = (e: StorageEvent) => {
            if (e.key === 'selectedProviderId') {
                checkProviderId();
            }
        };

        window.addEventListener('storage', storageListener);

        return () => {
            clearInterval(interval);
            window.removeEventListener('storage', storageListener);
        };
    }, [providerId, dispatch, navigate]);

    return null;
};

export default AuthWatcher;
