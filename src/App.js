import logo from './logo.svg';
import react, {useState, useEffect} from 'react'; 
import axios from 'axios';



function App() {
  const [messeges, setMesseges] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false); // bad use of semiphor, consiter acters
  const question_changed = (e) => {
    setQuestion(e.target.value);
  }

  const ask_question = () => {
    // if(loading):
    //   return
    setMesseges([...messeges, question]);
    axios.get(`http://localhost:8000/${question}`).then(response => setAnswer(response.data.res)).catch(err => setAnswer("an error accurd connecting to the server :("));
    setQuestion("");
  }
  
  useEffect(
    () =>{
      console.log(answer);
      setMesseges([...messeges, answer])
    }, [answer]
  )  

  return (
    <div>
      {/*<p className="text-lg font-bold">This is for beta testing. Looking for feedback/suggestions on:</p>
      <ul>
        <li>colors (something better than red and blue)</li>
        <li> background-color</li>
        <li> anything else </li>
      </ul>
      <p className="text-lg font-bold"> known issues</p>
      <ul> 
        <li>bot has no memory (will not remember previous parts of conversation)</li>
        <li>empty message causes error</li>
        <li></li>
      </ul>*/}
    <h1 className="text-3xl font-bold">
      This is a place where you can ask about max gaspers scott.
    </h1>
      {messeges.map((text, index) => ( 
        <div key={index} className={`${index % 2 != 0 ? "flex justify-end" : "pr-24"}`}>  
          <p className={`text-lg ${(index % 2 != 0) ? "bg-blue-300": "bg-red-300"} rounded-xl px-4`}> { text} </p>
          </div>
      ))}
      <div className="flex absolute bottom-0 right-0 p-4 ">
      <input value={question} onChange={question_changed} className="border border-gray-400 w-full"/>
      <button onClick={ask_question} > send </button>
      </div>

    </div>

);
}

export default App;
