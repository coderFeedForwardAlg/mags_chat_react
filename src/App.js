import logo from './logo.svg';
import react, {useState, useEffect} from 'react'; 
import axios from 'axios';
import { SendHorizontal } from 'lucide-react';
import ScrollableContent from './componants/ScrollableContent.js';


function App() {

  //for testing 
  // const  [messeges, setMesseges] = useState(["Hello. I am MAGS's AI assistant. I can tell you things like what technology he knows or what he is/isn't good at. What would you like to know?", "hi", "hi" , "hi" , "hi" , "hi" , "hi" , "hi" , "hi" , "hi" , "hi" , "hi" , "hi" , "hi" , "hi" , "hi" , "hi" , "hi" , "hi" ]);

  const [messeges, setMesseges] = useState(["Hello. I am MAGS's AI assistant. I can tell you things like what technology he knows or what he is/isn't good at. What would you like to know?"]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false); // bad use of semiphor, consiter acters
  const question_changed = (e) => {
    setQuestion(e.target.value);
  }


  const ask_question = (e) => {
    // if(loading):
    //   return
    e.preventDefault();
    setMesseges([...messeges, question]);
    axios.get(`https://makedocdb.team-stingray.com/${question}`).then(response => setAnswer(response.data.res)).catch(err => setAnswer("an error accurd connecting to the server :("));
    setQuestion("");
  }
  useEffect(
    () =>{
      if(answer === ""){
        return
      }
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
        <li>empty message causes error</li>
        <li></li>
      </ul>*/}
    <div className="flex flex-col h-screen">
    <h1 className="text-3xl font-bold h-32 flex justify-center pt-4">
      Ask anything about Maximillian A Gaspers Scott
    </h1>
          <ScrollableContent> 
      {messeges.map((text, index) => ( 
        <div key={index} className={`${index % 2 != 0 ? "flex pl-24 justify-end" : "pr-24 flex justify-strt"} p-2`}>  
          <p className={`text-lg ${(index % 2 != 0) ? "bg-blue-600 text-white ": "bg-blue-200"} rounded-xl px-4`}> { text} </p>
          </div>
      ))}
       </ScrollableContent>
      <div className="flex  p-4  h-24">
      <form onSubmit={ask_question} className="flex p-4 p-2 w-full">
      <input value={question} onChange={question_changed} className="border w-full mr-8 rounded-xl"/>
      <button type="submit" >
        <SendHorizontal />
      </button>
      </form>
      </div>

    </div>
</div>
);
}

export default App;
