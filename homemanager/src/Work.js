import HeartRateGraph from './shared-components/HeartRateGraph';
import SettingCard from './shared-components/SettingCard';
import HomeButton from './shared-components/HomeButton';
import Popup from './shared-components/Popup';
import BrightnessSlider from './shared-components/BrightnessSlider';
import HardcodeLevel from './shared-components/HardcodeLevel'
import SedentaryCard from './shared-components/SedentaryCard';
import CalendarCard from './shared-components/CalendarCard';
import { useState, useEffect } from 'react';

const Work = () => {
    const [hrvValue, setHrvValue] = useState(0);
    const [luminosity, setLuminosity] = useState(0);
    const [isSitting, setIsSitting] = useState(true);
    const [isWarm, setIsWarm] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [popupTimeout, setPopupTimeout] = useState(null);

    useEffect(() => {
        const fetchHRV = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/hrv');
                if (!response.ok) {
                    throw new Error('Arudino unable to communicate. Reverting to hardcoded value');
                }
                const data = await response.json();
                setHrvValue(data.hrv);
            } catch (error) {
                // resorting to hardcoded value if API isn't able to connect to arduino 
                setHrvValue(42);
                console.error('Error fetching HRV:', error);
            }
        };

        const fetchLight = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/luminosity');
                if (!response.ok) {
                    throw new Error('Arudino unable to communicate. Reverting to hardcoded value');
                }
                const data = await response.json();
                setLuminosity(data.luminosity);
                setIsWarm(data.isWarm);
            } catch (error) {
                // resorting to hardcoded value if API isn't able to connect to arduino 
                setLuminosity(200);
                setIsWarm(false);
                console.error('Error fetching luminosity:', error);
            }
        };

        const fetchIsSitting = async() => {
            try {
                const response = await fetch('http://localhost:3001/api/sitting');
                if (!response.ok) {
                    throw new Error('Arudino unable to communicate. Reverting to hardcoded value');
                }
                const data = await response.json();
                setIsSitting(data.isSitting);
            } catch (error) {
                // resorting to hardcoded value if API isn't able to connect to arduino 
                setIsSitting(true);
                console.error('Error fetching sitting data:', error);
            }
        }

        fetchHRV();
        fetchLight();
        fetchIsSitting();

        // Interval fetches HRV every 2 seconds
        const hrvInterval = setInterval(fetchHRV, 2000);

        // Interval fetches luminosity every 2 seconds
        const luminosityInterval = setInterval(fetchLight, 5000);

        // Interval fetches Sitting Data every 2 seconds
        const sittingInterval = setInterval(fetchIsSitting, 2000);

        // Cleanup interval on unmount
        return () => {
            clearInterval(hrvInterval);
            clearInterval(luminosityInterval);
            clearInterval(sittingInterval);
        };
    }, []);

    useEffect(() => {
        if (hrvValue < 50 && !popupTimeout) {
            setShowPopup(true);
        }
    }, [hrvValue, popupTimeout]);

    const handleClosePopup = () => {
        setShowPopup(false);
        // POPUP ONLY APPEARS EVERY 20 minutes- PREVENTS ANNOYING THE USER
        const timeout = setTimeout(() => {
            setPopupTimeout(null);
        }, 20 * 60 * 1000); 
        setPopupTimeout(timeout);
    };

    const handleAcceptChanges = async() => {
        handleClosePopup();
        try {
            setLuminosity(100);
            const response = await fetch('http://localhost:3001/api/luminosity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newLuminosity: luminosity, warmthOn: isWarm }),
            });
      
            if (!response.ok) {
                throw new Error('Arudino unable to communicate.');
            }
            const data = await response.json();
            console.log('Success:', data);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const settings = [
        {
            "name": "Lighting", 
            "emoji": "💡",
            "description": "Ensure the lighting will maximise your productivity",
            "children": <BrightnessSlider luminosity={luminosity} onLuminosityChange={setLuminosity} isWarm={isWarm} onWarmthChange={setIsWarm}/>
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
                <div className="ml-12 flex flex-col space-y-6">
                    <SedentaryCard
                        sittingOrStanding={isSitting ? 'Sitting': 'Standing'}/>
                    <CalendarCard/>
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