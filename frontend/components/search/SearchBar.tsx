'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Form UI components
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

// ZOD for form validation
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    query: z.string().min(1, { message: "A search query is required" }),
})

export default function SearchBar({ variant }: { variant?: "header" | "standard" }) {
    const router = useRouter();
    const pathname = usePathname();

    // v2 React Hook Form with ZOD validation
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            query: "",
        },
    })

    // if we're on the main / or the /search page, we will hide the header search bar variant
    const isHidden = variant === "header" && (pathname === "/" || pathname === "/search");

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(`Searching for ${values.query}`);
        router.push(`/search/${values.query}`);
        form.reset();
    }

    return (
        <section className={`flex items-center justify-center ${isHidden ? "hidden" : ""}`} data-testid="search-bar">
            <div className={`w-full max-w-2xl p-2 flex items-center gap-2 border border-foreground/10 rounded-md ${variant === "header" ? "p-1 px-2 max-h-9" : ""}`}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-2xl flex items-center gap-2">
                        <FormField
                            control={form.control}
                            name="query"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input
                                            className="border-none bg-transparent"
                                            placeholder="Search" {...field} />
                                    </FormControl>
                                    <FormLabel className="hidden h-0 w-0 p-0 m-0">Search for a movie or TV show</FormLabel>
                                </FormItem>
                            )}
                        />

                        <Button type="submit" variant="ghost" data-testid="search-bar-button">
                            <Search className="w-4 h-4" />
                        </Button>
                    </form>
                </Form>
            </div>
        </section>
    );
}