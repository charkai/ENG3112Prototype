import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faAdjust } from '@fortawesome/free-solid-svg-icons';

const Popup = ({ onClose, onAccept}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            {/* <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg">
                <div className="flex flex-row items-center justify-between mb-4">
                    <h2 className="text-2xl">Hi There!</h2>
                    <button onClick={onClose} className="flex flex-row text-xl font-medium text-red-700 rounded-md hover:text-red-900 cursor-pointer">
                        <svg 
                            stroke="currentColor" 
                            fill="currentColor" 
                            stroke-width="0" 
                            viewBox="0 0 20 20" 
                            className="w-7 h-7"
                            aria-hidden="true" 
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                            clip-rule="evenodd"></path>
                        </svg>
                        Close and Deny Changes
                    </button>
            </div>
                <h3 className="text-xl mb-4">We've noticed your HRV is low. Your demographic profile indicates that an HRV under 50 might could indicate that you are under some stress. The system suggests the following changes:</h3>
                <ul className="space-y-4 mb-6 flex flex-col items-center">
                    <li className="text-lg">
                        <FontAwesomeIcon icon={faLightbulb} className="text-yellow-500 mr-2" />
                        Decrease lighting to a softer luminosity
                    </li>
                    <li className="text-lg">
                        <FontAwesomeIcon icon={faAdjust} className="text-orange-500 mr-2" />
                        Adjust light color to a warmer shading
                    </li>
                </ul>
                <button onClick={onAccept} className="mt-4 px-4 py-2 bg-purple-700 text-white rounded">Accept changes?</button>
            </div> */}
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