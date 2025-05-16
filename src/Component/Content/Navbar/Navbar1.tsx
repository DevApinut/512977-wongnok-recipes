import { useReducer, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faPlay } from "@fortawesome/free-solid-svg-icons"
import Favicon from "react-favicon";
import { ClassNames } from "@emotion/react";
import axios from "axios";
import { getusername, logout } from "../Loginreg/Service_login";
import { Button } from "react-bootstrap";

const Navbar1 = () => {

    const navigate = useNavigate();
    //--------------------สำหรับ dropdown รายงาน-----------------------------
    const dropdown = useRef<any>()
    const dropdown2 = useRef<any>()
    const dropdown3 = useRef<any>()
    const subdropdown = useRef<any>()
    const hamburger = useRef<any>()

    //--------------------สำหรับ dropdown รายงาน-----------------------------
    const [isOpen, setIsOpen] = useState([false, false, false])
    const [SubisOpen, setSubIsOpen] = useState([false, false,false])
    const [MenuresponsiveisOpen, setMenuresponsiveisOpen] = useState(false)

    let menu_response = MenuresponsiveisOpen ? "toggle-active" : "active"

    const initials = {
        dropdows_report: "hidden",
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

    useEffect(() => {

        document.body.addEventListener('click', handle_outside)
        return () => document.body.removeEventListener('click', handle_outside)

    }, [dropdown, dropdown2, isOpen, subdropdown])

    const handle_outside = (event: any) => {
        if (!hamburger.current.contains(event.target)) {
            if ((dropdown.current && !dropdown.current.contains(event.target)) &&
                dropdown2.current && (!dropdown2.current.contains(event.target)) &&
                dropdown3.current && (!dropdown3.current.contains(event.target))
            ) {
                if (subdropdown.current != null) {
                    if (!subdropdown.current.contains(event.target)) {
                        setIsOpen([false, false, false]);
                        setSubIsOpen([false, false,false])
                        setMenuresponsiveisOpen(false)
                    } else {

                    }
                }
                else {
                    setIsOpen([false, false, false]);
                    setSubIsOpen([false, false,false])
                    setMenuresponsiveisOpen(false)
                }
            }
        }
    }
    const Active_class = (index: number) => {
        let dropdown = [...isOpen.map((data: any) => false)]
        dropdown[index] = !isOpen[index];
        setIsOpen(dropdown);
        setSubIsOpen([false, false])
    }
    const sub_menu_data = (number: any) => {
        let Array_data = [...SubisOpen.map((data: any) => false)]
        const newvalue = !SubisOpen[number]
        Array_data[number] = newvalue;
        setSubIsOpen(Array_data)
    }

    return (
        <>
            <Favicon url={"https://ppim.pea.co.th/images/pea-logo.png"} />
            <nav className="container flex justify-between  items-center top-0 relative p-2 bg-green-600">
                <div className="w-full flex ">
                    <div className="flex justify-center flex-col items-center text-white font-bold">
                        <div className="text-3xl">
                            Wongnok
                        </div>
                        {/* <div className="text-sm">
                            ผสม.กสฟ.ต.1
                        </div> */}

                    </div>

                    <div className={`${menu_response}`}>
                        <div className="Barul h-full">
                            <Link to={'/Homepage'} className="BarMenu no-underline">หน้าหลัก</Link>
                            {/* <Link to={'/About'} className="BarMenu no-underline">เกี่ยวกับฉัน</Link> */}

                            <div className="BarMenu relative">
                                <div className="flex justify-center flex-col hover:cursor-pointer h-auto">
                                    <div onClick={(e) => Active_class(0)} className="my-0"
                                        ref={dropdown2}
                                    >
                                        เกี่ยวกับฉัน
                                    </div>
                                    {isOpen[0] && <div className='Subheader1' >
                                        <div className="m-2 text-black hover:bg-slate-200" >
                                            <Link to={'/About/Menu'} className="mx-0 text-black no-underline">รายการเมนูอาหาร</Link>
                                        </div>
                                        {/* <div className="m-2 text-black hover:bg-slate-200">
                                            <Link to={'/About/Personel'} className="mx-0 text-black no-underline">บุคลากรในแผนก</Link>
                                        </div> */}
                                    </div>}

                                </div>
                            </div>

                            
                        </div>

                        {/* Drop Down list show when login for logout  */}
                        {getusername() !== null && <div className="BarMenu relative">
                            <div className="flex justify-center flex-col hover:cursor-pointer h-auto">
                                <div onClick={(e) => Active_class(2)} className="my-0"
                                    ref={dropdown3}
                                >
                                    {getusername()}
                                </div>
                                {isOpen[2] && <div className='Subheader3' >
                                    <div className="m-2 text-black hover:bg-slate-200" >
                                        <Link to={'#'} className="mx-0 text-black no-underline">ข้อมูลส่วนตัว</Link>
                                    </div>
                                    <div className="m-2 text-black hover:bg-slate-200">
                                        <div onClick={() => logout(() => { navigate('/Login') })} className="mx-0 text-black no-underline">ออกจากระบบ</div>
                                    </div>
                                </div>}

                            </div>
                        </div>}
                        {!getusername() && <div className="subheadMenubarlogin">
                            <Link to={'/Login'} className="BarMenu login-reg no-underline">ลงชื่อเข้าใช้</Link>
                            <Link to={'/Register'} className="BarMenu login-reg no-underline">สมัครสมาชิก</Link>
                        </div>}

                    </div>

                </div>



                <FontAwesomeIcon icon={faBars}
                    className="border text-3xl text-slate-50 p-2 rounded hover:cursor-pointer hover:text-slate-950 hover:bg-white hamburger"
                    onClick={(e) => { setMenuresponsiveisOpen(!MenuresponsiveisOpen) }}
                    ref={hamburger}
                />





            </nav>
        </>
    )
}

export default Navbar1