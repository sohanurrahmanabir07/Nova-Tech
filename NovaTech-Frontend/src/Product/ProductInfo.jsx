import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const ProductInfo = ({item}) => {

    return (
        <div className='space-y-3 mb-20'>
            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" defaultChecked />
                <div className="collapse-title font-semibold text-lg ">Technical Specifications</div>
                <div className='collapse-content list-none font-semibold text-sm text-gray-700'>
                    {
                        Object.keys(item?.techSpec).map((obj_key,index)=>{
                            return(
                                <li key={index} >{obj_key}: [ {item?.techSpec[obj_key]} ] </li>
                            )
                        })
                    }

                </div>
            </div>
            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold  text-lg">Documents</div>
                <div className="collapse-content text-sm  cursor-pointer group flex space-x-2">
                   <p className='group-hover:underline text-blue-500 '> Download PDF</p>  
                   <FontAwesomeIcon icon={faDownload} size='lg' >
                    
                    </FontAwesomeIcon>
                </div>
            </div>

        </div>
    )
}
