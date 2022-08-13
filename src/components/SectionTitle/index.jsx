import { Link } from 'react-router-dom'

const SectionTitle = ({ children, link, ...rest }) => {
  return (
    <div className="flex justify-between items-center mt-4 mb-2.5">
      <h2 className="text-xl font-bold" {...rest}>{children}</h2>
      {link?.href && (
        <Link to={link.href} className="font-semibold text-fuchsia-600">{link.label}</Link>
      )}
    </div>
  )
}

export default SectionTitle
