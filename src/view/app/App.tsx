import React, { useState } from 'react';
import { StyledButton } from "./StyledButton";

export const App:React.FC = () => {
  const [todo, setTodo] = useState<Array<string>>([]);
  const [value, setValue] = useState<string>();
  const addItem = (data:string) => {
    if(data !== ''){
      setTodo([...todo, data]);
      setValue('');
    }
  };
  const reset=()=>{
    setTodo([]);
  };
  return (
    <>
      <h1>add Todo:</h1>
      <input value={value} onChange={e=>setValue(e.target.value)}/>
      <br/>
      <StyledButton onClick={()=>addItem(value)}>add</StyledButton>
      <br/>
      <br/>
      <StyledButton onClick={reset}>reset</StyledButton>
      <br/><br/>
      <hr/>
      <h1>list:</h1> 
      <h2>
        {todo?.map(item=> (<li>{item}</li>))}
      </h2>
    </>
  );
};
