import { useEffect, useReducer, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar1 from "../Navbar/Navbar1";
import Footer from "../Footer/Footer";
import axios from "axios";
import { authenticate } from "./Service_login"
import Swal from 'sweetalert2'
import ReCAPTCHA from "react-google-recaptcha";


const Login = () => {
    const massage_login = useRef<any>(null)
    const navigate = useNavigate();

    const initials = {
        username: "",
        password: "",
        show_password: false,
        style_error_login: "",
        recapcha: ""
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
    const showpassword = state.show_password ? "text" : "password"

    const Login = (e: any) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API}/Login`, { username: state.username, password: state.password })
            .then((res) => {
                if (res.data.res === "เข้าสู่ระบบสำเร็จ") {
                    authenticate(res, () => {
                        Swal.fire({
                            title: 'ลงชื่อเข้าใช้สำเร็จ!',
                            text: `ยินดีต้อนรับ ${res.data.username}`,
                            icon: 'success',
                        })
                            .then(async () => {
                                massage_login.current.textContent = ""
                                await dispatch({
                                    type: "setstate",
                                    payload: { name: "style_error_login", value: "" }
                                })
                                await navigate("/Homepage")
                            })
                    })
                }
                // เข้าสู่ระบบไม่สำเร็จ
                else {
                    Swal.fire({
                        title: 'เข้าสู่ระบบล้มเหลว!',
                        text: `ชื่อผู้ใช้/รหัสผ่านไม่ถูกต้อง`,
                        icon: 'error',
                    })
                        .then(() => {
                            massage_login.current.textContent = "ชื่อผู้ใช้/รหัสผ่านไม่ถูกต้อง"
                            dispatch({
                                type: "setstate",
                                payload: { name: "style_error_login", value: "text-sm bg-red-200 py-2 px-2 rounded-xl" }
                            })
                        })
                }
            }
            )
    }


    useEffect(() => {
        document.title = 'เข้าสู่ระบบ | Login';
    }, [])


    const recaptcha = (token: any) => {

        dispatch({
            type: "setstate",
            payload: { name: "recapcha", value: token }
        })
    }
    return (
        <>
            <div className="border container-class flex flex-col">
                <Navbar1 />
                <div className="h-full window-login shrink container">
                    <div className="sub-window-login">
                        <div className="text-2xl my-4">ลงชื่อเข้าใช้</div>
                        <div ref={massage_login} className={`${state.style_error_login}`}></div>
                        <div>
                            <form onSubmit={Login}>
                                <div className="my-3">
                                    <div>ชื่อผู้ใช้</div>
                                    <input type="text" required onChange={e => dispatch({
                                        type: "setstate",
                                        payload: { name: "username", value: e.target.value }
                                    })} />
                                </div>
                                <div className="my-3" >
                                    <div>รหัสผ่าน</div>
                                    <input type={showpassword} required onChange={e => dispatch({ type: "setstate", payload: { name: "password", value: e.target.value } })} />
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" className="w-3 h-3 mx-2" onChange={e => dispatch({
                                        type: "setstate",
                                        payload: { name: "show_password", value: e.target.checked }
                                    })} />
                                    <div className="mx-2">แสดงรหัสผ่าน</div>
                                </div>

                                {/* <div className="mt-2">
                                    <ReCAPTCHA
                                        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                        onChange={recaptcha}
                                    />                                    
                                </div> */}
                                <div className="mt-2">
                                    <ReCAPTCHA
                                        sitekey="6LdH9EArAAAAAEtjhavRjNmNPMPffMGcqvMoWryD"
                                        onChange={recaptcha}
                                    />                                    
                                </div>

                                {state.recapcha && <div className="flex justify-center w-full mt-4">
                                    <button className="mx-4 border w-full text-center p-2 rounded-xl 
                                    bg-green-400 hover:cursor-pointer hover:text-slate-50" data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                    >เข้าสู่ระบบ</button>
                                </div>}
                            </form>

                            <hr></hr>
                            <div className="flex justify-center mb-10">
                                <Link to={"/Register"} className="mx-3 hover:text-yellow-50 
                                    hover:cursor-pointer no-underline">ลงทะเบียน</Link>
                                <Link to={"/Forgetpassword"} className="mx-3 hover:text-yellow-50 
                                    hover:cursor-pointer no-underline">ลืมรหัสผ่าน</Link>
                            </div>

                        </div>
                    </div>

                </div>
                <Footer />
            </div>




        </>
    )
}

export default Login