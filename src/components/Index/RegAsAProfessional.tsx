// import registerAsAProfessional from '../../assets/images/registerAsAProfessional.webp';
import registerAsAProfessionalDesktop from '../../assets/images/registerAsAProfessionalDesktop.png';
import registerAsAProfessionalMobile from '../../assets/images/registerAsAProfessionalMobile.png';

export const RegAsAProfessional = () => {
    return (
        <div>
            <div className="container mx-auto px-4 py-10 max-sm:py-5">
                <div className="text-center">
                    <a
                        href="https://services.mindfulbeauty.ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="max-md:hidden">
                            <img
                                src={registerAsAProfessionalDesktop}
                                alt="registerAsAProfessional-image"
                                className="w-full"
                            />
                        </div>
                        <div className='hidden max-md:block'>
                            <img
                                src={registerAsAProfessionalMobile}
                                alt="registerAsAProfessional-image"
                                className="w-full"
                            />
                        </div>

                    </a>
                </div>
            </div>
        </div>
    )
}
