import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faAdjust } from '@fortawesome/free-solid-svg-icons';

const Popup = ({ onClose, onAccept}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-lg">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Hi There!
                </h3>
                <button type="button" 
                    class="text-red-400 bg-transparent hover:bg-red-200 hover:text-red-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={onClose}>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            
            <div class="text-left p-4 md:p-5 space-y-4">
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                We've noticed your HRV is low. Your demographic profile indicates that an HRV under 50 might could indicate that you are under some stress. The system suggests the following changes:
                </p>
                <ul className="text-left space-y-4 mb-6 flex flex-col text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    <li>
                        <FontAwesomeIcon icon={faLightbulb} className="text-yellow-500 mr-2" />
                        Decrease lighting to a softer luminosity
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faAdjust} className="text-orange-500 mr-2" />
                        Adjust light color to a warmer shading
                    </li>
                </ul>
            </div>
            
            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button onClick={onAccept} type="button" class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Accept changes</button>
                <button onClick={onClose} type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline changes</button>
            </div>
        </div>
        </div>



    );
};


// <h3 className="text-xl mb-4">We've noticed your HRV is low. Your demographic profile indicates that an HRV under 50 might could indicate that you are under some stress. The system suggests the following changes:</h3>
//                 <ul className="space-y-4 mb-6 flex flex-col items-center">
//                     <li className="text-lg">
//                         <FontAwesomeIcon icon={faLightbulb} className="text-yellow-500 mr-2" />
//                         Decrease lighting to a softer luminosity
//                     </li>
//                     <li className="text-lg">
//                         <FontAwesomeIcon icon={faAdjust} className="text-orange-500 mr-2" />
//                         Adjust light color to a warmer shading
//                     </li>
//                 </ul>

export default Popup;