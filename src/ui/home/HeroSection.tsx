"use client";

import { ChevronRight } from "lucide-react";
import Button from "../shared/Button";

export default function HeroSection() {
    return (
        <div className="flex flex-col gap-10 mt-36">
            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                Thoughtful articles on technology, ideas and learning.
            </h1>
            <h6 className="text-lg text-muted-foreground md:text-xl">Curated with Care.</h6>
            {/* Button Containers */}
            <div className="flex flex-wrap items-center gap-4">
                <Button label="Browse Articles" onClick={() => {}} />
                <Button label="Browse by Category" type="ghost" endIcon={<ChevronRight />} onClick={() => {}} />
            </div>
        </div>
    );
}
