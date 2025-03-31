
import HeartRateGraph from './shared-components/HeartRateGraph';
import SettingCard from './shared-components/SettingCard';
const Work = () => {

    const settings = [
        {
            "name": "Lighting", 
            "emoji": "💡",
            "description": "Ensure the lighting will maximise your productivity"
        },
        {
            "name": "Temperature", 
            "emoji": "🌡️",
            "description": "Adjust the temperature to your liking"
        },
        {
            "name": "Noise", 
            "emoji": "🔊",
            "description": "Let's make sure that noise is within acceptable levels"
        }
    ]

    return (
        <div className="flex flex-col h-screen p-10">
            <h1 className="text-left text-6xl font-medium text-gray-800 dark:text-gray-100 p-4">Welcome to Work Mode</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {settings.map((setting) => (
                <SettingCard 
                    emoji={setting.emoji}
                    name={setting.name}
                    description={setting.description}
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