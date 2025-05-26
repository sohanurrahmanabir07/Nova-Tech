import React from 'react'
import { useNavigate, useOutletContext } from 'react-router'
import { capitalizeWords, urlConverter } from '../../Functions/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ImageUpload } from '../FileUpload/ImageUpload';
import { ImageModal } from '../FileUpload/ImageModal';

export const DashboardCategories = () => {
    const categories = useOutletContext().categories;
    const navigate = useNavigate();

    const handleClick = (item) => {
        navigate(`/category/${urlConverter(item?.name)}`);
    };

    return (
        <div className='md:mx-4 my-2 space-y-3 px-2 '>

            <label htmlFor="my_modal_3" className='btn text-lg font-semibold '>
                Add New Category <FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon>
            </label>

           {/* <ImageUpload></ImageUpload> */}

           <ImageModal></ImageModal>

            <section className='flex flex-wrap gap-4'>



                {
                    categories && categories.map((item, index) => {
                        return (
                            <div key={index} onClick={() => handleClick(item)} className="card cursor-pointer relative bg-base-100 md:w-90 rounded-md overflow-hidden  shadow-sm">
                                <figure>
                                    <img
                                        src={item?.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'}
                                        alt="Shoes" className='aspect-[3/2] hover:scale-105 duration-150 transition-all ease-in-out object-cover'
                                    />


                                </figure>

                                <p className='absolute bottom-2 left-2 font-semibold text-xl text-gray-300 '>{item?.name}</p>

                            </div>
                        )
                    })
                }



            </section>
        </div>
    );
};

