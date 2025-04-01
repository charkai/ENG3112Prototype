
import HeartRateGraph from './shared-components/HeartRateGraph';
import SettingCard from './shared-components/SettingCard';
import HomeButton from './shared-components/HomeButton';
import BrightnessSlider from './shared-components/BrightnessSlider';

const Work = () => {

    const settings = [
        {
            "name": "Lighting", 
            "emoji": "💡",
            "description": "Ensure the lighting will maximise your productivity",
            "children": <BrightnessSlider />
        },
        {
            "name": "Temperature", 
            "emoji": "🌡️",
            "description": "Adjust the temperature to your liking",
            "children": <BrightnessSlider />
        },
        {
            "name": "Noise", 
            "emoji": "🔊",
            "description": "Let's make sure that noise is within acceptable levels",
            "children": <BrightnessSlider />
        }
    ]

    return (
        <div className="flex flex-col h-screen p-10">
            <div className="flex flex-row items-center justify-between p-4">
                <h1 className="text-left text-6xl font-medium text-gray-800 dark:text-gray-100">Welcome to Work Mode</h1>
                <HomeButton />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {settings.map((setting) => (
                <SettingCard 
                    emoji={setting.emoji}
                    name={setting.name}
                    description={setting.description}
                    children={setting.children}
                />
            ))}
            </div>
            <div className="p-4">
                <HeartRateGraph />
            </div>
        </div>
    )
}

export default Work;