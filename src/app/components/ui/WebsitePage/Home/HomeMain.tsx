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
import ClassManage from "../ClassManage/ClassManage";

export default function HomeMain() {
  const [active, setActive] = useState(false);

  return (
    <div>
      <ClassManage />
    </div>
  );
}
