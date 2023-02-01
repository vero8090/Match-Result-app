import axios from 'axios'
import { useEffect, useState } from 'react'

export default function MatchResult() {
    let [data, setData] = useState([]), [formationH, setFormationH] = useState([]), [formationA, setFormationA] = useState([])
    let [info, setInfo] = useState('')
    let getData = async () => {
        try {
            let response = await axios.get('https://pwd-selectiontchallenge-cfw95jhtr-ryanfandy-gmailcom.vercel.app/football/stats')
            setData(response.data.data.match_result[0])
            console.log(response.data.data.match_result[0])

            let getData = {...response.data.data.match_result[0]}
            let emptyLoaderH = [...getData.hometeam.starting_lineup]
            let emptyLoaderA = [...getData.awayteam.starting_lineup]
            let arrayH = response.data.data.match_result[0].hometeam.formations.split('-')
            let arrayA = response.data.data.match_result[0].awayteam.formations.split('-')

            let loader = []

            arrayH.forEach((item) => {
                loader.push([...emptyLoaderH.slice(0, item)])
                emptyLoaderH.splice(0, item)
            })
            setFormationH(loader)
            loader = []
            arrayA.forEach((item) => {
                loader.unshift([...emptyLoaderA.slice(0, item)])
                emptyLoaderA.splice(0, item)
            })

            setFormationA(loader)
        } catch (error) {
            console.log(error)
        }
    }

    let button = (input) => {
        setInfo(input)
    }

    useEffect(() => {
        getData()
    }, [])
    return (

        <div className="container w-full flex justify-center py-5">
            <div className="box flex flex-col w-4/5 h-full border border-black">
                <div className='text-2xl font-semibold m-3'>Match Preview </div>
                <div className='mx-10 w-11/12 flex items-center justify-center gap-24'>

                    {data.length == 0 ?
                        null :
                        <div className='flex flex-col items-center'>
                            <img src={data.hometeam.logo} alt={data.hometeam.name} className='w-40 h-60' />
                            <div className='text-3xl font-semibold'>{data.hometeam.name}</div>
                            <div>League Rank : {data.hometeam.rank}</div>
                            <div>({data.hometeam.formations})</div>
                        </div>
                    }


                    <div className='text-5xl font-md'>1</div>
                    <div className='text-5xl font-md'>:</div>
                    <div className='text-5xl font-md'>0</div>

                    {data.length == 0 ?
                        null
                        :
                        <div className='flex flex-col items-center'>
                            <img src={data.awayteam.logo} alt={data.awayteam.name} className='w-40 h-60' />
                            <div className='text-3xl font-semibold'>{data.awayteam.name}</div>
                            <div>League Rank : {data.awayteam.rank}</div>
                            <div>({data.awayteam.formations})</div>
                        </div>
                    }

                </div>

                <hr className='w-11/12 ml-5 my-4 border border-bottom-black' />

                <div className='flex ml-5 gap-3 mb-4'>
                    <button onClick={() => { button('Formations') }} className='bg-gray-700 text-white py-1 px-3 rounded-sm hover:bg-gray-500 focus:ring-2 focus:ring-blue-500'>Formations</button>
                    <button onClick={() => { button('Timeline') }} className='bg-gray-700 text-white py-1 px-3 rounded-sm hover:bg-gray-500 focus:ring-2 focus:ring-blue-500'>Timeline</button>
                    <button onClick={() => { button('Match Stats') }} className='bg-gray-700 text-white py-1 px-3 rounded-sm hover:bg-gray-500 focus:ring-2 focus:ring-blue-500'>Match Stats</button>
                </div>
                {
                    info == '' ?
                        <div className='ml-5 text-2xl font-semibold'>Please Click Information Box Above!</div>
                        :
                        info == 'Timeline' ?
                            <div className='ml-5 text-2xl font-semibold'>Timeline not updated!</div>
                            :
                            info == 'Match Stats' ?
                                <div className='ml-5 text-2xl font-semibold'>Match Stats not updated!</div>
                                :
                                <div className='flex flex-col'>
                                    <div className=' ml-5 text-2xl font-semibold '> Formations :   </div>
                                    <div className='w-11/12 ml-12 bg-emerald-500 h-full mb-5 rounded-md p-3 flex flex-col gap-11 '>
                                        <div className='text-3xl font-semibold text-black-500 uppercase underline '>{data.length == 0 ? null : data.hometeam.name}</div>
                                        {formationH.length == 0 ?
                                            null
                                            :
                                            formationH.map((item, index) => {
                                                return (
                                                    <div className='flex justify-center gap-44 w-full '>
                                                        {
                                                            item.map((item, index) => {
                                                                return (
                                                                    <span className='flex my-3 justify-center  items-center text-white bg-blue-500 h-20 w-20 rounded-full'>
                                                                        {item}
                                                                    </span>)
                                                            })

                                                        }



                                                    </div>)
                                            })

                                        }

                                        <hr className='w-11/12 bg-white ml-5' />

                                        {
                                            formationA.length == 0 ?
                                                null
                                                :
                                                formationA.map((item, index) => {
                                                    return (
                                                        <div className='flex justify-center gap-44 w-full '>
                                                            {
                                                                item.map((item, index) => {
                                                                    return (
                                                                        <div className='flex my-3 justify-center  items-center text-white bg-blue-500 h-20 w-20 rounded-full'>
                                                                            {item}
                                                                        </div>)
                                                                })

                                                            }



                                                        </div>)
                                                })
                                        }

                                        <div className='text-3xl font-semibold text-black-500 uppercase underline '>{data.length == 0 ? null : data.awayteam.name}</div>
                                    </div>
                                </div>
                }

                {/* box */}
            </div>

            {/* container */}
        </div>
    )
}
