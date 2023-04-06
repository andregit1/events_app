import Image from 'next/image'
import Link from 'next/link'

export const Events = ({data}) => {
  return (
    <div className='events_page'>
      {
        data.map((ev) => (
          <Link className='card' key={ev.id} href={`/events/${ev.id}`}>
            <Image width={450} height={450} alt={ev.title} src={ev.image} />
            <h2>{ev.title}</h2>
          </Link>
        ))
      }
    </div>
  )
}