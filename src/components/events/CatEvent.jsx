import Image from 'next/image'
import Link from 'next/link'

export const CatEvent = ({data, name}) => {
  return (
    <div className='cat_events'>
      <h1>Events in {name}</h1>
      <div className='content'>
        {
          data.map((ev) => (
            <Link className='card' key={ev.id} href={`/events/${ev.city}/${ev.id}`}>
              <Image width={300} height={300} alt={ev.title} src={ev.image} />
              <h2>{ev.title}</h2>
              <p>{ev.description}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}