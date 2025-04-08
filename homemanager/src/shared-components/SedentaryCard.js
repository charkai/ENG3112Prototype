import { Stats } from 'react-daisyui'

const SedentaryCard = () => {

    return (
        <Stats className="shadow font-sans">
            <Stats.Stat>
                <Stats.Stat.Figure className="text-purple-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                </Stats.Stat.Figure>
                <Stats.Stat.Title className="text-xl">Continuous Minutes Seated</Stats.Stat.Title>
                <Stats.Stat.Value className="text-purple-700">28 minutes</Stats.Stat.Value>
                <Stats.Stat.Desc>Aim for no more than 30-60 minutes at a time</Stats.Stat.Desc>
            </Stats.Stat>

            <Stats.Stat>
                <Stats.Stat.Figure className="text-purple-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                </Stats.Stat.Figure>
                <Stats.Stat.Title className="text-xl">Total Minutes Standing</Stats.Stat.Title>
                <Stats.Stat.Value className="text-purple-700">10 minutes</Stats.Stat.Value>
                <Stats.Stat.Desc>Today's aim is 60 minutes!</Stats.Stat.Desc>
            </Stats.Stat>

            <Stats.Stat>
                <Stats.Stat.Figure className="text-purple-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                </Stats.Stat.Figure>
                <Stats.Stat.Title className="text-xl">Total Time Worked</Stats.Stat.Title>
                <Stats.Stat.Value className="text-purple-700">3 Hours</Stats.Stat.Value>
                <Stats.Stat.Desc>You got this!</Stats.Stat.Desc>
            </Stats.Stat>
        </Stats>

    )
}

export default SedentaryCard;