import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { useState, useEffect, useRef } from 'react';

const HeartRateGraph = ({hrvValue}) => {
    const [value, setValue] = useState(0);
    const currentValueRef = useRef(0);

    useEffect(() => {
        // Only animate if hrvValue is a valid number
        if (typeof hrvValue !== 'number' || isNaN(hrvValue)) {
            return;
        }

        // Start from current value and animate to the target value
        const startValue = currentValueRef.current;
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
                currentValueRef.current = newValue;
                if (currentStep >= steps) {
                    clearInterval(interval);
                    currentValueRef.current = targetValue;
                    return targetValue;
                }
                return newValue;
            });
        }, stepDuration);

        return () => clearInterval(interval);
    }, [hrvValue]);

    return (
        <div className="flex flex-col px-12 pb-8 bg-white border border-gray-100 dark:border-gray-700 rounded-xl mb-10 sm:mb-0 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center">
            <Gauge 
                width={280} 
                height={260} 
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
            <h2 className="text-2xl text-center text-gray-800 dark:text-gray-100">Heart Rate Variability</h2>
        </div>
    )
}

export default HeartRateGraph;