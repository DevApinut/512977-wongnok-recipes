
import { Outlet,Routes,Route, redirect,useNavigate,Navigate } from "react-router-dom";
import { getusername, getToken, getpermission } from "../Loginreg/Service_login";


const RedirectHome = ({Component,...prop}:any) => {
    
    if(!getusername()){        
        return <Component {...prop} />        
    }else{        
        return <Navigate to="/Homepage" {...prop} replace />
    }
}

export default RedirectHome


