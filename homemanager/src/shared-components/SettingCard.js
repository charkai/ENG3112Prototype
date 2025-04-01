

const SettingCard = ({emoji, name, description, children}) => {
    return (
        <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h5 class="mb-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">{emoji}</h5>
            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{name}</h5>
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">{description}</p>
            {children}
        </div>
    )
}   

export default SettingCard;