import React, { useEffect, useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"

type itemDetail = {
  _id?: string; 
  checked: boolean;
  body: string;
}

type ListItemProps = {
  item: itemDetail;
  onUpdate: (id: string, item: itemDetail) => void | Promise<void>;
  onDelete: (id: string) => void;
}

function ListItem({ item, onUpdate, onDelete }: ListItemProps) {
  const [body, setBody] = useState(item.body)

  useEffect(() => {
    setBody(item.body)
  }, [item.body])

  const handleCheckboxClick = () => {
    if (!item._id) return 
    const updatedItem = { ...item, checked: !item.checked }
    onUpdate(item._id, updatedItem)
  }

  const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!item._id) return 
    setBody(e.target.value)
    console.log(item.body,"<<< BODY")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && body.trim() !== "") {
      if (!item._id) return 
      const updatedItem = { ...item, body: body.trim() }
      onUpdate(item._id, updatedItem)
    } else if (e.key === "Enter" && body.trim() === "") {
      handleDelete()
    }
  }

  const handleDelete = () => {
    if (!item._id) return 
    onDelete(item._id)
  }

  return (
    <div className="border border-black flex items-center gap-2 p-2">
      <Checkbox 
        className="border-2xl mx-2 shadow-2xl" 
        checked={item.checked}
        onClick={handleCheckboxClick}
      />
      <input 
        className="border border-black flex-1 p-1"
        type="text"
        value={body}
        onChange={handleBodyChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter task description"
      />
      <button 
        className="bg-red-500 text-white px-2 py-1 text-sm rounded"
        onClick={handleDelete}
      >
        X
      </button>
    </div>
  )
}

export default ListItem;