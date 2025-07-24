"use client";

import PracticeAccording from "@/app/components/According/PracticeAccording";
import AspectRatioCom from "@/app/components/AspectRatioCom";
import { MyAlert } from "@/app/components/MyAlert";
import MyAvater from "@/app/components/MyAvater";
import MyBrande from "@/app/components/MyBrande";
import MyCalander from "@/app/components/MyCalander";
import MyCard from "@/app/components/MyCard";
import MyCarousel from "@/app/components/MyCarousel";
import Container from "@/app/components/shared/Container/Container";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { User2Icon, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BiLock } from "react-icons/bi";

export default function HomeMain() {
  const [active, setActive] = useState(false);

  return (
    <div>
      <Container>
        <div className="flex flex-col  gap-8 bg-slate-200 p-4">
          <MyCarousel />
          <MyCard />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] px-0 border-0 py-0 rounded-lg">
              <DialogClose asChild>
                <button
                  className="absolute right-4 top-4 text-white hover:text-white/80 transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </DialogClose>

              <DialogHeader className="bg-green-900 px-0 py-4 text-white rounded-t-lg">
                <DialogTitle className="text-2xl text-white text-center">
                  Login From
                </DialogTitle>
              </DialogHeader>
              <div className="px-6 pb-6">
                <div className="grid gap-4 py-4">
                  <div className="grid gap-3">
                    <div className="flex">
                      <div className="w-14 h-full rounded-tl-lg rounded-bl-lg bg-green-700 r flex items-center justify-center shadow">
                        <User2Icon size={25} color="#ffffff" />
                      </div>

                      <Input
                        id="name-1"
                        name="name"
                        defaultValue="Pedro Duarte"
                        className="pl-3 h-[45px] rounded-tl-none rounded-bl-none"
                      />
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <div className="flex">
                      <div className="w-14 h-full rounded-tl-lg rounded-bl-lg bg-green-700 r flex items-center justify-center shadow">
                        <BiLock size={25} color="#ffffff" />
                      </div>

                      <Input
                        id="name-1"
                        name="password"
                        type="email"
                        defaultValue="Pedro Duarte"
                        className="pl-3 h-[45px] rounded-tl-none rounded-bl-none"
                      />
                    </div>
                  </div>
                  <Link
                    href="/forget-password"
                    className="mb-5 text-green-700 font-semibold"
                  >
                    Forget password?
                  </Link>
                </div>
                <button
                  className={cn(
                    "bg-green-900 rounded-lg text-center font-semibold  text-xl w-full py-2.5 text-white",
                    !active
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  )}
                >
                  Login
                </button>
                {/* <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter> */}
              </div>
            </DialogContent>
          </Dialog>
          <AspectRatioCom />
          <MyAvater />
          <MyBrande />
          {/* <MyAccording /> */}
          <PracticeAccording />
          <MyAlert />
          <MyCalander />
        </div>
      </Container>
    </div>
  );
}
