export const TextField = (props: {
  label: any
  value: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}) => {
  const { label, value, onChange } = props

  return (
    <div>
      <div className="relative bg-white bg-opacity-20 dark:bg-[#1A1A1A] dark:bg-opacity-40 rounded-[20px] xs:rounded-lg">
        <input
          className="block p-4 w-full xs:h-[40px] h-[60px] appearance-none bg-transparent focus:outline-none"
          value={value}
          onChange={onChange}
        />
        <label className="absolute top-0 text-sm py-6 px-4 -translate-y-6 text-black dark:text-white scale-75 text-opacity-40 dark:text-opacity-40">
          {label}
        </label>
      </div>
    </div>
  )
}
