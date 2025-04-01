
import * as React from 'react';
import Slider from '@mui/material/Slider';

function valuetext(value) {
    return `${value} lumens`;
  }

const BrightnessSlider = () => {
    return (
        <Slider
            aria-label="Temperature"
            defaultValue={30}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            shiftStep={30}
            step={15}
            marks
            min={0}
            max={255}
        />
    )
}

export default BrightnessSlider;