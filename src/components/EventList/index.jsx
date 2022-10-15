import { Link } from "react-router-dom"

const EventItem = ({ thumb, title, date, description, link = '#', className, ...rest }) => {
  return (
    <div className={`flex rounded-2xl overflow-hidden bg-cardDark ${className}`}>
      <Link to={link} className={`min-w-[160px] w-4/12 bg-cover bg-center`} style={{ backgroundImage: `url(${thumb})` }} />
      <div className="w-8/12 p-5">
        <div className="text-lg font-bold uppercase mb-2">
          <Link to={link}>{title} <br />{date}</Link>
        </div>
        <div className="text-sm text-zinc-400  mb-2">
          {description}
        </div>
        <Link to={link} className="text-sm font-semibold text-fuchsia-600">
          Clique aqui
        </Link>
      </div>
    </div>
  )
}

const EventList = ({ items, direction, isLoading }) => {
  const isColumn = direction === 'column'

  // TODO: Create feedback for loading
  if (isLoading) {
    return (
      <div>Carregando</div>
    )
  }

  return (
    <div className={`gap-6 ${isColumn ? 'flex flex-col' : 'grid grid-cols-2 xl:grid-cols-3'}`}>
      {items?.length > 0 && items.map(item => (
        <EventItem className={isColumn ? "min-column-height" : 'min-h-[200px]'} key={item.title} {...item} />
      ))}
    </div>
  )
}

export default EventList
