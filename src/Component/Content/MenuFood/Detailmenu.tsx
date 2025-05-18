import Navbar1 from "../Navbar/Navbar1"
import Footer from "../Footer/Footer"
import { useParams } from "react-router-dom"
import { useEffect, useReducer } from "react"
import axios from "axios"
import StarRatings from 'react-star-ratings';
import { Link } from "react-router-dom"
import { getusername } from "../Loginreg/Service_login"
const Detailmenu = () => {
    const { id } = useParams()

    useEffect(() => {
        fetch()
    }, [])

    const initials = {
        Menuadd: false,
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

    const fetch = () => {
        console.log(id)
        axios.post(`${process.env.REACT_APP_API}/FineoneMenu`, { ID: id })
            .then((result: any) => {
                console.log(result)
                dispatch({ type: "setstate", payload: { name: "nameofFood", value: result.data.res.nameofFood } })
                dispatch({ type: "setstate", payload: { name: "ingredient", value: result.data.res.ingredient } })
                dispatch({ type: "setstate", payload: { name: "timeforcook", value: result.data.res.timeforcook } })
                dispatch({ type: "setstate", payload: { name: "Hardforwork", value: result.data.res.Hardforwork } })
                dispatch({ type: "setstate", payload: { name: "reciept", value: result.data.res.reciept } })
                dispatch({ type: "setstate", payload: { name: "imgfile", value: result.data.res.imgfile } })
                dispatch({ type: "setstate", payload: { name: "nameUser", value: result.data.res.nameUser } })
                dispatch({ type: "setstate", payload: { name: "ratingofFood", value: result.data.res.ratingofFood } })
                dispatch({ type: "setstate", payload: { name: "SuumratingofFood", value: result.data.res.SuumratingofFood } })

                let ratingstate = [...result.data.res.ratingofFood]
                let sumrating = 0

                let username = "ไม่ระบุตัวตน"

                if (getusername() !== false) username = getusername()


                if (ratingstate.length > 0) {
                    ratingstate.map((data: any, index: number) => {
                        if (data.name == username) {
                            dispatch({ type: "setstate", payload: { name: "ratingforgive", value: data.rating } })
                        }
                    })
                }

            })

    }
    const setrating = (rating: number) => {
        let ratingstate = [...state.ratingofFood]
        let count = 0
        let username = "ไม่ระบุตัวตน"
        let sumrating = 0
        if (getusername() !== false) username = getusername()
        if (ratingstate.length > 0) {
            ratingstate.map((data: any, index: number) => {
                if (data.name == username) {
                    ratingstate[index].rating = rating
                } else {
                    count++
                }

            })
        }




        if (count === ratingstate.length) { ratingstate.push({ name: username, rating }) }
        dispatch({ type: "setstate", payload: { name: "ratingforgive", value: rating } })
        console.log(rating)
        console.log(ratingstate.length)
        if (ratingstate.length > 0) {
            ratingstate.map((data: any, index: number) => {
                sumrating = data.rating + sumrating
            })
        }
        axios.post(`${process.env.REACT_APP_API}/Updaterating`, { ID: id, ratingofFood: ratingstate, SuumratingofFood: sumrating / ratingstate.length })
            .then((result: any) => {
                fetch()
            })





    }


    return (
        <>
            <Navbar1 />
            <div className="grow container">
                <div className="text justify-center text-center text-xl font-bold"> {`เมนู ${state.nameofFood}`}</div>
                <div className="mt-2 flex justify-center flex-col items-center w-full">
                    <img src={state.imgfile} alt="Preview" width={"100%"} className="max-w-xs rounded shadow" />
                </div>
                <div className="flex">
                    <div className="font-bold"> {`ผู้เผยเเพร่ :`}</div>
                    <div >&nbsp; {`${state.nameUser}`}</div>

                </div>
                <div className="flex">
                    <div className="font-bold"> {`rating : `}</div>
                    <div >&nbsp;{`${Number(state.SuumratingofFood)}`}</div>

                </div>
                <div className="flex">
                    <div className="font-bold"> {`ระดับความยาก : `}</div>
                    <div className="mx-2">
                        <StarRatings
                            rating={Number(state.Hardforwork)}
                            starRatedColor="blue"
                            numberOfStars={3}
                            starDimension={20}
                            name='rating'
                        />
                    </div>
                </div>
                <div className="flex flex-col ">
                    <div className="font-bold"> {`วัตถุดิบ`}</div>
                    <div className="mx-5 border rounded-xl w-full">
                        <pre>{state.ingredient}</pre>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="font-bold"> {`สูตรการทำ`}</div>
                    <div className="mx-5 border rounded-xl w-full">
                        <pre>{state.reciept}</pre>
                    </div>
                </div>
                <div>
                    <div>
                        ให้คะเเนน
                        <div className="mx-2">
                            <StarRatings
                                rating={state.ratingforgive}
                                starRatedColor="blue"
                                changeRating={(index: number) => { setrating(index) }}
                                numberOfStars={5}
                                starDimension={20}
                                name='rating'
                            />
                        </div>
                    </div>

                </div>
                <div className="items-end  flex justify-start" >
                    <Link to={`/About/Menu`} className="btn btn-dark my-2 justify-self-end">กลับหน้าเเรก</Link>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default Detailmenu