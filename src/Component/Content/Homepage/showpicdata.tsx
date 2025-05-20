import { Link } from "react-router-dom"
const ShowData = (props: any) => {
    return (<>
        <div className=" p-2 rounded-xl lg:w-1/4 md:w-1/2 md:w-full">
            <div className="border p-3 rounded-xl">
                <div className="flex justify-center flex-col items-center">
                    <Link to={`/About/Menu/detail/${props.state[props.index]._id}`}><img src={props.state[props.index].imgfile} className="borderimage-hover rounded-xl h-48 w-auto"></img></Link>
                    <div className="flex justify-between w-full px-3">
                        <div>{props.state[props.index].nameofFood}</div>
                        <div className="text-yellow-500">(★{props.state[props.index].SuumratingofFood})</div>
                    </div>
                </div>
            </div>



        </div>
    </>)
}

export default ShowData