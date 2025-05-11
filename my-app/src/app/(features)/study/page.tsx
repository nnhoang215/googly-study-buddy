'use client'

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect, useState } from "react";
import { DEV_API_URL } from "@/app/constant";

export default function GenFlashcardsHome() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <ShortcutsBar />
      <FlashCardCarousel />
    </main>
  );
}

export function ShortcutsBar() {
  return (
    <div className="fixed z-10">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Prev &lt;-</MenubarTrigger>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Flip &uarr;</MenubarTrigger>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Next -&gt;</MenubarTrigger>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Flashcard</MenubarTrigger>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Reshuffle</MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>);
}

export function FlashCardCarousel() {
  const [displayList, setDisplayList] = useState<Flashcard[]>([]);
  const [isLoading, setLoading] = useState(true);
  const tags = ["67d653de7e8649d34bc74594", "67d6555a1c98aa1f1e3ec30a"];
  
  useEffect(() => {
    const loadFlashCards = async() => {
      const content = {
        tags: tags
      };

      console.log(content);
      const response = await fetch(DEV_API_URL + 'api/flashcards/get', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(content),
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json();
        setDisplayList(data);
        setLoading(false);
      }
    }

    loadFlashCards();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (displayList.length == 0) return <p>No flashcards</p>;
  console.log(displayList);
  return (
    <div>
      <Carousel className="w-full max-w-xs m-32">
      <CarouselContent>
        {displayList.map((flashcard, index) => (
          <CarouselItem key={flashcard._id}>
            <div className="p-1">
              <Card>
                <CardContent className=" aspect-square items-center justify-center  p-6">
                  <p className="text-2xl font-semibold mb-4">
                    {flashcard.question}
                  </p>
                  <p className="text-lg text-gray-500">
                    {flashcard.answer}
                  </p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </div>
  );
}