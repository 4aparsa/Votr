import { useState } from "react"
import { sha256 } from 'js-sha256'
import { SpeakerphoneIcon, XIcon } from '@heroicons/react/outline'

import {Link} from 'react-router-dom'

const Verify = () => {
    const [blockNumber, setBlockNumber] = useState(null)
    
    const [message, setMessage] = useState('')
        
    const onChange = e => setBlockNumber({ [e.target.name]: e.target.value });

    const onSubmit = e => {
        console.log(blockNumber)
        e.preventDefault()
        fetch(`http://localhost:8000/api/get/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blockNumber)
        }).then(response => {
            return response.json()
        }).then(json => {
            setMessage(json.message)
        })
    }
    return (
        <div>
            { message != "" ? (
                <div className="bg-indigo-600">
                <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between flex-wrap">
                    <div className="w-0 flex-1 flex items-center">
                        <span className="flex p-2 rounded-lg bg-indigo-800">
                        <SpeakerphoneIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                        <p className="ml-3 font-medium text-white truncate">
                        {message}
                        <span className="hidden md:inline"></span>
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            ) : ""}
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
            <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Verify your vote</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                    <p href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Put in your block number and you can check your vote is intact.
                    </p>
                    <Link to = '/' className = 'font-medium'>Go to home page</Link>
                </p>

            </div>
            <form className="mt-8 space-y-6" onSubmit={e => onSubmit(e)}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label htmlFor="name" className="sr-only">
                    Block Number
                    </label>
                    <input
                    id="name"
                    name="blockNumber"
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Block Number"
                    onChange={e => onChange(e)}
                    />
                </div>
                </div>

                <div className="flex items-center justify-between">

                </div>

                <div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Verify
                </button>
                </div>
            </form>
            </div>
        </div>
    </div>
    )
}

export default Verify