import { useState } from 'react'
import axios from 'axios'

import '../App.css'

async function postImage({ image, description }) {
  const formData = new FormData()
  formData.append('demo_file', image)
  formData.append('description', description)

  const result = await axios.post('http://localhost:3000/post_file', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return result.data
}

function Aws() {
  const [file, setFile] = useState()
  const [description, setDescription] = useState('')
  const [images, setImages] = useState([])

  const submit = async (event) => {
    event.preventDefault()
    const result = await postImage({ image: file, description })
    setImages([result.image, ...images])
  }
  console.log(images, 'images')

  const fileSelected = (event) => {
    const file = event.target.files[0]
    setFile(file)
  }

  return (
    <div className='Aws'>
      <form onSubmit={submit}>
        <input onChange={fileSelected} type='file' accept='image/*'></input>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type='text'></input>
        <button type='submit'>Submit</button>
      </form>

      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={image}></img>
        </div>
      ))}

      <img
        src='http://localhost:3000/get_file/1654630707146.jpg'
        alt='link'></img>
    </div>
  )
}

export default Aws
