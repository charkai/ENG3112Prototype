import { Stats } from 'react-daisyui'

const SedentaryCard = ({sittingOrStanding}) => {

    return (
        <Stats className="shadow font-sans">
            <Stats.Stat>
                <Stats.Stat.Figure className="text-purple-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="mt-2 inline-block w-8 h-8 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                </Stats.Stat.Figure>
                <Stats.Stat.Title className="text-xl">Total Standing Minutes today</Stats.Stat.Title>
                <Stats.Stat.Value className="text-purple-700">28 minutes</Stats.Stat.Value>
                <Stats.Stat.Desc>Aim to be seated for no more than 30-60 minutes at a time.</Stats.Stat.Desc>
            </Stats.Stat>

            <Stats.Stat>
                <Stats.Stat.Figure className="text-purple-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="mt-2 inline-block w-8 h-8 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                </Stats.Stat.Figure>
                <Stats.Stat.Title className="text-xl">You are currently</Stats.Stat.Title>
                <Stats.Stat.Value className="text-purple-700">{sittingOrStanding}</Stats.Stat.Value>
                <Stats.Stat.Desc>This updates every 5 seconds.</Stats.Stat.Desc>
            </Stats.Stat>

            <Stats.Stat>
                <Stats.Stat.Figure className="text-purple-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="mt-2 inline-block w-8 h-8 stroke-current">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"></path>
                </svg>
                </Stats.Stat.Figure>
                <Stats.Stat.Title className="text-xl">Total Time Worked Today</Stats.Stat.Title>
                <Stats.Stat.Value className="text-purple-700">3 Hours</Stats.Stat.Value>
                <Stats.Stat.Desc>You got this!</Stats.Stat.Desc>
            </Stats.Stat>
        </Stats>

    )
}

export default SedentaryCard;