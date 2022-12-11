import spinner from '../../assets/images/spinner.svg'

const formControl = "w-full h-[48px] rounded-md"
const error = "border-red-800"

function buttonColor(color) {
  if (!color) {
    return "bg-white text-black"
  }

  if (color === 'success') {
    return "bg-green-700 text-white"
  }

  if (color === 'danger') {
    return "bg-red-700 text-white"
  }
}

export const Input = ({ isError, errorText, fullWidth, ...rest }) => {
  return (
    <div className={`my-2 ${fullWidth ? 'w-full' : ''}`}>
      <input
        className={`${formControl} ${fullWidth ? 'w-full' : ''} px-3 mb-1 bg-zinc-800 border-2 border-zinc-700 ${isError ? error : ''}`}
        {...rest}
      />
      {isError && errorText && <div className="font-light text-sm text-zinc-200">{errorText}</div>}
    </div>
  )
}

export const Button = ({ children, loading, inline, color, ...rest }) => {
  return (
    <button disabled={loading} className={`${formControl} ${inline ? 'inline-flex w-auto' : 'flex'} ${buttonColor(color)} justify-center items-center px-3 gap-1 font-bold text-lg hover:opacity-90`} {...rest}>
      {loading && <img src={spinner} alt="loading" width="28" />} {children}
    </button>
  )
}

export const Select = ({ items, loading, isError, ...rest }) => {
  return (
    <div className="my-2">
      <select disabled={loading} className={`${formControl} px-3 mb-1 bg-zinc-800 border-2 border-zinc-700 ${isError ? error : ''}`} {...rest}>
        {loading && <img src={spinner} alt="loading" width="28" />} {items.map(({ label, value, ...rest }) => {
          return (
            <option value={value} {...rest}>{label}</option>
          )
        })}
      </select>
    </div>
  )
}
