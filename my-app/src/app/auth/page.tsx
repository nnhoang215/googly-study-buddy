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
import { useForm, Controller, FieldValues } from "react-hook-form";
import bcrypt from "bcryptjs";
import U from '@/utils';
// import { z } from "zod";

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
    const response = await fetch(url + 'api/user/register', {
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
  const url = DEV_API_URL;
  const content = {
    username: _username,
    // TODO: change to 'password' or hash this shit
    hashedPassword: _password,
  };

  try {
    const response = await fetch(url + 'auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(content)
    }); 

    const jsonRes = await response.json();

    // TODO: there are better ways to store jwt token, but for now, we store it in localStorage
    localStorage.setItem('authToken', jsonRes.token);
    // TODO: remove
    U.log('Stored in local storage: ' + localStorage.getItem('authToken'));
  } catch (e) {
    console.log(e);
  }

}

// TODO: try the recommmend async bcrypt method, rn we're using sync for simplicity.
export default function AuthLoginPage() {
  const { control, handleSubmit } = useForm();

  const onRegistrationSubmit = async (data : FieldValues) => {
    // TODO: input validation
    console.log('SignUp: ' + data.signupUsername + data.signupPassword);
    const _salt = bcrypt.genSaltSync(10); // saltRound is per example
    const _hashedPassword = bcrypt.hashSync(data.signupPassword, _salt);
    await registerUserWithUsernameAndPassword(data.signupUsername, _hashedPassword);
  };

  const onLoginSubmit = async (data : FieldValues) => {
    console.log('LogIn: ' + data.loginUsername + data.loginPassword);
    await authenticateUsernameAndPassword(data.loginUsername, data.loginPassword);
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
                    render={({ field }) => <Input id="loginUsername" placeholder="austin_nguyen01"{...field} />}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="loginPassword">Password</Label>
                  <Controller
                    name="loginPassword"
                    control={control}
                    render={({ field }) => <Input id="loginPassword" type="password" placeholder="@RickRolled" {...field} />}
                  />
                </div>
                <Button type="submit">Login</Button> {/* TODO */}
              </form>
            </CardContent>
            <CardFooter>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* SIGNUP TAB */}
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
                    control={control}
                    render={({ field }) => <Input id="signupUsername" {...field} />}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="signupPassword">New password</Label>
                  <Controller
                    name="signupPassword"
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