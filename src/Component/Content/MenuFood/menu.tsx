import Navbar1 from "../Navbar/Navbar1"
import Footer from "../Footer/Footer"
import Modal from "./Addmenu"
import { useEffect, useReducer } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import StarRatings from 'react-star-ratings';
import { getusername } from "../Loginreg/Service_login"



const MenuCrud = () => {

    useEffect(() => {
        fetch()
    }, [])


    const initials = {
        Menuadd: false,
        MenuEdit: false,
        ID:"",
        dataforEdit:"",
        nameofFood: "",
        ingredient: "",
        reciept: "",
        timeforcook: "",
        Hardforwork: "",
        imgfile: "",
        nameUser: "",
        SuumratingofFood: "",
        ratingofFood: "",
        ratingforgive: 0,
        dataFromfetch: []

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

    const setdatafromprops = (name: any, value: any) => {
        dispatch({ type: "setstate", payload: { name: name, value: value } })
    }
    const fetch = () => {
        axios.get(`${process.env.REACT_APP_API}/GetMenu`)
            .then((result: any) => {
                console.log(result)
                dispatch({ type: "setstate", payload: { name: "dataFromfetch", value: [...result.data.res] } })
            })
    }
    const deleteMenu = (ID: string) => {
        axios.post(`${process.env.REACT_APP_API}/deleteMenu`, { ID })
            .then((result: any) => {
                console.log(result)
                fetch()
            })
    }


    return (
        <>
            <Navbar1 />
            <div className="grow container w-full flex flex-col">
                {state.Menuadd && <Modal setstatedis={setdatafromprops} state={state} fetch={fetch} nameHeader={"เพิ่มเมนูอาหาร"} button={"create"}/>}
                {state.MenuEdit && <Modal setstatedis={setdatafromprops} state={state} fetch={fetch} nameHeader={"แก้ไขเมนูอาหาร"} 
                button={"Update"}/>}
                <div className="text-center text-3xl">รายการอาหาร</div>
                <div className="flex justify-start">
                    <div className="mx-2 btn btn-success" onClick={() => setdatafromprops("Menuadd", true)}>เพิ่มรายการอาหาร </div>
                    {/* <div className="mx-2 btn btn-danger">ลบรายการอาหาร</div> */}
                </div>
                <div className="border my-2"></div>

                <div className="flex flex-wrap justify-start items-center ">
                    {state.dataFromfetch.map((data: any, index: number) => {
                        return (
                            <div className="lg:w-1/4 lg:h-200 md:w-1/2 md:h-200  sm:w-full  sm:h-200 py-3 px-2 flex flex-col">
                                <div className="border h-full px-2 rounded-xl">
                                    <div>{`ชื่อเมนู: ${data.nameofFood}`}</div>
                                    <div>{`ระยะเวลา: ${data.timeforcook}`}</div>
                                    <div className="flex justify-start items-center ">
                                        <div>{`rating:`}</div>
                                        <div>&nbsp;{`${data.SuumratingofFood}`}</div>
                                        <div className="mx-2">
                                            &nbsp;<StarRatings
                                                rating={Number(data.SuumratingofFood)}
                                                starRatedColor="blue"
                                                numberOfStars={5}
                                                starDimension={20}
                                                name='rating'
                                            />
                                        </div>


                                    </div>
                                    <div className="flex justify-start items-center ">
                                        <div>{`ความยาก:`}</div>
                                        <div className="mx-2">
                                            <StarRatings
                                                rating={Number(data.Hardforwork)}
                                                starRatedColor="blue"
                                                numberOfStars={3}
                                                starDimension={20}
                                                name='rating'
                                            />
                                        </div>

                                    </div>
                                    <div>{`ผู้สร้าง: ${data.nameUser}`}</div>
                                    <div className="mt-2 flex justify-center flex-col items-center w-full">
                                        <img src={data.imgfile} alt="Preview" width={"100%"} className="max-w-xs rounded shadow" />
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <div className="items-end  flex justify-start" >
                                            <Link to={`/About/Menu/detail/${data._id}`} className="btn btn-dark my-2 justify-self-end">อ่านรายระเอียด</Link>
                                        </div>
                                        <div className="items-center  flex justify-center">
                                            <div className="mx-2 btn btn-success" onClick={() => {
                                                setdatafromprops("MenuEdit", true)
                                                setdatafromprops("dataforEdit", data)                                                
                                                }}>แก้ไข </div>
                                            {/* <div className="mx-2 btn btn-danger">ลบรายการอาหาร</div> */}
                                        </div>
                                        <div className="items-end  flex justify-start" >
                                            <div className="btn btn-danger my-2 justify-self-end" onClick={() => { deleteMenu(data._id) }}>ลบ</div>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        )

                    })}
                </div>





            </div >

            <Footer />
        </>
    )
}

export default MenuCrud