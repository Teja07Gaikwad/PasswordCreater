import { useState, useCallback, useEffect, useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(5)
  const [num, setNum]= useState(false)
  const [char ,setChar]= useState(false)
  const [pass, setPass]= useState("")
  const passwordRef=useRef(null)
  const passwordGen= useCallback(()=>{ 
    let password=""
    let string="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(num)
    {
      string+="0123456789"
    }
    if(char)
    {
      string+="!@#$%^&*-_+=[]{}~`"
    }
    for(let i=0;i<length;i++){
      let gen=Math.floor(Math.random()* string.length+1)
      password += string.charAt(gen)
    }
    setPass(password)
  },[num, char, length, setPass])
  const copyText = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionrange(0,50)
    window.navigator.clipboard.writeText(pass)
  },[pass])
  useEffect(()=>{
    passwordGen()
  },[length, num, char, setPass, passwordGen])

  return (
   <>
   <div className='w-full max-w-md mx-auto shadow-md rouneded-lg px-4 my-8 text-yellow-500'>
   <h1 className='text-3x1 text-center text-white'>Password Generator</h1>
   <div className='flex shadow rounded-lg overflow-hidden'>
        <input 
        type="text"
        value={pass}
        className='outline-none w-full py-1 px-3' 
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />
        <button onClick={copyText} className='outline-none bg-green-600 text-white px-2 py-1 shrink-0 active:bg-red-600'>Copy</button>
   
   </div>
   <div className='flex text-sm gap-x-2'>
    <div className='flex items-center gap-x-1'>
      <input 
      type="range"
      min={5}
      max={100}
      value={length}
      className='cursor-pointer' 
      onChange={(e)=>{setLength(e.target.value)}}
      />
      <label>Length {length}</label>
    </div>
    <div className='flex items-center gap-x-1'>
    <input type="checkbox"
      defaultChecked={num}
      id='numinput'
      onChange={()=>{
         setNum((prev)=>!prev)
      }}
      />
      <label htmlFor="numinput">Number</label>
    </div>
    <div className='flex items-center gap-x-1 '>
      <input 
      type="checkbox" 
      defaultChecked={char}
      id='charcterinput'
      onChange={()=>{
        setChar((prev)=> !prev)
      }}
      />
          <label htmlFor="charcterinput">Chacter</label>
    </div>
   </div>
   </div>
   </>
  )
}

export default App
