export const ContainerButton = (props: {
  title: any
  onChange?: React.MouseEventHandler<HTMLButtonElement>
}) => {
  return (
    <button
      className="ml-2 w-8 h-8 text-xs text-gray-500 bg-white rounded-full shadow flex items-center justify-center
      dark:bg-transparent dark:border-2 dark:border-white dark:border-opacity-40
    hover:border-[2px] hover:border-solid hover:border-[rgba(112,76,182,0.4)]
    focus:border-[2px] focus:border-solid focus:border-[rgba(112,76,182,0.4)]
    active:bg-[rgba(112,_76,_182,_0.2)]"
      onClick={props.onChange}
    >
      {props.title}
    </button>
  )
}
