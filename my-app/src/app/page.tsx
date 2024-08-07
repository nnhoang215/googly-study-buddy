/* eslint-disable max-len */
import Image from "next/image";
import mainLogo from "../../assets/googly_study_buddy_logo.png";
import { Button } from "@/components/ui/button";
import Link from 'next/link';


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <strong>You upload materials, I make flashcards for you. Simple as that.</strong>
      <Image width="300" alt="logo" height="300" src={mainLogo} />
      <Link href="/generate-flashcards">
        <Button className="m-10">Start Studying</Button>
      </Link>
    </main>
  );
}
