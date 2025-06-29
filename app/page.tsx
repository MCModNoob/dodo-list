import { Checkbox } from "@/components/ui/checkbox"
import { Form } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  return (
    <div className=" flex justify-center items-center  min-h-screen border-4 border-black ">
      <div className="text-wrap text-xl">
        <Button className="w-20 h-5 text-sm">
          <p>
            Add items
          </p>
        </Button>
        <h1 className="">Henry's To-do List today</h1>
        <div className="">
          <Checkbox className="border-2xl mx-2 shadow-2xl" />
          hello keith
        </div>
        <div className="">
          <Checkbox className="border-2xl mx-2 shadow-2xl" />
          keep saying hello keith
        </div>
        <div className="">
          <Checkbox className="border-2xl mx-2 shadow-2xl" />
          hello keith again
        </div>
      </div>
    </div>
  );
}
