"use client"
import { Checkbox } from "@/components/ui/checkbox"
import ListItem from "@/component/ListItem";
import { useEffect, useState } from "react";

type itemDetail  = {
  checked: boolean;
  description:string;
}

export default function Home() {

  useEffect(() => {
    getItems()
  }, [])

  const [items, setItems] = useState<itemDetail[]>([])

  const addItem = () => {
    const emptyDetail = {checked: false, description:""}
    setItems([...items, emptyDetail])
  }

const getItems = async () => {
  const response = await fetch('/api/todos', {
    method: 'GET',
  })
  const data = await response.json()
  setItems(data)
}

  return (
    <div className=" flex justify-center items-center  min-h-screen border-4 border-black ">
      <div className="text-wrap text-xl">
        <button className="w-20 h-5 text-sm"
            onClick={addItem}>
          <p>
            Add items
          </p>
        </button>
        <h1 className="font-bold">Henry's To-do List today</h1>
        {items.map((item, index) => (
          <ListItem
            key={index}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}
