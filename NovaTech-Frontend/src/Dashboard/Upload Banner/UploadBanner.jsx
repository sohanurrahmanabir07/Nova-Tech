import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useOutletContext } from 'react-router'
import Swal from 'sweetalert2'


export const UploadBanner = () => {
  const updateBanner = useRef(null)
  const { setBanners } = useOutletContext()

  const admin = useSelector((state) => state.NovaTech.users)


  const [Files, setFiles] = useState([])
  const [Loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')





  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFiles(files);
  };


  const handleSubmit = (e) => {
    e.preventDefault()
    if (admin) {
      let formData = new FormData()
      if (Files && title && description) {
        const info = {
          title,
          description
        }
        for (let image of Files) {
          formData.append('images', image)
        }

        formData.append('info', JSON.stringify(info));

        setLoading(true)
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/uploadBanner`, formData)
          .then((res) => {
            console.log('res', res.data)
            if (res.status == 200) {
              setBanners(res.data.data)
              Swal.fire({
                icon: "success",
                title: res.data.message


              });


            }
            setFiles([])
            updateBanner.current.value = null




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
    setFiles([])
    setTitle('')
    setDescription('')
    updateBanner.current.value = null
    document.getElementById('uploadBanner').checked = false


  }






  return (
    <div>
      <input type="checkbox" id="uploadBanner" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box relative space-y-4">
          <div className="modal-action absolute right-2 -top-7" onClick={handleClose}>
            {/* <label htmlFor="uploadLogo" ><FontAwesomeIcon icon={faXmark} size='lg' className='cursor-pointer' ></FontAwesomeIcon></label> */}
            <FontAwesomeIcon icon={faXmark} size='lg' className='cursor-pointer' ></FontAwesomeIcon>
          </div>




          {/* ___________________________________________________form_______________________________ */}

          <div>
            <h1 className='text-center text-3xl text-gray-800'>Banner Upload</h1>
          </div>

          <div className='w-full bg-base-200 rounded-lg p-5'>
            <label className="label">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="input w-full" placeholder="My awesome page" />

            <label className="label">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="textarea w-full" placeholder="Bio"></textarea>
            <label className="label">Image</label>
            <div className='border-1 p-2 text-lg text-gray-500 rounded-lg'>
              <input type="file" accept='image/*' onChange={handleFileChange} ref={updateBanner} name="" id="" />
            </div>
          </div>







          <div className='text-center'>
            <button disabled={Files.length == 0 || Loading || !title || !description} onClick={handleSubmit} className='btn btn-secondary btn-dash'>{Loading ? (<p>Uploading...</p>) : (<p>Upload</p>)}</button>
          </div>
        </div>
      </div>

    </div>
  )
}
