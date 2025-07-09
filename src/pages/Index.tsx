// import { useState, useEffect } from 'react'
import { HeroSection } from '../components/Index/HeroSection'
import { MottoSection } from '../components/Index/MottoSection'
import { FeaturedServices } from '../components/Index/FeaturedServices'
import { RecommendedBest } from '../components/Index/RecommendedBest'
import { BookingFlow } from '../components/Index/BookingFlow'
import { FeedBack } from '../components/Index/FeedBack'
import { Faq } from '../components/Index/Faq'
import { RegAsAProfessional } from '../components/Index/RegAsAProfessional'
import { Helmet } from 'react-helmet-async'
import { ExclusiveBridalPackages } from '../components/Index/ExclusiveBridalPackages'
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
             <Helmet>
                    <script>
                      {`
                        (function (c, s, q, u, a, r, e) {
                          c.hj = c.hj || function () { (c.hj.q = c.hj.q || []).push(arguments) };
                          c._hjSettings = { hjid: 6369861 };
                          r = s.getElementsByTagName('head')[0];
                          e = s.createElement('script');
                          e.async = true;
                          e.src = q + c._hjSettings.hjid + u;
                          r.appendChild(e);
                        })(window, document, 'https://static.hj.contentsquare.net/c/csq-', '.js', 6369861);
                      `}
                    </script>
                  </Helmet>
            <HeroSection />
            <MottoSection />
            <FeaturedServices category_name={''} status={''} image={''} />
            <ExclusiveBridalPackages category_name={''} status={''} image={''} />
            <RecommendedBest />
            <BookingFlow />
            <FeedBack />
            <Faq />
            {/* <Blog /> */}
            <RegAsAProfessional />
        </div>
    )
}
