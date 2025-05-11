"use client"

import { DEV_API_URL } from '../constant';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import mainLogo from "../../../assets/googly_study_buddy_logo.png";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, Controller, FieldValues } from "react-hook-form";
import bcrypt from "bcryptjs";
import U from '@/utils';
import { useEffect } from 'react';

// TODO: move bcrypt here
function hashPasswordWithSalt(password: string, salt: string) : string {
  return '';
}

async function registerUserWithUsernameAndPassword(_username: string, _hashedPassword: string) {
  const url = DEV_API_URL;
  const content = {
    username: _username,
    hashedPassword: _hashedPassword
  }
  // TODO: remove
  console.log("register content: " + _username + _hashedPassword);
  try {
    const response = await fetch(url + 'auth/register_new', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(content),
    });
  
    console.log("Message: " + await response.text());
    
  } catch (e) {
    console.log("Error: " + e);
  }
}

async function authenticateUsernameAndPassword(_username: string, _password: string) {
  const content = {
    username: _username,
    // TODO: change to 'password' or hash this shit
    hashedPassword: _password,
  };

  const response = await fetch(DEV_API_URL + 'auth/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(content),
    credentials: 'include'
  }); 

  if (!response.ok) {
    throw new Error('Failed to authenticate');
  }
  
  return response.json();
}

// TODO: try the recommmend async bcrypt method, rn we're using sync for simplicity.
export default function AuthLoginPage() {
  const { control, handleSubmit } = useForm();
  const router = useRouter();
  
  /**
   * This is here to allow logged in user to not have to login again but redirected
   */
  useEffect(() => {
    const verifyToken = async() => {
      const response = await fetch(DEV_API_URL + 'auth/verify_token', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        router.push('/');
      }
    };

    verifyToken();
  }, [router]);

  const onRegistrationSubmit = async (data : FieldValues) => {
    // TODO: input validation
    console.log('SignUp: ' + data.signupUsername + data.signupPassword);
    const _salt = bcrypt.genSaltSync(10); // saltRound is per example
    const _hashedPassword = bcrypt.hashSync(data.signupPassword, _salt);
    await registerUserWithUsernameAndPassword(data.signupUsername, _hashedPassword);
  };

  const onLoginSubmit = async (data : FieldValues) => {
    console.log('LogIn: ' + data.loginUsername + data.loginPassword);
    try {
      await authenticateUsernameAndPassword(data.loginUsername, data.loginPassword);
      router.push('/');
    } catch(e) {
      console.error('Login failed: ', e);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Link href="/" >
        <Image width="150" alt="logo" height="150" src={mainLogo} />
      </Link>
      <span className="p-2"></span>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        {/* LOGIN TAB */}
        <TabsContent value="login"> 
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="loginUsername">Username</Label>
                  <Controller
                    name="loginUsername"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <Input id="loginUsername" {...field} />}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="loginPassword">Password</Label>
                  <Controller
                    name="loginPassword"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <Input id="loginPassword" type="password" {...field} />}
                  />
                </div>
                <Button type="submit">Login</Button> {/* TODO */}
              </form>
            </CardContent>
            <CardFooter>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* SIGN UP TAB */}
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Sign up here, it&apos;s free. Selling ur info btw 😈
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onRegistrationSubmit)} className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="signupUsername">Username</Label>
                  <Controller
                    name="signupUsername"
                    defaultValue=""
                    control={control}
                    render={({ field }) => <Input id="signupUsername" {...field} />}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="signupPassword">New password</Label>
                  <Controller
                    name="signupPassword"
                    defaultValue=""
                    control={control}
                    render={({ field }) => <Input id="signupPassword" type="password" {...field} />}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">Confirm password</Label>
                  <Input id="new" type="password" />
                </div>
                <Button type="submit">Sign Up (I agree to sell my info)</Button>
              </form>
            </CardContent>
            <CardFooter> 
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}