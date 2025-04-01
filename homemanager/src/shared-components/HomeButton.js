
import { Link } from "react-router-dom";


// text-right mr-auto flex flex-1 items-center px-2 py-2
const HomeButton = () => {

    return (
        <Link to="/" className="flex flex-row text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 cursor-pointer">
            <svg 
                stroke="currentColor" 
                fill="currentColor" 
                stroke-width="0" 
                viewBox="0 0 20 20" 
                className="w-5 h-5"
                aria-hidden="true" 
                height="1em" 
                width="1em" 
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" 
                clip-rule="evenodd">
                </path>
            </svg>
            Back to Mode Select

       
        </Link>
    )
    
}

export default HomeButton;