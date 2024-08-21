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
  return (
    <div>
      <Carousel className="w-full max-w-xs m-32">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
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