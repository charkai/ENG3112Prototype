import Slider from '@mui/material/Slider';
import { useState, useEffect } from 'react';

function valuetext(value) {
    return `${value} lumens`;
}

const BrightnessSlider = ({ luminosity, onLuminosityChange }) => {
    const [localValue, setLocalValue] = useState(luminosity);

    useEffect(() => {
        setLocalValue(luminosity);
    }, [luminosity]);

    const handleChange = async (event, newValue) => {
        setLocalValue(newValue);
        try {
            const response = await fetch('http://localhost:3001/api/luminosity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ value: newValue }),
            });
            
            if (!response.ok) {
                console.log(response);
                throw new Error('Failed to update luminosity');
            }
        
            // Call the parent's handler if provided
            if (onLuminosityChange) {
                onLuminosityChange(newValue);
            }
        } catch (error) {
            console.error('Error updating luminosity:', error);
            // Revert to previous value on error
            setLocalValue(luminosity);
        }
    };


    return (
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
    )
}

export default BrightnessSlider;
