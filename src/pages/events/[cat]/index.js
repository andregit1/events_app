import { CatEvent } from '@/components/events/CatEvent'

const EventCatPage = ({datacity, pageName}) => {
  return (
    <CatEvent data={datacity} name={pageName} />
  )
}

export default EventCatPage;

export async function getStaticPaths() {
  const { events_categories } = await import('../../../../data/data.json')
  
  const allPaths = events_categories.map((ev) => {
    return {
      params: {
        cat: ev.id.toString()
      }
    }
  })
  
  return {
    paths: allPaths,
    fallback: false
  }
}

export async function getStaticProps(context) {
  const id = context?.params.cat
  const { allEvents } = await import('../../../../data/data.json')
  const datacity = allEvents.filter(ev => ev.city === id)

  return {
    props: {datacity, pageName: id}
  }
}
