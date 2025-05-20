import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const ProductInfo = () => {
    return (
        <div className='space-y-3 mb-20'>
            <div className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-3" defaultChecked />
                <div className="collapse-title font-semibold text-lg ">Technical Specifications</div>
                <div className='collapse-content list-none font-semibold text-sm text-gray-700'>
                    <li>LineVoltage: [70-100] V</li>
                    <li>Impedance: [4-16] Ohm</li>
                    <li>RatedPower: [30] W</li>
                    <li>Dimension (mm): 253x220x68</li>
                    <li>Weight: 3.9[KG]</li>
                    <li>GrossWeight: 4.2[KG]</li>
                    <li>PanelColor: [Black]</li>
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
