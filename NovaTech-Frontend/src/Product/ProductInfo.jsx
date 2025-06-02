import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

export const ProductInfo = ({ item }) => {
    const navigate=useNavigate()
    const handleDownload = async () => {
        console.log('item',item.pdf)
        if (item?.pdf) {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/download/${item?.pdf}`, {
                    responseType: "blob"
                });

                const blob = new Blob([response.data], { type: "application/pdf" });
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "certificate.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {

                console.log(error)
                Swal.fire({
                    title:"Download failed",
                    text:error.message,
                    icon:"error"
                })
            }
        }

        // await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/hello`)
        // .then((res)=>console.log(res.data))
        // .catch((err)=>console.log(err))

       

    };


    return (
        <div className='space-y-3 mb-20'>
            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" defaultChecked />
                <div className="collapse-title font-semibold text-lg ">Technical Specifications</div>
                <div className='collapse-content list-none font-semibold text-sm text-gray-700'>
                    {
                        typeof (item?.techSpec) == 'object' && item?.techSpec?.map((ele, index) => {
                            return (
                                <li key={index} >{Object.keys(ele)[0]}: [ {Object.values(ele)[0]} ] </li>
                            )
                        })
                    }

                </div>
            </div>
            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold  text-lg">Documents</div>
                {
                    item?.pdf ?

                        (
                            <div className="collapse-content text-sm  cursor-pointer group flex space-x-2" >
                                <p className='group-hover:underline text-blue-500 ' onClick={()=>window.location.href=(item?.pdf)} >PDF</p>
                                <FontAwesomeIcon icon={faDownload} size='lg' >

                                </FontAwesomeIcon>
                            </div>
                        )
                        :
                        (

                            <div className="collapse-content text-sm  cursor-pointer group flex space-x-2">
                                <p className=' text-blue-500 '> PDF Not Available 😞</p>

                            </div>
                        )

                }


            </div>

        </div>
    )
}
