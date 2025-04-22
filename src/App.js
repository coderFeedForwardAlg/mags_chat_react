import logo from './logo.svg';
import react, {useState, useEffect} from 'react'; 
import axios from 'axios';



function App() {
  const [messeges, setMesseges] = useState(["ai messege"]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const question_changed = (e) => {
    setQuestion(e.target.value);
  }

  const ask_question = () => {
    setMesseges([...messeges, question]);
    axios.get(`http://localhost:8000/${question}`).then(response => setAnswer(response.data.res)).catch(err => setAnswer("an error accurd connecting to the server :("));
  }
  
  useEffect(
    () =>{
      console.log(answer);
      setMesseges([...messeges, answer])
    }, [answer]
  )  

  return (
    <div>
    <h1 className="text-3xl font-bold">
      This is a place where you can ask about max gaspers scott.
    </h1>
      <input value={question} onChange={question_changed}/>
      <button onClick={ask_question} > send </button>
      {messeges.map((text, index) => (
        <div key={index}>  
          <p className={`text-lg ${(index % 2 == 0) ? "bg-blue-300": "bg-red-300"} rounded-xl pl-2`}> {text} </p>
          </div>
      ))} 
    </div>

);
}

export default App;
