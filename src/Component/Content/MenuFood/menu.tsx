import Navbar1 from "../Navbar/Navbar1"
import Footer from "../Footer/Footer"
import Modal from "./Addmenu"
import { useEffect, useReducer, useState } from "react"
import axios from "axios"
import { Link, useParams, useNavigate } from "react-router-dom"
import StarRatings from 'react-star-ratings';
import { getToken, getusername } from "../Loginreg/Service_login"
import Swal from "sweetalert2"
import Pagination from "../Homepage/Pageselect"
import dowload from '../../image/black-chef-icon_602006-3234.avif'



const MenuCrud = () => {
    const { page } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'รายการเมนู | List of Menu';
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
        if (!page || Number(page) < 1 || page === undefined) {
            navigate('/About/Menu/1', { replace: true });
        }
    }, [])




    const initials = {
        Menuadd: false,
        MenuEdit: false,
        ID: "",
        dataforEdit: "",
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
        dataFromfetch: [],
        dataFrompage: [],
        findData: "",
        findstar: 0

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
                console.log(result)
                dispatch({ type: "setstate", payload: { name: "dataFromfetch", value: [...result.data.res] } })
                if (Number(page) > Number(((result.data.res.length) / 4) + 1) || !page || Number(page) < 1 || page === undefined) {
                    navigate('/About/Menu/1', { replace: true });
                    dispatch({ type: "setstate", payload: { name: "dataFrompage", value: result.data.res.slice((Number(1) - 1) * 4, Number(1) * 4) } })
                } else {
                    navigate(`/About/Menu/${page}`, { replace: true });
                    dispatch({ type: "setstate", payload: { name: "dataFrompage", value: result.data.res.slice((Number(page) - 1) * 4, Number(page) * 4) } })
                }
            })
    }
    const finddata = (data: any = "") => {
        fetch(data, Number(state.findstar))
        dispatch({ type: "setstate", payload: { name: "findData", value: data } })
    }
    const deleteMenu = (ID: string) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`${process.env.REACT_APP_API}/deleteMenu`, { ID }, {
                    headers: {
                        authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/json'
                    }
                })
                    .then((result: any) => {
                        fetch()
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    })

            }
        });
    }
    const Findfromrating = (star: number) => {
        console.log(star)
        console.log(state.findData)
        fetch(state.findData, star)
        dispatch({ type: "setstate", payload: { name: "findstar", value: star } })
    }



    const handlePageChange = (selectpage: number) => {
        navigate(`/About/Menu/${selectpage}`)
        dispatch({ type: "setstate", payload: { name: "dataFrompage", value: state.dataFromfetch.slice((Number(selectpage) - 1) * 4, Number(selectpage) * 4) } })
    };


    return (
        <div className="min-h-screen flex flex-col">
            <Navbar1 />
            <div className="grow container w-full flex flex-col">
                {state.Menuadd && <Modal setstatedis={setdatafromprops} state={state} fetch={fetch} nameHeader={"เพิ่มเมนูอาหาร"} button={"create"} />}
                {state.MenuEdit && <Modal setstatedis={setdatafromprops} state={state} fetch={fetch} nameHeader={"แก้ไขเมนูอาหาร"}
                    button={"Update"} />}
                <div className="text-center text-3xl">รายการอาหาร</div>
                <div className="flex justify-end items-center">

                    {getusername() && <div className="justify-self-start grow">
                        <div className="mx-2 btn btn-success" onClick={() => setdatafromprops("Menuadd", true)}>เพิ่มรายการอาหาร </div>
                    </div>}

                    <div className="lg:w-1/2 flex">
                        <input type="text" className="border w-full text-center rounded-xl" placeholder="SeachData....." onChange={(e) => {
                            finddata(e.target.value)
                        }} />
                        <select className="flex border w-40 rounded-xl text-yellow-500" onChange={(e: any) => Findfromrating(e.target.value)}>
                            <option value={0}>All rating</option>
                            <option value={1} className="text-yellow-500">★ 1</option>
                            <option value={2} className="text-yellow-500">★ 2</option>
                            <option value={3} className="text-yellow-500">★ 3</option>
                            <option value={4} className="text-yellow-500">★ 4</option>
                            <option value={5} className="text-yellow-500">★ 5</option>
                        </select>

                    </div>
                </div>



                <div className="grow sm:flex sm:flex-wrap sm:justify-center sm:items-center md:flex md:flex-wrap md:justify-start md:items-center lg:flex lg:flex-wrap lg:justify-start lg:items-center">
                    {state.dataFrompage.map((data: any, index: number) => {
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
                                        <div>
                                            {`(${data.ratingofFood.length})`}
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
                                        <img src={data.imgfile} alt="Preview" className="max-w-xs rounded shadow  h-48 w-60" />
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <div className="items-end  flex justify-start" >
                                            <Link to={`/About/Menu/detail/${data._id}`} className="btn btn-dark my-2 justify-self-end">อ่านรายระเอียด</Link>
                                        </div>
                                        {getusername() === data.nameUser && <div className="grow flex justify-end">
                                            <div className="items-center  flex justify-center">
                                                <div className="mx-2 btn btn-success" onClick={() => {
                                                    setdatafromprops("MenuEdit", true)
                                                    setdatafromprops("dataforEdit", data)
                                                }}>✐</div>
                                                {/* <div className="mx-2 btn btn-danger">ลบรายการอาหาร</div> */}
                                            </div>
                                            <div className="items-end  flex justify-start" >
                                                <div className="btn btn-danger my-2 justify-self-end S" onClick={() => { deleteMenu(data._id) }}>✄</div>
                                            </div>
                                        </div>
                                        }

                                    </div>

                                </div>

                            </div>
                        )

                    })}
                </div>


                <div className="w-full flex justify-center items-center">

                    <Pagination
                        currentPage={Number(page)}
                        totalPages={Math.floor(Number(state.dataFromfetch.length) / 4) + 1}
                        onPageChange={handlePageChange}
                    />
                </div>


            </div >

            <Footer />
        </div>
    )
}

export default MenuCrud




