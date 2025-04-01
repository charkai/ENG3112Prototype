import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { useState, useEffect } from 'react';

const HeartRateGraph = () => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        const duration = 1000;
        const steps = 60;
        const stepDuration = duration / steps;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            setValue(currentStep);
            
            if (currentStep >= 60) {
                clearInterval(interval);
            }
        }, stepDuration);

        return () => clearInterval(interval);
    }, []);

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
            <h2 className="text-2xl text-center text-gray-800 dark:text-gray-100 pb-10">Heart Rate</h2>
        </div>
    )
}

export default HeartRateGraph;