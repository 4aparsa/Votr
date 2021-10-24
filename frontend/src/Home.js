import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import {Link} from 'react-router-dom'

import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/react/outline'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

const features = [
    {
      name: 'Vote where you\'re comfortable',
      description:
        'Especially given global health concerns, people are able to vote from the comfort and safety of their homes.',
      icon: GlobeAltIcon,
    },
    {
      name: 'Equal Access',
      description:
        'The ability to vote online gives everyone the same easy access to voice their opinions.',
      icon: ScaleIcon,
    },
    {
      name: 'Votes are secure',
      description:
        'We use a blockchain to secure your votes while keeping your personal credentials completely secure through hashing. If someone tries to change your vote, the blockchain will know.',
      icon: LightningBoltIcon,
    },
    {
      name: 'Increased election transparency',
      description:
        'Anyone can check the state of the public ledger. You can also provide your vote block number and verify that you\'re vote hasn\'t been tampered with.',
      icon: AnnotationIcon,
    },
  ]

const Home = () => {
    const [votes, setVotes] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8000/api/count_votes`, {
            method: "GET"
        }).then(response => {
            return response.json()
        }).then(json => {
            var votes_arr = []
            for (const [key, value] of Object.entries(json)) {
                votes_arr.push({'name': key, 'votes': value})
              }
            setVotes(votes_arr)
        })
    }, [])
    return (
        <div>
            <div className="relative bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                    <svg
                        className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                        fill="currentColor"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <polygon points="50,0 100,0 50,100 0,100" />
                    </svg>

                    <Popover>
                        <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                        <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                            <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                                <div className="flex items-center justify-between w-full md:w-auto">
                                    <a className = "text-indigo-600 text-3xl" href="#">
                                    <span className="sr-only">Workflow</span>
                                    Votr
                                    </a>
                                </div>
                            </div>
                            <div style = {{marginLeft: "400px"}} className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                                <Link to='/blockchain' className="font-medium hover:text-indigo-500">
                                    View blockchain
                                </Link>
                            </div>
                        </nav>
                        </div>
                    </Popover>

                    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div className="sm:text-center lg:text-left">
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            <span className="block xl:inline">Fast, secure, and reliable</span>{' '}
                            <span className="block text-indigo-600 xl:inline">voting</span>
                        </h1>
                        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                            Votr is an online voting platform based on the blockchain. Online voting turnout not only makes voting more accessible for everyone, but allows for a transparent election where anyone can verify the public ledger and that their vote is cast as intended.
                        </p>
                        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                            <div className="rounded-md shadow">
                            <Link
                                to="/vote"
                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                            >
                                Vote Now
                            </Link>
                            </div>
                            <div className="mt-3 sm:mt-0 sm:ml-3">
                            <Link
                                to="/verify"
                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                            >
                                Verify My Vote
                            </Link>
                            </div>
                        </div>
                        </div>
                    </main>
                    </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <img
                    className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                    src="https://images.unsplash.com/photo-1587131110607-07f5be87b5ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2051&q=80"
                    alt=""
                    />
                </div>
            </div>
            <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                    <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Why Votr</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        A better way to vote
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        The United States has 90% Internet penetration. It's time to digetize our democracy.
                    </p>
                    </div>

                    <div className="mt-10">
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                        {features.map((feature) => (
                        <div key={feature.name} className="relative">
                            <dt>
                            <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                <feature.icon className="h-6 w-6" aria-hidden="true" />
                            </div>
                            <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                            </dt>
                            <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                        </div>
                        ))}
                    </dl>
                    </div>
                </div>
            </div>
            <div>
            <div>
            <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-indigo-600">Live Vote Counts</h1>
            </div>
            </header>
             <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Name
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Number of votes
                            </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {votes.map((person) => (
                            <tr key={person.name}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{person.name}</div>
                                    </div>
                                </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{person.votes}</div>
                                </td>

                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Home