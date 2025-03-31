import OptionCard from "./shared-components/OptionCard";

const Home = () => {

    const options = [
        {
            name: "Work Mode",
            link: "/work",
            emoji: "⚙️"
        },
        {
            name: "Personal Mode",
            link: "/personal",
            emoji: "☀️"
        }
    ]
    return (
        <div className="flex h-screen"> 
            <div className="m-auto">
                <h3 className="text-center text-3xl font-medium text-gray-800 dark:text-gray-100 sm:text-6xl">
                    Welcome, Charlie
                </h3>
                <h2>
                    
                </h2>


                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pb-20 pt-10 md:pt-20">
                    {options.map((option, index) => (
                        <OptionCard 
                            name={option.name}
                            link={option.link}
                            emoji={option.emoji}
                        />
                    ))}
                </div>

            </div>
        </div>
    )

}

export default Home;