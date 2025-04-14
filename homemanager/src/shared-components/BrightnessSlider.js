import Slider from '@mui/material/Slider';
import { useState, useEffect } from 'react';

function valuetext(value) {
    return `${value} lumens`;
}

const BrightnessSlider = ({ luminosity, onLuminosityChange, isWarm, onWarmthChange}) => {
    const [localValue, setLocalValue] = useState(luminosity);
    const [localWarm, setLocalWarm] = useState(isWarm);

    useEffect(() => {
        setLocalValue(luminosity);
    }, [luminosity]);

    useEffect(() => {
        setLocalWarm(isWarm);
    }, [isWarm])

    const handleChange = async (event, newLuminosityValue) => {
        setLocalValue(newLuminosityValue);
        try {
            const response = await fetch('http://localhost:3001/api/luminosity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newLuminosity: newLuminosityValue, warmthOn: localWarm}),
            });
            
            if (!response.ok) {
                console.log(response);
                throw new Error('Failed to update light');
            }
        
            // Call the parent's handler if provided
            if (onLuminosityChange) {
                onLuminosityChange(newLuminosityValue);
            }
        
        } catch (error) {
            console.error('Error updating luminosity:', error);
            // Revert to previous value on error
            setLocalValue(luminosity);
        }
    };

    const handleWarmthChange = async (event) => {
        const newWarmthValue = event.target.checked;
        setLocalWarm(newWarmthValue);
        try {
            const response = await fetch('http://localhost:3001/api/luminosity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newLuminosity: localValue, warmthOn: newWarmthValue}),
            });
            
            if (!response.ok) {
                console.log(response);
                throw new Error('Failed to update light');
            }
        
            // Call the parent's handler if provided
            if (onWarmthChange) {
                onWarmthChange(newWarmthValue);
            }

        
        } catch (error) {
            console.error('Error updating luminosity:', error);
            // Revert to previous value on error
            setLocalWarm(isWarm);
        }
    };

    return (
        <div>
            <Slider
                aria-label="Temperature"
                value={localValue}
                onChange={handleChange}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                shiftStep={30}
                step={15}
                marks
                min={0}
                max={255}
                sx={{
                    color: '#7e22ce',
                    '& .MuiSlider-thumb': {
                    backgroundColor: '#7e22ce',
                    },
                    '& .MuiSlider-track': {
                    backgroundColor: '#7e22ce',
                    },
                    '& .MuiSlider-rail': {
                    backgroundColor: '#d1c4e9', 
                    },
                }}
            />
        
            <label className="inline-flex items-center me-5 cursor-pointer">
                <input
                type="checkbox"
                checked={localWarm}
                onChange={handleWarmthChange}
                className="sr-only peer"/>
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600 dark:peer-checked:bg-purple-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Warm Mode On?</span>
            </label>
        </div>
    )
}

export default BrightnessSlider;
