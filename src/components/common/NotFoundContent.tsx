import notFoundImage from "../../assets/icons/notFound.svg"

export const NotFoundContent = () => {
    return (
        <div className="py-28 max-md:py-12">
            <div className="container mx-auto">
                <div className="text-center space-y-8">
                    <h5 className="text-[24px] font-bold text-black">Oops! Nothing Here</h5>
                    <p className="text-base font-normal text-black">No salon/freelancer nearby at the moment, but we’re growing! Come back in a month—we might be closer than you think.</p>
                    <div>
                    <img src={notFoundImage} alt="notFoundimage" className="w-40 mx-auto" />
                    </div>
                </div>
            </div>
        </div>
    )
}
