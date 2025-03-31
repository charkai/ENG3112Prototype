import { Link } from "react-router-dom"

const OptionCard = ({name, description, link, emoji}) => {
    return (
        <Link to={link} className="block w-96 py-2 px-3 text-gray-900 dark:text-white cursor-pointer md:p-0 hover:bg-purple-100 dark:hover:bg-purple-800 hover:text-purple-700 md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover:shadow-lg hover:shadow-gray-400 dark:border-gray-700 rounded-xl mb-10 sm:mb-0 bg-white dark:bg-gray-800 z-10 shadow-md cursor-pointer group">
            <div className="p-6 text-surface align-middle">  
                <h1 className="text-3xl">{name}</h1>
                <p className="text-gray-500 text-sm italic pt-2 pb-4">{description}</p>
                <h1 className="emoji text-6xl inline-block transition-transform duration-300 group-hover:animate-spin">{emoji}</h1>
            </div>
        </Link>
    );
}

export default OptionCard;