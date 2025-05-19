import { useNavigate } from "react-router-dom";
import Navbar1 from "../Navbar/Navbar1"
import Footer from "../Footer/Footer"
import { Fade, Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
// menu food picture
import padtai from '../../image/padtai.jpg'
import kangsom from '../../image/kangsom.webp'
import somtum from '../../image/somtum.jpg'
import kangpa from '../../image/kangpa.jpg'

import pako from '../../image/pako.jpg'
import smila from '../../image/smilar.jpg'
import longkang from '../../image/longkang.jpg'
import namgrung from '../../image/nangrum.jpg'

import vild1 from '../../image/vild1.webp'
import vild2 from '../../image/vild2.webp'
import vild3 from '../../image/vild3.webp'
import vild4 from '../../image/vild4.webp'
import vild5 from '../../image/vild5.jpg'

import Food from '../../image/Food.jpg'

import ShowData from "./showpicdata";


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faPlay, faChevronRight } from "@fortawesome/free-solid-svg-icons"

const Home = () => {

    const navigate = useNavigate();
    const [Headernew, setHeadernew] = useState([true, false, false])

    useEffect(() => {
        document.title = 'หน้าหลัก | Home Page';
    }, []);

    const class_select_border = Headernew.map((data: any, index: number) => {
        if (data == false) {
            return ("")
        } else {
            return ("border-b-8 border-y-lime-500")
        }
    })


    const spanStyle = {
        padding: '20px',
        background: '#efefef',
        color: '#000000'
    }

    const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: '100% 100%',
        backgroundRepeat: "no-repeat",
        height: '25vw',
        marginTop: "5px"
    }
    const slideImages = [
        {
            url: `${vild1}`,
            caption: '/Dashboard',

        },
        {
            url: `${Food}`,
            caption: 'Slide 2'
        },
        {
            url: `${smila}`,
            caption: 'Slide 3'
        },
        {
            url: `${vild5}`,
            caption: 'Slide 4'
        },
    ];

    const handle_select_header_news = (number: number) => {
        let array = [...Headernew.map((data: any) => false)]
        array[number] = true
        console.log(array)
        setHeadernew(array)
    }


    return (
        <>
            <div className="container flex flex-col ">
                <Navbar1 />
                <div className="mt-2 shrink">
                    <div className="container ">
                        <Slide >
                            {slideImages.map((slideImage, index) => (
                                <div key={index}>
                                    <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }} >
                                    </div>
                                </div>
                            ))}
                        </Slide>
                        <div className="Header-welcome">
                            <h1 className="subHeader-welcome1">Wellcome To website</h1>
                            <div className="text-4xl font-bold ">Wongnok</div>
                        </div>
                        <div>
                            <div className="w-full flex">
                                <div className={`subHeader-news ${class_select_border[0]} lg:w-36 md:w-1/2 sm:w-1/2 xs:w-1/2 text-center`} onClick={(e) => { handle_select_header_news(0) }}>รายการมาใหม่</div>
                                <div className={`subHeader-news ${class_select_border[1]} lg:w-36 md:w-1/2 sm:w-1/2 xs:w-1/2 text-center`} onClick={(e) => { handle_select_header_news(1) }}>คะเเนนสูงสุด</div>
                            </div>

                            {Headernew[0] && <div className="container-news relative flex justify-center">
                                <ShowData img={somtum} />
                                <ShowData img={somtum} />
                                <ShowData img={somtum} />
                                <ShowData img={somtum} />
                            </div>}
                            {Headernew[1] && <div className="container-news relative flex justify-center">
                                <ShowData img={padtai} />
                                <ShowData img={padtai} />
                                <ShowData img={padtai} />
                                <ShowData img={padtai} />
                            </div>}


                        </div>
                    </div>
                </div>
                <Footer />


            </div>


        </>
    )
}
export default Home