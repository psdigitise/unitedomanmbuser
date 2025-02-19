import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { LoginPopup } from '../../../components/Index/Popups/LoginPopup';
import { VerificationCodePopup } from './VerificationCodePopup';

export const HandlePopup = () => {
    const showLoginPopup = useSelector((state: RootState) => state.loginPopup.showLoginPopup);
    const showVerificationCodePopup = useSelector((state: RootState) => state.verificationCodePopup.showVerificationCodePopup);

    return (
        <>
            {showLoginPopup && <LoginPopup />}
            {showVerificationCodePopup && <VerificationCodePopup />}
        </>
    );
};
