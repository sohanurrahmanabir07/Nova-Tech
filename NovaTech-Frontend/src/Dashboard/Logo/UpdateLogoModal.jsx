import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { addLogo } from '../../State Management/NovaStore'

export const UpdateLogoModal = () => {
  const updatelogo = useRef(null)
  const PhotoInputRef = useRef();

  const admin = useSelector((state) => state.NovaTech.users)

  const [imagePath, setImagePath] = useState(null)
  const [File, setFile] = useState(null)
  const [Loading, setLoading] = useState(false)
  const user = useSelector((state) => state.NovaTech.users)
  const dispatch=useDispatch()  
  const logo=useSelector((state)=>state.NovaTech.logo)


  const handleClick = (v) => {

    if (v == 'photo') {
      PhotoInputRef.current.click()
    } else {
      VideoInputRef.current.click()
    }

  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {

      const path = URL.createObjectURL(file)
      setImagePath(path)
      setFile(file)

    } else {
      Swal.fire({
        icon: "error",
        title: "Oops Image Couldnt Select...",
        text: "Something went wrong!",

      });
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault()
    if (admin) {
      let formData = new FormData()
      if (File) {
        console.log('File Selected', File)

        formData.append('images', File)
        formData.append('name', admin?.name)



        setLoading(true)
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/logoUpload`, formData)
          .then((res) => {
            console.log('res', res)
            if (res.status == 200) {
              dispatch(addLogo((res.data.data)))
              Swal.fire({
                icon: "success",
                title: 'Logo Successfully Updated',


              });






            }
            setImagePath(null)
            setFile(null)
            updatelogo.current.value = null




          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: err.message,
              text: "Something went wrong!",

            });
          })
          .finally(() => {
            setLoading(false)  // move this here
          })



      } else {
        Swal.fire({
          icon: "error",
          title: ' No',


        });
      }



    }






  }




  const handleClose = () => {
    setFile(null)
    updatelogo.current.value = null
    setImagePath(null)
    document.getElementById('uploadLogo').checked = false

  }






  return (
    <div> 
      <input type="checkbox" id="uploadLogo" className="modal-toggle" />
      <div className="modal " role="dialog">
        <div className="modal-box bg-white relative space-y-4 ">
          <section className='flex space-x-3'>
            <img loading="lazy" src={` ${logo || `https://banner2.cleanpng.com/20181227/pbb/kisspng-university-of-tennessee-no-logo-no-space-no-choi-5c249c5f60bb11.6709318515459031993962.jpg`} `} alt="" className='w-[50px]' />

            <div className='border-1 p-2 text-lg text-gray-500 rounded-lg'>
              <input type="file" accept='image/*' onChange={handleFileChange} ref={updatelogo} name="" id="" />
            </div>

          </section>
          <div className="modal-action absolute right-2 -top-7" onClick={handleClose}>
            {/* <label htmlFor="uploadLogo" ><FontAwesomeIcon icon={faXmark} size='lg' className='cursor-pointer' ></FontAwesomeIcon></label> */}
            <FontAwesomeIcon icon={faXmark} size='lg' className='cursor-pointer' ></FontAwesomeIcon>
          </div>
          <div className='text-center'>
            <button disabled={!File || Loading} onClick={handleSubmit} className='btn btn-secondary btn-dash'>{Loading ? (<p>Uploading...</p>) : (<p>Upload</p>)}</button>
          </div>
        </div>
      </div>

    </div>
  )
}
