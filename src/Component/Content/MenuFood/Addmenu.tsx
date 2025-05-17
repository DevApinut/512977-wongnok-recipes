import React, { useState } from 'react';
import axios from 'axios';
import { getusername } from '../Loginreg/Service_login';
const Modal = (props: any) => {

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {

            props.setstatedis("imgfile", reader.result)
        };
        reader.readAsDataURL(file); // Converts file to base64 string
    };

    const arrangedata = () => {
        axios.post(`${process.env.REACT_APP_API}/MenuCreate`, {
            nameofFood: props.state.nameofFood,
            ingredient: props.state.ingredient,
            reciept: props.state.reciept,
            timeforcook: props.state.timeforcook,
            Hardforwork: props.state.Hardforwork,
            imgfile: props.state.imgfile,
            nameUser: getusername()
        })
            .then((res) => {
                console.log(res)
                props.fetch()
            }
            )
    }

    return (

        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto ">
                    <h2 className="text-xl font-semibold mb-4  text-center">เพิ่มรายการอาหาร</h2>
                    <div className="flex flex-col">
                        <div>ชื่อเมนู</div>
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={(e) => props.setstatedis("nameofFood", e.target.value)} />
                    </div>
                    <div className="flex flex-col ">
                        <div>วัตถุดิบ</div>
                        <textarea className="border " onChange={(e) => props.setstatedis("ingredient", e.target.value)}></textarea>
                        <div className='text-sm text-red-200'>โปรดระบุเป็นข้อเช่น 1.เทน้ำมัน 2.นวดแป้ง</div>
                    </div>
                    <div className="flex flex-col ">
                        <div>สูตรอาหาร</div>
                        <textarea className="border " onChange={(e) => props.setstatedis("reciept", e.target.value)}></textarea>
                    </div>
                    <div className="flex flex-col">
                        <div>ระยะเวลาในการปรุง</div>
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={(e) => props.setstatedis("timeforcook", e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                        <div>ความยากง่ายในการปรุง</div>
                        <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={(e) => props.setstatedis("Hardforwork", e.target.value)}
                            min={1} // Set the min attribute
                            max={3} />
                        <div className="text-sm text-red-200">** 1 ง่าย 2 ปานกลาง 3 ยาก</div>
                    </div>
                    <div className="flex flex-col">
                        <div>ภาพเเสดงเมนูอาหาร</div>
                        <input type="file" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={handleFileChange} />
                        {props.state.imgfile !== "" && <div className="mt-4 w-full flex justify-center flex-col items-center">
                            <img src={props.state.imgfile} alt="Preview" className="max-w-xs rounded shadow" />
                            <div>ภาพเเสดง</div>
                        </div>}

                    </div>

                    <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-blue-700 mx-2"
                        onClick={arrangedata}
                    >Create</button>
                    <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={() => props.setstatedis("Menuadd", false)}
                    >Close</button>
                </div>
            </div>
        </>
    )
}
export default Modal