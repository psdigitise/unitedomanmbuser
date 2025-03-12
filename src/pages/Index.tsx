// import { useState, useEffect } from 'react'
import { HeroSection } from '../components/Index/HeroSection'
import { MottoSection } from '../components/Index/MottoSection'
import { FeaturedServices } from '../components/Index/FeaturedServices'
import { RecommendedBest } from '../components/Index/RecommendedBest'
import { BookingFlow } from '../components/Index/BookingFlow'
import { FeedBack } from '../components/Index/FeedBack'
import { Faq } from '../components/Index/Faq'
import { RegAsAProfessional } from '../components/Index/RegAsAProfessional'
// import { Blog } from '../components/Index/Blog'

export const Index = () => {

    // Request user location when the component mounts
    // useEffect(() => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //                 console.log('Location access granted:', position);
    //             },
    //             (error) => {
    //                 console.log('Error in getting location:', error);
    //             }
    //         );
    //     } else {
    //         console.log("Geolocation is not supported by this browser.");
    //     }
    // }, []);

    // Request user's location on load


    return (
        <div>
            <HeroSection />
            <MottoSection />
            <FeaturedServices category_name={''} status={''} image={''} />
            <RecommendedBest />
            <BookingFlow />
            <FeedBack />
            <Faq />
            {/* <Blog /> */}
            <RegAsAProfessional />
        </div>
    )
}
