import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../../App";
import IndexPage from "../Content/IndexPage/IndexPage";
import Home from "../Content/Homepage/Home";
import Login from "../Content/Loginreg/Login";
import Register from "../Content/Loginreg/Register";
import Forgetpassword from "../Content/Loginreg/Forgetpassword";
import Personel from "../Content/Homepage/Personal";
import RedirectHome from "../Content/Private_redirect/RedirectHome";
import MenuCrud from "../Content/MenuFood/menu";
import Detailmenu from "../Content/MenuFood/Detailmenu";

const Myrouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Home} />
                <Route path="/Index" Component={IndexPage} />                
                <Route path="/Homepage" Component={Home} />
                <Route path="/Login" element={<RedirectHome Component={Login}/>}/>
                <Route path="/Register" element={<RedirectHome Component={Register}/>}/>   
                <Route path="/Forgetpassword" Component={Forgetpassword} />                
                <Route path="/About/Personel" Component={Personel} />
                <Route path="/About/Menu" Component={MenuCrud} />
                <Route path="/About/Menu/detail/:id" Component={Detailmenu} />
            </Routes>
        </BrowserRouter>

    )
}

export default Myrouter;