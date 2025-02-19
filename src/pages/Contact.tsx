import { AboutBanner } from "../components/About/AboutBanner"
import {GetInTouch} from "../components/Contact/GetInTouch"
import {CurrentPresence} from "../components/Contact/CurrentPresence"

export const Contact = () => {
    return (
        <div>
            <AboutBanner bannerTitle="Contact" bannerDesc="Embark on a Journey of Elevation, Purpose, and Fulfillment with Every Interaction" />

            <GetInTouch />

            <CurrentPresence />

        </div>
    )
}