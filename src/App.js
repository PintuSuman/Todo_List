import logo from './logo.svg';
import './App.css';
import Todo from './component/todo';
import { useEffect, useState } from 'react';
import {AiFillDelete} from 'react-icons/ai';
import {AiOutlineCheck} from 'react-icons/ai'
 function App() {
  
  const[iscompletescreen,setiscompletescreen]=useState(false);
  const[alltodos,settodos]=useState([]);
  let[newtitle,settitle]=useState("");
  let[newdiscription,setdiscription]=useState("");
  const[completetodos,setcompletetodos]=useState([]);

  const handleaddlist=()=>{

    let tod={
      title:newtitle,
      discription:newdiscription
    }
    
    let updatetodos=[...alltodos,tod];
   settodos(updatetodos);
    localStorage.setItem('Localstorage',JSON.stringify(updatetodos));
   
    
  }
  useEffect(()=>{
    const arr=JSON.parse(localStorage.getItem('Localstorage'));
    if(arr){
      settodos(arr);
    }
  },[]);
  const deletetodo=(index)=>{
    const reducedtodo=[];
   for(let i=0;i<alltodos.length;i++){
    if(index!=i)reducedtodo.push(alltodos[i]);
   }
    localStorage.setItem('Localstorage',JSON.stringify(reducedtodo));
    settodos(reducedtodo);
  };
  const deletetodofromcom=(index)=>{
    const reducedtodo=[];
   for(let i=0;i<completetodos.length;i++){
    if(index!=i)reducedtodo.push(completetodos[i]);
   }
  
    localStorage.setItem('completetodos',JSON.stringify(reducedtodo));
    setcompletetodos(reducedtodo);
  };
  const Completetodo=(index)=>{
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  
    let currentDate = `${day}-${month}-${year}  ${time}` ;
    const finalset={
      ...alltodos[index],
      currentDate:currentDate
    }

    const updateSet=[...completetodos];
    updateSet.push(finalset);
    deletetodo(index);
    setcompletetodos(updateSet);
    localStorage.setItem('completetodos',JSON.stringify(updateSet));
 }
 useEffect(()=>{
  const arr=JSON.parse(localStorage.getItem('completetodos'));
  if(arr){
    setcompletetodos(arr);
  }
 })
  return (
    <div className='App'>
      <h1>MY TODOS</h1>
      <div className='todo-wrapper'>

        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type='text' value={newtitle}  required onChange={(e)=>settitle(e.target.value)} placeholder="What's the task title" />
          </div>
          <div className='todo-input-item'>
            <label>Description </label>
            <input type='text'  value={newdiscription} required onChange={(e)=>setdiscription(e.target.value)} placeholder="What's the task Description" />
          </div>
          <div className='todo-input-item'>
            <button type='button'  onClick={handleaddlist}  className='primaryBtn'>ADD</button>
          </div>
        </div>

        <div className='btn-area'>
          <button className={`secondaryBtn ${iscompletescreen===false && 'active'}`} onClick={()=>setiscompletescreen(false)}>TODO</button>
          <button className={`secondaryBtn ${iscompletescreen===true && 'active'}`} onClick={()=>setiscompletescreen(true)
          }>COMPLETED</button>
        </div>
        <div className='todo-list'>
        {
       iscompletescreen===false && alltodos.map((item,idx)=>{
       
            return (
              <div className='todo-list-item' key={idx}>
          <div>
            <h2>{item.title}</h2>
            <div className='pintu'>
            <p>{item.discription}</p>
            </div>
           </div>

          <div>
         <AiFillDelete onClick={()=>deletetodo(idx)} className='icon'/>
        <AiOutlineCheck onClick={()=>{Completetodo(idx)}}   className='cheak-icon'/>
          </div>
      </div>
     
            )
         })
        }

     { iscompletescreen===true && completetodos.map((item,idx)=>{
       
       return (
         <div className='todo-list-item' key={idx}>
     <div>
       <h2>{item.title}</h2>
       <div className='pintu'>
       <p>{item.discription}</p>
       <p>{item.currentDate}</p>
       </div>
      </div>

     <div>
    <AiFillDelete onClick={()=>deletetodofromcom(idx)} className='icon'/>
  
     </div>
 </div>

       )
    })


     }

        
        </div>
      </div>

    </div>
  );
}

export default App;
