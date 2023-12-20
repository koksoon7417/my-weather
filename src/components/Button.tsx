export const Button = (props: {
  title: any
  onChange?: React.MouseEventHandler<HTMLButtonElement>
}) => {
  return (
    <button
      className="xs:w-10 xs:h-10 w-[60px] h-[60px] xs:rounded-lg rounded-[20px] xs:text-sm text-3xl text-white bg-[#6C3FB4] dark:bg-[#28124D] flex items-center justify-center
    hover:border-[2px] hover:border-solid hover:border-[rgba(112,76,182,0.4)]
    focus:border-[2px] focus:border-solid focus:border-[rgba(112,76,182,0.4)]
    active:bg-[rgba(112,_76,_182,_0.2)]"
      onClick={props.onChange}
    >
      {props.title}
    </button>
  )
}
