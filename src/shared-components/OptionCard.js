import { Link } from "react-router-dom"

const OptionCard = ({name, link, emoji}) => {
    return (
        <Link to={link} className="block w-96 h-32 py-2 px-3 text-gray-900 dark:text-white cursor-pointer md:p-0 hover:bg-purple-400 hover:opacity-40 dark:hover:bg-purple-800 hover:text-purple-700 md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover:shadow-lg hover:shadow-gray-400 dark:border-gray-700 rounded-xl mb-10 sm:mb-0 bg-white dark:bg-gray-800 z-10 shadow-md cursor-pointer group">
            <div className="p-6 text-surface align-middle">  
                <h1 className="text-2xl">{name}</h1>
                <h1 className="emoji inline-block transition-transform duration-300 group-hover:animate-spin">{emoji}</h1>
            </div>
        </Link>
    );
}

export default OptionCard;