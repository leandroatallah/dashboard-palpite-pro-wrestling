import { Link } from 'react-router-dom'

const SectionTitle = ({ children, link, className, ...rest }) => {
  return (
    <div className={`flex justify-between items-center`}>
      <h2 className={`text-xl font-bold mt-4 mb-2.5 ${className}`} {...rest}>{children}</h2>
      {link?.href && (
        <Link to={link.href} className="font-semibold text-fuchsia-600">{link.label}</Link>
      )}
    </div>
  )
}

export default SectionTitle
