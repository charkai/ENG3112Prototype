import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { useState, useEffect } from 'react';

const HeartRateGraph = ({hrvValue}) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        // Only animate if hrvValue is a valid number
        if (typeof hrvValue !== 'number' || isNaN(hrvValue)) {
            return;
        }

        // Start from 0 and animate to the target value
        const startValue = 0;
        const targetValue = hrvValue;
        const duration = 1000; // 1 second animation
        const steps = 60; // 60 steps for smooth animation
        const stepDuration = duration / steps;
        const valueIncrement = (targetValue - startValue) / steps;

        let currentStep = 0;
        const interval = setInterval(() => {
            currentStep++;
            setValue(prevValue => {
                const newValue = prevValue + valueIncrement;
                if (currentStep >= steps) {
                    clearInterval(interval);
                    return targetValue;
                }
                return newValue;
            });
        }, stepDuration);

        return () => clearInterval(interval);
    }, [hrvValue]);

    return (
        <div className="flex flex-col w-96 h-96 bg-white dark:border-gray-700 rounded-xl mb-10 sm:mb-0 bg-white dark:bg-gray-800 shadow-md flex items-center justify-center">
            <Gauge 
                width={300} 
                height={300} 
                value={value} 
                min={0}
                max={200}
                startAngle={-90} 
                endAngle={90} 
                sx={(theme) => ({
                    [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 40,
                      },
                    [`& .${gaugeClasses.valueArc}`]: {
                        fill: '#7e22ce',
                    },
                })}/>
            <h2 className="text-2xl text-center text-gray-800 dark:text-gray-100 pb-10">Heart Rate Variability</h2>
        </div>
    )
}

export default HeartRateGraph;