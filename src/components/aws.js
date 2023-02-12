import { useState } from 'react'
import axios from 'axios'

import '../App.css'

async function postImage({ image, description }) {
  const formData = new FormData()
  formData.append('demo_file', image)
  formData.append('description', description)

  const result = await axios.post('http://localhost:4000/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXI1IiwiaWF0IjoxNjc2MjQyMjIwfQ.ZrHxaqgF6pFoQ-eutzSiFlrLq3Cp5DpYnGHdohYt9fA',
    },
  })
  return result.data
}

function Aws() {
  const [file, setFile] = useState()
  const [description, setDescription] = useState('')
  const [data, setData] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    const result = await postImage({ image: file, description })
    setData(result.file.profilePicture)
  }

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

      <img src={data} alt='link'></img>
    </div>
  )
}

export default Aws
