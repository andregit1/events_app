import React, {useRef, useState} from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

export const SingleEvent = ({data}) => {

  const inputEmail = useRef()
  const router = useRouter()
  const [message, setMessage] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const emailVal = inputEmail.current.value
    const eventId = router?.query.id

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailVal.match(validRegex)) {
      setMessage('Please introduce a correct email address');
    }
    
    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailVal, eventId
        })
      })

      if (!response.ok) throw new Error(`Error: ${response.status}`)
      const data = await response.json();
      console.log('POST', data)
      setMessage(data.message);
      inputEmail.current.value = '';
    } catch (error) {
      console.log('ERROR'. error)
    }
  }

  return (
    <div className='event_single_page'>
      <h2>{data.title}</h2>
      <Image width={1000} height={500} alt={data.title} src={data.image} />
      <p>{data.description}</p>

      <form onSubmit={onSubmit} className='email_registration'>
        <label>Get Registered for this event</label>
        <input ref={inputEmail} type="email" id='email' placeholder='your email' />
        <button >submit</button>
      </form>

      <p>{message}</p>
    </div>
  )
}