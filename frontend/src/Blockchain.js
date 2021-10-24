import { useState, useEffect } from "react"
import {Link} from 'react-router-dom'

const Blockchain = () => {
    const [blockchain, setBlockchain] = useState([])
    const [length, setLength] = useState(0)
    const [status, setStatus] = useState("")


    useEffect(() => {
        fetch(`http://localhost:8000/api/`, {
            method: "GET"
        }).then(response => {
            return response.json()
        }).then(json => {
            console.log(json)
            var blocks = json.blockchain.replace(/'/g, '"');
            blocks = JSON.parse(blocks);
            setBlockchain(blocks)
            setLength(json.length)
            setStatus(json.is_valid)
        })
    }, [])


    return (
        <div>
            <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-indigo-600">Blockchain Data</h1>
                <p>Length of chain: {length}</p>
                <p>Block chain is untampered: {status.toString()}</p>
                <Link to = '/' className = 'font-medium'>Go to home page</Link>
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
                                Block Hash
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Previous Block Hash
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Vote
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Voter Hash
                            </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {blockchain.map((block) => (
                            <tr key={block.number}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{block.number}</div>
                                    </div>
                                </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{block.hash_code}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{block.previous_hash}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{block.vote}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{block.voter_hash}</div>
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
    )
}

export default Blockchain