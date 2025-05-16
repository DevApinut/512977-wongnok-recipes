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

    console.log(class_select_border)
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
                                        {/* <span style={spanStyle}>{slideImage.caption}</span> */}
                                    </div>
                                </div>
                            ))}
                        </Slide>
                        <div className="Header-welcome">
                            <h1 className="subHeader-welcome1">ยินดีต้อนรับเข้าสู่เว็บไชต์</h1>
                            <div className="text-4xl font-bold ">Wongnok</div>
                        </div>
                        <div>
                            <div className="Header-news">
                                <div className={`subHeader-news ${class_select_border[0]}`} onClick={(e) => { handle_select_header_news(0) }}>รายการอาหารเเนะนำ</div>
                                <div className={`subHeader-news ${class_select_border[1]}`} onClick={(e) => { handle_select_header_news(1) }}>ที่เที่ยวน่าไป</div>
                                <div className={`subHeader-news ${class_select_border[2]}`} onClick={(e) => { handle_select_header_news(2) }}>ที่พักน่าสนใจ</div>
                            </div>
                            {Headernew[0] && <div className="container-news relative flex justify-center">
                                <div className="content-news border">
                                    <div className="sub-content-news">
                                        <div className="h-44">
                                            <img src={somtum} width={"100%"} height={"100%"} className="border h-full image-hover"></img>
                                        </div>
                                        <div className="flex flex-col mx-2 h-2/4 ">
                                            <div className="Head_news">
                                                ส้มตำ
                                            </div>
                                            <div className="flex justify-between my-2">
                                                <div><Link to={"#"} className="no-underline text-slate-950 hover:border hover:p-1 hover:bg-slate-800 hover:rounded-xl hover:text-slate-50 ">อ่านรายระเอียด...</Link></div>
                                                <div className="text-sm ">ข้อมูล 8 พ.ค. 67</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="content-news ">
                                    <div className="sub-content-news">
                                        <div className="h-44">
                                            <img src={kangsom} width={"100%"} height={"100%"} className="border h-full image-hover"></img>
                                        </div>
                                        <div className="flex flex-col mx-2">
                                            <div className="Head_news">
                                                แกงส้ม
                                            </div>
                                            <div className="flex justify-between my-2">
                                                <div><Link to={"#"} className="no-underline text-slate-950 hover:border hover:p-1 hover:bg-slate-800 hover:rounded-xl hover:text-slate-50 ">อ่านรายระเอียด...</Link></div>
                                                <div className="text-sm ">ข้อมูล 8 พ.ค. 67</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="content-news ">
                                    <div className="sub-content-news">
                                        <div className="h-44">
                                            <img src={padtai} width={"100%"} height={"100%"} className="border h-full image-hover"></img>
                                        </div>
                                        <div className="flex flex-col mx-2">
                                            <div className="Head_news">
                                                ผัดไท
                                            </div>
                                            <div className="flex justify-between my-2">
                                                <div><Link to={"#"} className="no-underline text-slate-950 hover:border hover:p-1 hover:bg-slate-800 hover:rounded-xl hover:text-slate-50 ">อ่านรายระเอียด...</Link></div>
                                                <div className="text-sm ">ข้อมูล 8 พ.ค. 67</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="content-news ">
                                    <div className="sub-content-news">
                                        <div className="h-44">
                                            <img src={kangpa} width={"100%"} height={"100%"} className="border h-full image-hover"></img>
                                        </div>
                                        <div className="flex flex-col mx-2">
                                            <div className="Head_news">
                                                แกงป่า
                                            </div>
                                            <div className="flex justify-between my-2">
                                                <div><Link to={"#"} className="no-underline text-slate-950 hover:border hover:p-1 hover:bg-slate-800 hover:rounded-xl hover:text-slate-50 ">อ่านรายระเอียด...</Link></div>
                                                <div className="text-sm ">ข้อมูล 8 พ.ค. 67</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="symbolofdata">
                                    <FontAwesomeIcon icon={faChevronRight}
                                        className="border font-bold text-slate-950 bg-slate-50 p-2 rounded-full hover:cursor-pointer hover:text-slate-50 hover:bg-black"
                                        onClick={(e) => { }}
                                    />
                                </div>
                                <div className="read_other">อ่านเพิ่มเติม</div>
                            </div>}
                            {Headernew[1] && <div className="container-news relative flex justify-center">
                                <div className="content-news ">
                                    <div className="sub-content-news">
                                        <div className="h-44">
                                            <img src={namgrung} width={"100%"} height={"100%"} className="border h-full image-hover"></img>
                                        </div>
                                        <div className="flex flex-col mx-2">
                                            <div className="Head_news">
                                                หาดนางรำ
                                            </div>
                                            <div className="flex justify-between my-2">
                                                <div><Link to={"#"} className="no-underline text-slate-950 hover:border hover:p-1 hover:bg-slate-800 hover:rounded-xl hover:text-slate-50 ">อ่านรายระเอียด...</Link></div>
                                                <div className="text-sm ">ข้อมูล 8 พ.ค. 67</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="content-news ">
                                    <div className="sub-content-news">
                                        <div className="h-44">
                                            <img src={smila} width={"100%"} height={"100%"} className="border h-full image-hover"></img>
                                        </div>
                                        <div className="flex flex-col mx-2">
                                            <div className="Head_news">
                                                หาดสมิหรา
                                            </div>
                                            <div className="flex justify-between my-2">
                                                <div><Link to={"#"} className="no-underline text-slate-950 hover:border hover:p-1 hover:bg-slate-800 hover:rounded-xl hover:text-slate-50 ">อ่านรายระเอียด...</Link></div>
                                                <div className="text-sm ">ข้อมูล 8 พ.ค. 67</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="content-news ">
                                    <div className="sub-content-news">
                                        <div className="h-44">
                                            <img src={pako}></img>
                                        </div>
                                        <div className="flex flex-col mx-2">
                                            <div className="Head_news">
                                                วัดพระศรีรัตนศาสดาราม
                                            </div>
                                            <div className="flex justify-between my-2">
                                                <div><Link to={"#"} className="no-underline text-slate-950 hover:border hover:p-1 hover:bg-slate-800 hover:rounded-xl hover:text-slate-50 ">อ่านรายระเอียด...</Link></div>
                                                <div className="text-sm ">ข้อมูล 8 พ.ค. 67</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="content-news ">
                                    <div className="sub-content-news">
                                        <div className="h-44">
                                            <img src={longkang} width={"100%"} height={"100%"} className="border h-full image-hover"></img>
                                        </div>
                                        <div className="flex flex-col mx-2">
                                            <div className="Head_news">
                                                ล่องแก่ง หนานมดเเดง
                                            </div>
                                            <div className="flex justify-between my-2">
                                                <div><Link to={"#"} className="no-underline text-slate-950 hover:border hover:p-1 hover:bg-slate-800 hover:rounded-xl hover:text-slate-50 ">อ่านรายระเอียด...</Link></div>
                                                <div className="text-sm ">ข้อมูล 8 พ.ค. 67</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="symbolofdata">
                                    <FontAwesomeIcon icon={faChevronRight}
                                        className="border font-bold text-slate-950 bg-slate-50 p-2 rounded-full hover:cursor-pointer hover:text-slate-50 hover:bg-black"
                                        onClick={(e) => { }}
                                    />
                                </div>
                                <div className="read_other">อ่านเพิ่มเติม</div>
                            </div>}
                            {Headernew[2] && <div className="container-news relative flex justify-center">
                                <div className="content-news ">
                                    <div className="sub-content-news">
                                        <div className="h-44">
                                            <img src={vild1} width={"100%"} height={"100%"} className="border h-full image-hover"></img>
                                        </div>
                                        <div className="flex flex-col mx-2">
                                            <div className="Head_news">
                                                โรงเเรมวิวดี
                                            </div>
                                            <div className="flex justify-between my-2">
                                                <div><Link to={"#"} className="no-underline text-slate-950 hover:border hover:p-1 hover:bg-slate-800 hover:rounded-xl hover:text-slate-50 ">อ่านรายระเอียด...</Link></div>
                                                <div className="text-sm ">ข้อมูล 8 พ.ค. 67</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="content-news ">
                                    <div className="sub-content-news">
                                        <div className="h-44">
                                            <img src={vild2} width={"100%"} height={"100%"} className="border h-full image-hover"></img>
                                        </div>
                                        <div className="flex flex-col mx-2">
                                            <div className="Head_news">
                                                บ้านฮันโฮมสเตย์
                                            </div>
                                            <div className="flex justify-between my-2">
                                                <div><Link to={"#"} className="no-underline text-slate-950 hover:border hover:p-1 hover:bg-slate-800 hover:rounded-xl hover:text-slate-50 ">อ่านรายระเอียด...</Link></div>
                                                <div className="text-sm ">ข้อมูล 8 พ.ค. 67</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="content-news ">
                                    <div className="sub-content-news">
                                        <div className="h-44">
                                            <img src={vild3} width={"100%"} height={"100%"} className="border h-full image-hover"></img>
                                        </div>
                                        <div className="flex flex-col mx-2">
                                            <div className="Head_news">
                                                พักผ่อนวิลเลจ
                                            </div>
                                            <div className="flex justify-between my-2">
                                                <div><Link to={"#"} className="no-underline text-slate-950 hover:border hover:p-1 hover:bg-slate-800 hover:rounded-xl hover:text-slate-50 ">อ่านรายระเอียด...</Link></div>
                                                <div className="text-sm ">ข้อมูล 8 พ.ค. 67</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="content-news ">
                                    <div className="sub-content-news">
                                        <div className="h-44">
                                            <img src={vild4} width={"100%"} height={"100%"} className="border h-full image-hover"></img>
                                        </div>
                                        <div className="flex flex-col mx-2">
                                            <div className="Head_news">
                                                นอนน้อยพักผ่อน
                                            </div>
                                            <div className="flex justify-between my-2">
                                                <div><Link to={"#"} className="no-underline text-slate-950 hover:border hover:p-1 hover:bg-slate-800 hover:rounded-xl hover:text-slate-50 ">อ่านรายระเอียด...</Link></div>
                                                <div className="text-sm ">ข้อมูล 8 พ.ค. 67</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                
                                <div className="symbolofdata">
                                    <FontAwesomeIcon icon={faChevronRight}
                                        className="border font-bold text-slate-950 bg-slate-50 p-2 rounded-full hover:cursor-pointer hover:text-slate-50 hover:bg-black"
                                        onClick={(e) => { }}                                    />
                                </div>
                                <div className="read_other">อ่านเพิ่มเติม</div>
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