import notFoundImage from "../../assets/icons/notFound.svg"

export const NotFoundContent = () => {
    return (
        <div className="py-28">
            <div className="container mx-auto">
                <div className="text-center space-y-8">
                    <h5 className="text-[24px] font-bold text-black">Oops! Nothing Here</h5>
                    <p className="text-base font-normal text-black">We couldn't find what you're looking for. Try refining your search or explore other options.</p>
                    <div>
                    <img src={notFoundImage} alt="notFoundimage" className="w-40 mx-auto" />
                    </div>
                </div>
            </div>
        </div>
    )
}
