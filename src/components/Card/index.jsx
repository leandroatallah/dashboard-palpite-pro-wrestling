const Card = ({ children, className, ...rest }) => {
  return (
    <div className={`bg-cardDark p-6 rounded-xl ${className}`} {...rest}>
      {children}
    </div>
  )
}

export default Card
