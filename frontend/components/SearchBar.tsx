'use client';

import { useState, useEffect } from "react";

// Form UI components
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "./ui/input";
import { Search } from "lucide-react";

// ZOD for form validation
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  query: z.string().min(1, { message: "A search query is required" }),
})


export default function SearchBar() {
    // v2 React Hook Form with ZOD validation
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            query: "",
        },
    })
    
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(`Searching for ${values.query}`);
    }

    return (
        <section className="flex items-center justify-center">
            <div className="w-full max-w-2xl p-2 flex items-center gap-2 border border-foreground/10 rounded-md">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-2xl flex items-center gap-2">
                        <FormField
                            control={form.control}
                            name="query"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            className="border-none bg-transparent"
                                            placeholder="Search" {...field} />
                                    </FormControl>
                                    <FormLabel className="hidden h-0 w-0 p-0 m-0">Search for a movie or TV show</FormLabel>
                            </FormItem>
                        )}
                        />

                        <Button type="submit" variant="ghost">
                            <Search className="w-4 h-4" />
                        </Button>
                    </form>
                </Form>
            </div>
        </section>
    );
}