import { Link } from "react-router-dom"
const ShowData = (props: any) => {
    return (<>
        <div className=" p-2 rounded-xl lg:w-1/4 md:w-1/2 md:w-full">
            <div className="border p-3 rounded-xl">
                <div className="flex justify-center flex-col items-center">
                    <Link to="/xxx"><img src={props.img} className="borderimage-hover rounded-xl h-48 w-auto"></img></Link>
                    <div className="flex justify-center">
                        <div>ส้มตำ</div>
                        <div>(rating)</div>
                    </div>
                </div>
            </div>



        </div>
    </>)
}

export default ShowData