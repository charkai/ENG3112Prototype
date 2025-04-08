
import { Link } from "react-router-dom";

const CalendarCard = () => {

    return (
        <div class="flex flex-col p-6 items-center bg-white border border-gray-100 rounded-lg shadow-sm md:flex-row  dark:border-gray-700 dark:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="ml-5 h-32 w-32 mt-2 inline-block stroke-current text-purple-700">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"></rect>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 2v4M8 2v4M3 10h18"></path>
            </svg>
            <div class="flex flex-col justify-between items-center p-4 leading-normal w-full">
                <h5 class="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">You have <span class="text-purple-700">8</span> events in your work calendar today. </h5>
                
                <Link
                    to ="https://calendar.google.com/calendar/u/0/r?pli=1"
                    className="mt-4 px-4 py-2 bg-purple-700 text-white rounded flex flex-row">Go to Google Calendar
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M10 19l7-7-7-7v14z" fill="currentColor"/>
                    </svg>
                </Link>
                
                
            </div>
        </div>
    );
}

export default CalendarCard;