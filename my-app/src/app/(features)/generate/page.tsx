"use client"
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import run from "@/services/gemini-controllers";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function GenFlashcardsHome() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      Files taking: pdf, video, audio, image, text. <br />
      Description: put in instructions on how I could make flashcards that are best suited for you.
      <UploadZone/>
    </main>
  );
}

const FormSchema = z.object({
  set_description: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
});

function UploadZone() {
  const {toast} = useToast();
  const [file, setFile] = useState<File | null>(null);

  const form =  useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data.set_description);
    if (!file) {
      toast({
        title: "Error",
        description: "Please upload a file to continue.",
      });

      return;
    }

    const formData = {
      ...data,
      file: file.name,
      fileLink: "/Users/nguyennhathoang_1/Desktop/" + file.name,
      fileType: file.type,
    };

    toast({
      title: "You submitted the following values:",
      description: (
        <pre>
          <code>{JSON.stringify(formData, null, 2)}</code>
        </pre>
      ),
    });

    run(formData.fileLink, formData.fileType);
  }
  


  return (
    <div className="block relative w-full space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <InputFile onFileChange={handleFileChange}/>
          <TextareaForm form={form}/>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};


export function TextareaForm({form} : {form: ReturnType<typeof useForm<z.infer<typeof FormSchema>>>}) {
  return (
    <FormField
      control={form.control}
      name="set_description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Set Description</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Tell us more about your set..."
              className="flex resize-y w-full"
              {...field}
            />
          </FormControl>
          <FormDescription>
            Describe the materials you uploaded and how you would like the flashcards to be made.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// this part is for file upload

function InputFile ({ onFileChange }: { onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void }): JSX.Element {
  return (
    <div className="items-center gap-1.5">
      <Label htmlFor="file">File</Label>
      <Input
        id="file"
        type="file"
        onChange={onFileChange}
        className="file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:border file:border-solid file:border-blue-700 file:rounded-md border-blue-600"
      />
    </div>
  )
}
