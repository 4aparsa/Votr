import { useState } from "react"
import { sha256 } from 'js-sha256'

const App = () => {

  const [credentials, setCredentials] = useState({
    name: '',
    ssn: '',
    dob: ''
  })

  const [message, setMessage] = useState({
    message: ''
  })

  const { name, ssn, dob } = credentials;
  
  const onChange = e => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault()
    const voter_hash = sha256(name + ssn + dob)
    console.log(sha256(name + ssn + dob))
    fetch(`http://localhost:8000/api/add/`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'vote': 'biden', 'voter_hash': voter_hash })
    }).then(response => {
      return response.json()
    }).then(json => {
      setMessage(json.message)
    })
  }
  return (
    <div>
      <form onSubmit={e => onSubmit(e)}>
        <input type = "text" placeholder = "Name" name = "name" onChange={e => onChange(e)}></input>
        <input type = "text" placeholder = "SSN" name = "ssn" onChange={e => onChange(e)}></input>
        <input type = "text" placeholder = "DOB" name = "dob" onChange={e => onChange(e)}></input>
        <input type = "submit"></input>
      </form>
    </div>
  )
}

export default App;
