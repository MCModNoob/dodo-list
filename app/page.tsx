"use client"

import ListItem from "@/component/ListItem";
import { useEffect, useState } from "react";


type itemDetail = {
  _id?: string; 
  checked: boolean;
  body: string;
}

export default function Home() {
  const [items, setItems] = useState<itemDetail[]>([])

  useEffect(() => {
    getItems()
  }, [])

  const addItem = async () => {
    const emptyDetail = { checked: false, description: "" }
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emptyDetail),
    })
    const data = await response.json()
    console.log(data,"<<< ADD ITEM")
    setItems([...items, data])
    console.log(items,"<<< ITEMS")
  }

  const getItems = async () => {
    const response = await fetch('/api/todos', {
      method: 'GET',
    })
    const data = await response.json()
    console.log(data,"<<< GET ALL DATA")
    setItems(data)
  }

  const updateItem = async (id: string, item: itemDetail) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
    const data = await response.json()
    setItems(items.map((item) => item._id === id ? data : item))
    console.log(items,"<<< ITEMS")
  }

  const deleteItem = async (id: string) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    })
    const data = await response.json()
    console.log(data,"<<< DELETE ITEM")
    setItems(items.filter((item) => item._id !== data._id))
  }

  return (
    <div className="flex justify-center items-center min-h-screen border-4 border-black">
      <div className="text-wrap text-xl">
        <button className="w-20 h-5 text-sm cursor-pointer" onClick={addItem}>
          <p>Add items</p>
        </button>
        <h1 className="font-bold">Henry's To-do List today</h1>

        { Array.isArray(items) && items.length > 0 && items.map((item) => (
          <ListItem
          key={item._id}
          item={item}
          onUpdate={updateItem}
          onDelete={deleteItem}
          />
        ))}
        
      </div>
    </div>
  );
}