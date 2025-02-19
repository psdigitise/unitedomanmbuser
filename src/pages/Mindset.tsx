
import { AboutBanner } from '../components/About/AboutBanner'
import { MindSetAbout } from '../components/MindSet/MindSetAbout'
import { TechnologyImgBox } from '../components/OurTechnology/TechnologyImgBox'
import MindSetBoxImg from '../assets/images/mindSetBoxImg.jpg'
import { MinsetMission } from "../components/MindSet/MinsetMission"

export const Mindset = () => {
    return (
        <div>
            <AboutBanner bannerTitle="Mindset" bannerDesc="A Joyful Journey of Mindful Beauty and Imagination" />

            <MindSetAbout />

            <TechnologyImgBox bgImage={MindSetBoxImg} />

            <MinsetMission />



        </div>
    )
}
