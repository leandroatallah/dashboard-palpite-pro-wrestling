import spinner from '../../assets/images/spinner.svg'

const formControl = "w-full h-[48px] rounded-md"
const error = "border-red-800"

export const Input = ({ isError, errorText, ...rest }) => {
  return (
    <div className="my-2">
      <input
        className={`${formControl} px-3 mb-1 bg-zinc-800 border-2 border-zinc-700 ${isError ? error : ''}`}
        {...rest}
      />
      {isError && errorText && <div className="font-light text-sm text-zinc-200">{errorText}</div>}
    </div>
  )
}


export const Button = ({ children, loading, ...rest }) => {
  return (
    <button disabled={loading} className={`${formControl} flex justify-center items-center gap-1 bg-white text-black font-bold text-lg`} {...rest}>
      {loading && <img src={spinner} alt="loading" width="28" />} {children}
    </button>
  )
}
