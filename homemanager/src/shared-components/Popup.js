import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faAdjust } from '@fortawesome/free-solid-svg-icons';

const Popup = ({ onClose, onAccept}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-lg max-w-lg">
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
            </div>
        </div>
    );
};

export default Popup;