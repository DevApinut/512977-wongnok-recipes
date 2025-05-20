import { useNavigate } from "react-router-dom";
import Navbar1 from "../Navbar/Navbar1"
import Footer from "../Footer/Footer"
import { Fade, Slide } from 'react-slideshow-image';
import axios from "axios";
import { getToken } from "../Loginreg/Service_login";
import 'react-slideshow-image/dist/styles.css'
// menu food picture
import smila from '../../image/Free-Food-PowerPoint-Template-About-Us.jpg'
import vild1 from '../../image/Free-Food-PowerPoint-Template-Services.jpg'
import vild5 from '../../image/Free-Food-Template-For-PowerPoint-Title-Slides.jpg'
import Food from '../../image/free-food-powerpoint-template-jpg.webp'
import dowload from '../../image/black-chef-icon_602006-3234.avif'
import ShowData from "./showpicdata";





import { useState, useEffect, useReducer } from "react";

const Home = () => {

    const navigate = useNavigate();
    const [Headernew, setHeadernew] = useState([true, false, false])

    useEffect(() => {
        document.title = 'หน้าหลัก | Home Page';
        const updateFavicon = (iconURL: string) => {
            // Remove existing favicon links
            const existingIcons = document.querySelectorAll('link[rel="icon"]');
            existingIcons.forEach(icon => icon.parentNode?.removeChild(icon));

            // Create new link element
            const newIcon = document.createElement('link');
            newIcon.rel = 'icon';
            // Add cache buster query param to force refresh
            newIcon.href = iconURL + '?v=' + new Date().getTime();

            document.head.appendChild(newIcon);
        };
        updateFavicon(dowload);
        fetch()
        fetchrating()
    }, []);

    const initials = {
        datafromrating: [],
        datafromlasted: []

    }
    const reducer = (state: any, action: any) => {
        switch (action.type) {
            case "setstate":
                return {
                    ...state,
                    [action.payload.name]: action.payload.value
                }
        }
    }

    const [state, dispatch] = useReducer(reducer, initials)


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
            url: `${Food}`,
            caption: '/Dashboard',

        },
        {
            url: `${smila}`,
            caption: 'Slide 2'
        },
        {
            url: `${vild1}`,
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


    const fetch = (data: any = "", rating: Number = 0) => {
        axios.get(`${process.env.REACT_APP_API}/GetMenu`, {
            params: {
                data: data,
                rating: Number(rating)
            },
            headers: {
                authorization: `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            }
        }
        )
            .then((result: any) => {
                dispatch({ type: "setstate", payload: { name: "datafromlasted", value: result.data.res } })
            })
    }
    const fetchrating = () => {
        axios.get(`${process.env.REACT_APP_API}/GetMenuRating`, {
            headers: {
                authorization: `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            }
        })
            .then((result: any) => {
                console.log(result)
                dispatch({ type: "setstate", payload: { name: "datafromrating", value: result.data.res } })
            })
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

                            {Headernew[0] && <div className="container-news relative flex justify-start">
                                {state.datafromlasted.length >= 1 && <ShowData state={state.datafromlasted} index={0} />}
                                {state.datafromlasted.length >= 2 && <ShowData state={state.datafromlasted} index={1} />}
                                {state.datafromlasted.length >= 3 && <ShowData state={state.datafromlasted} index={2} />}
                                {state.datafromlasted.length >= 4 && <ShowData state={state.datafromlasted} index={3} />}


                            </div>}
                            {Headernew[1] && <div className="container-news relative flex justify-start">
                                {state.datafromrating.length >= 1 && <ShowData state={state.datafromrating} index={0} />}
                                {state.datafromrating.length >= 2 && <ShowData state={state.datafromrating} index={1} />}
                                {state.datafromrating.length >= 3 && <ShowData state={state.datafromrating} index={2} />}
                                {state.datafromrating.length >= 4 && <ShowData state={state.datafromrating} index={3} />}
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