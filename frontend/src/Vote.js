import { useState } from "react"
import { sha256 } from 'js-sha256'
import { SpeakerphoneIcon, XIcon } from '@heroicons/react/outline'

import {Link} from 'react-router-dom'

const Vote = () => {
    const [credentials, setCredentials] = useState({
        name: '',
        ssn: '',
        dob: '',
        vote: ''
      })
    
      const [message, setMessage] = useState('')
    
      const { name, ssn, dob, vote } = credentials;
      
      const onChange = e => setCredentials({ ...credentials, [e.target.name]: e.target.value });
    
      const onSubmit = e => {
        e.preventDefault()
        const voter_hash = sha256(name + ssn + dob)
        fetch(`http://localhost:8000/api/add/`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 'vote': vote, 'voter_hash': voter_hash })
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
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Cast your vote</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                <p href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Once you vote, you will receive your block number that can be used to verify your vote
                </p>
                <Link to = '/' className = 'font-medium'>Go to home page</Link>
                </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={e => onSubmit(e)}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label htmlFor="name" className="sr-only">
                    Name
                    </label>
                    <input
                    id="name"
                    name="name"
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Name"
                    onChange={e => onChange(e)}
                    />
                </div>
                <div>
                    <label htmlFor="dob" className="sr-only">
                    Social Security Number
                    </label>
                    <input
                    id="ssn"
                    name="ssn"
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Social Security Number"
                    onChange={e => onChange(e)}
                    />
                </div>
                <div>
                    <label htmlFor="dob" className="sr-only">
                    Date of Birth
                    </label>
                    <input
                    id="dob"
                    name="dob"
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Date of Birth"
                    onChange={e => onChange(e)}
                    />
                </div>
                <div>
                    <label htmlFor="dob" className="sr-only">
                    Vote choice
                    </label>
                    <input
                    id="vote"
                    name="vote"
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Vote choice"
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
                    Vote
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>
      )
}

export default Vote