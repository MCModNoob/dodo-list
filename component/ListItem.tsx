import React, { useEffect, useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"


function ListItem({ setItems }: any) {

  const handleClick =()=>{

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const [description, setDescription] = useState("")

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && description.trim() !== "") {
      setItems((prevItems: any[]) => {
        return [...prevItems, { checked: false, description }];
      });
    }
  };

  return (
    <div className="border border-black">
      <Checkbox className="border-2xl mx-2 shadow-2xl" 
      onClick={handleClick}/>
      <input className="border border-black"
        type="text"
        value={description}
        onChange={handleChange}
        onKeyDown={handleKeyDown} />
    </div>
  )

}

export default ListItem;