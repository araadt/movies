import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const onSearch = (query: string) => {
    // Hello, world
    console.log(`Searching for ${query}`);
};

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");

    
    const handleSearch = (query: string) => {
        onSearch(query);  
    };

    return (
        <section className="flex items-center justify-center">
            <div className="w-full max-w-2xl p-2 flex items-center gap-2 border border-foreground/10 rounded-md">
                <Input
                    type="text"
                    placeholder="Search"
                    className="w-full border-none bg-transparent"
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch(searchQuery);
                        }
                    }}
                    />
                <Button onClick={() => handleSearch(searchQuery)} variant="ghost">
                    <Search className="w-4 h-4" />
                </Button>
            </div>
        </section>
    );
}