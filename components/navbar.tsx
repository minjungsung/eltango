"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/70 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="#" className="font-semibold tracking-tight">
          엘땅고
        </Link>
        <nav className="hidden gap-8 text-sm md:flex">
          <a href="#features" className="text-muted-foreground hover:text-foreground">특징</a>
          <a href="#schedule" className="text-muted-foreground hover:text-foreground">수업시간</a>
          <a href="#instructors" className="text-muted-foreground hover:text-foreground">강사진</a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground">수강료</a>
          <a href="#faq" className="text-muted-foreground hover:text-foreground">FAQ</a>
        </nav>
        <div className="hidden md:block">
          <Button asChild>
            <a href="#register">수강신청하기</a>
          </Button>
        </div>
        <button
          className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="메뉴"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      <div className={cn("md:hidden border-t", open ? "block" : "hidden")}> 
        <div className="container grid gap-2 py-4 text-sm">
          <a href="#features" onClick={() => setOpen(false)}>특징</a>
          <a href="#schedule" onClick={() => setOpen(false)}>수업시간</a>
          <a href="#instructors" onClick={() => setOpen(false)}>강사진</a>
          <a href="#pricing" onClick={() => setOpen(false)}>수강료</a>
          <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
          <Button asChild className="mt-2">
            <a href="#register" onClick={() => setOpen(false)}>수강신청하기</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
