import OptionCard from "./shared-components/OptionCard";

const Home = () => {

    const options = [
        {
            name: "Work Mode",
            link: "/work",
            description: "Maximising productivity while monitoring and minimising stress",
            emoji: "⚙️"
        },
        {
            name: "Personal Mode",
            link: "/personal",
            description: "Facilitate personal comfort without compromising your mental wellness",
            emoji: "☀️"
        }
    ]
    return (
        <div className="flex h-screen"> 
            <div className="m-auto">
                <h3 className="text-center text-6xl font-medium text-gray-800 dark:text-gray-100">
                    Welcome, Charlie
                </h3>
                <h2 className="pt-8 text-center text-3xl font-medium text-gray-800 dark:text-gray-100">
                    What would you like to do today?
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pb-20 pt-8">
                    {options.map((option) => (
                        <OptionCard 
                            name={option.name}
                            link={option.link}
                            description={option.description}
                            emoji={option.emoji}
                        />
                    ))}
                </div>

            </div>
        </div>
    )

}

export default Home;