import Navbar1 from "../Navbar/Navbar1"
import Footer from "../Footer/Footer"
import Modal from "./Addmenu"
import { useReducer } from "react"


const MenuCrud = () => {

    const initials = {
        Menuadd: false
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

    return (
        <>
            <Navbar1 />
            <div className="grow container w-full flex flex-col">
                {state.Menuadd && <Modal setstatedis={setdatafromprops}/>}
                <div className="text-center text-3xl" >จัดการรายการอาหาร</div>
                <div className="flex justify-start">
                    <div className="mx-2 btn btn-success" onClick={() => setdatafromprops("Menuadd",true)}>เพิ่มรายการอาหาร </div>
                    {/* <div className="mx-2 btn btn-danger">ลบรายการอาหาร</div> */}
                </div>
                <div className="border my-2"></div>
                <div className="table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ลำดับ</th>
                                <th>ขื่อเมนู</th>
                                <th>ภาพเเสดง</th>
                                <th>ราคา</th>
                                <th>แก้ไขรายการ</th>
                                <th>ลบรายการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>






            </div >

            <Footer />
        </>
    )
}

export default MenuCrud