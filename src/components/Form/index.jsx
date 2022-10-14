export const Input = (props) => {
  return (
    <input className="w-full h-[48px] my-2 px-3 rounded-md bg-zinc-800 border-2 border-zinc-700" {...props} />
  )
}

export const Button = ({ children, ...rest }) => {
  return (
    <button className="w-full h-[48px] my-2 rounded-md bg-white text-black font-bold" {...rest}>
      {children}
    </button>
  )
}
