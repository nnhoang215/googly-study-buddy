'use client'

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { DEV_API_URL } from "../constant";

export default function AuthLoginPage() {
  const [username, setUsername] = useState('');
  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    const getData = async() => {
      const response = await fetch(DEV_API_URL + 'auth/verify_token', {
        method: 'GET',
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setUsername(data.current_user.username);
        setLoading(false);
      }
    }

    getData();
  }, []);
  
  if (isLoading) return <p>Loading...</p>
  if (!username) return <p>No profile data</p>

  return(
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card>
        <CardHeader>
          <CardTitle>My Account</CardTitle>
        </CardHeader>
        <CardContent>
          <p>username:</p>
          <Input defaultValue={username}></Input>
        </CardContent>
        <CardFooter>
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </main>
  );  
}