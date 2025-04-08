import SettingCard from "./shared-components/SettingCard";
import HomeButton from "./shared-components/HomeButton";

const Personal = () => {

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
        <div className="flex flex-col h-screen px-10 pt-2">
            <div className="flex flex-row items-center justify-between p-4">
                <h1 className="text-left text-6xl font-medium text-gray-800 dark:text-gray-100">Welcome to Personal Mode</h1>
                <HomeButton />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {settings.map((setting) => (
                <SettingCard 
                    emoji={setting.emoji}
                    name={setting.name}
                    description={setting.description}
                />
            ))}
            </div>
        </div>
    )
}

export default Personal;