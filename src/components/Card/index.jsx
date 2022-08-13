const Card = ({ children, className, ...rest }) => {
  return (
    <div className={`bg-cardDark p-6 rounded-xl ${className}`}>
      {children}
    </div>
  )
}

export default Card
