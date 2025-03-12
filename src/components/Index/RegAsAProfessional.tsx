import registerAsAProfessional from '../../assets/images/registerAsAProfessional.webp';

export const RegAsAProfessional = () => {
    return (
        <div>
            <div className="container mx-auto px-4 py-10 max-sm:py-5">
                <div className="text-center">
                    <a
                        href="https://calm-sand-0e7a0520f.4.azurestaticapps.net"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div>
                            <img
                                src={registerAsAProfessional}
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
