import HeartRateGraph from './shared-components/HeartRateGraph';
import SettingCard from './shared-components/SettingCard';
import HomeButton from './shared-components/HomeButton';
import Popup from './shared-components/Popup';
import BrightnessSlider from './shared-components/BrightnessSlider';
import HardcodeLevel from './shared-components/HardcodeLevel'
import SedentaryCard from './shared-components/SedentaryCard';
import { useState, useEffect } from 'react';

const Work = () => {
    const [hrvValue, setHrvValue] = useState(0);
    const [luminosity, setLuminosity] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [popupTimeout, setPopupTimeout] = useState(null);

    useEffect(() => {
        const fetchHRV = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/hrv');
                const data = await response.json();
                setHrvValue(data.hrv);
            } catch (error) {
                console.error('Error fetching HRV:', error);
            }
        };

        const fetchLuminosity = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/luminosity');
                const data = await response.json();
                setLuminosity(data.luminosity);
            } catch (error) {
                console.error('Error fetching luminosity:', error);
            }
        };

        fetchHRV();
        fetchLuminosity();

        // Interval fetches HRV every 5 seconds
        const hrvInterval = setInterval(fetchHRV, 5000);

        // Interval fetches luminosity every 20 seconds
        const luminosityInterval = setInterval(fetchLuminosity, 20000);

        // Cleanup interval on unmount
        return () => {
            clearInterval(hrvInterval);
            clearInterval(luminosityInterval);
        };
    }, []);

    useEffect(() => {
        if (hrvValue < 50 && !popupTimeout) {
            setShowPopup(true);
        }
    }, [hrvValue, popupTimeout]);

    const handleClosePopup = () => {
        setShowPopup(false);
        const timeout = setTimeout(() => {
            setPopupTimeout(null);
        }, 20 * 60 * 1000); // 20 minutes
        setPopupTimeout(timeout);
    };

    const handleAcceptChanges = () => {
        handleClosePopup();
    };

    const settings = [
        {
            "name": "Lighting", 
            "emoji": "💡",
            "description": "Ensure the lighting will maximise your productivity",
            "children": <BrightnessSlider luminosity={luminosity} onLuminosityChange={setLuminosity} />
        },
        {
            "name": "Temperature", 
            "emoji": "🌡️",
            "description": "Adjust the temperature to your liking",
            "children": <HardcodeLevel description="Currently 25°C"/>
            
        },
        {
            "name": "Noise", 
            "emoji": "🔊",
            "description": "Let's make sure that noise is within acceptable levels",
            "children": <HardcodeLevel description="60 dB (Normal Conversation)"/>
            
        }
    ];

    return (
        <div className="flex flex-col h-screen px-10 pt-2">
            <div className="flex flex-row items-center justify-between p-4">
                <h1 className="text-left text-6xl font-medium text-gray-800 dark:text-gray-100">Welcome to Work Mode</h1>
                <HomeButton />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                {settings.map((setting) => (
                    <SettingCard 
                        key={setting.name}
                        emoji={setting.emoji}
                        name={setting.name}
                        description={setting.description}
                        children={setting.children}
                    />
                ))}
            </div>
            <div className="p-4 flex flex-row">
                <HeartRateGraph hrvValue={hrvValue} />
                <div className="ml-10 flex flex-col">
                    <SedentaryCard/>
                </div>
            </div>
            {showPopup && (
                <Popup 
                    onClose={handleClosePopup} 
                    onAccept={handleAcceptChanges}
                />
            )}
        </div>
    );
};

export default Work;