"use client";

import { useState, type ReactNode } from "react";
import {
    ChevronRight,
    Folder,
    FolderOpen,
    File as FileIcon,
    FileCode,
    FileJson,
    FileImage,
    FileText,
    FileAudio,
    FileVideo,
    FileArchive,
    Terminal,
    Settings,
    Box,
    LayoutTemplate,
    Globe,
    Database,
    LucideIcon
} from "lucide-react";
import clsx from "clsx";

// --- 1. Universal Icon Logic ---

function getFileIcon(filename: string): LucideIcon {
    const extension = filename.split(".").pop()?.toLowerCase();

    // Specific Filenames (High Priority)
    if (filename === "package.json") return Box;
    if (filename === "tsconfig.json" || filename.startsWith(".env")) return Settings;
    if (filename === "README.md") return FileText;
    if (filename === "next.config.js") return Settings;

    // Extension Mapping
    switch (extension) {
        // Code
        case "tsx":
        case "jsx":
            return LayoutTemplate; // Distinct icon for UI components
        case "ts":
        case "js":
        case "mjs":
        case "cjs":
            return FileCode;
        case "html":
            return Globe;
        case "css":
        case "scss":
        case "sass":
        case "less":
        case "tailwind":
            return FileCode; // Or Palette if you prefer

        // Data & Config
        case "json":
        case "yaml":
        case "yml":
        case "xml":
            return FileJson;
        case "sql":
        case "prisma":
            return Database;

        // Documents
        case "md":
        case "mdx":
        case "txt":
            return FileText;

        // Media
        case "png":
        case "jpg":
        case "jpeg":
        case "svg":
        case "gif":
        case "webp":
        case "ico":
            return FileImage;
        case "mp4":
        case "webm":
        case "mov":
            return FileVideo;
        case "mp3":
        case "wav":
            return FileAudio;

        // System / Shell
        case "sh":
        case "bash":
        case "zsh":
            return Terminal;
        case "zip":
        case "tar":
        case "gz":
        case "7z":
            return FileArchive;

        // Default
        default:
            return FileIcon;
    }
}

// --- 2. The Component ---

export type FolderProps = {
    name: string;
    defaultOpen?: boolean;
    children: ReactNode;
};

function renderFileIcon(filename: string) {
    const Icon = getFileIcon(filename);
    return <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />;
}

export function FileTreeFolder({ name, defaultOpen = false, children }: FolderProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="group/filetree">
            <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((previous) => !previous)}
                className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-left text-foreground/80 transition-colors hover:bg-muted/70 hover:text-foreground">
                <span className="inline-flex h-4 w-4 items-center justify-center">
                    <ChevronRight
                        className={clsx(
                            "h-3.5 w-3.5 text-muted-foreground transition-transform duration-150",
                            isOpen && "rotate-90"
                        )}
                    />
                </span>
                {isOpen ? (
                    <FolderOpen className="h-4 w-4 shrink-0 text-amber-500" />
                ) : (
                    <Folder className="h-4 w-4 shrink-0 text-amber-500" />
                )}
                <span className="truncate">{name}</span>
            </button>

            {isOpen ? (
                <div className="ml-[1.15rem] border-l border-border/80 pl-2.5">
                    <div className="space-y-1 py-1.5">{children}</div>
                </div>
            ) : null}
        </div>
    );
}

type FileTreeRootProps = {
    children: ReactNode;
    className?: string;
};

type FileTreeFileProps = {
    name: string;
};

export function FileTreeRoot({ children, className }: FileTreeRootProps) {
    return (
        <div
            className={clsx(
                "not-prose my-6 overflow-hidden overflow-x-auto border border-border bg-card/60 font-mono text-sm",
                className
            )}>
            <div className="space-y-1 p-2 sm:p-3">{children}</div>
        </div>
    );
}

export function FileTreeFile({ name }: FileTreeFileProps) {
    const extension = name.includes(".") ? name.split(".").pop()?.toUpperCase() : "";

    return (
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-foreground/80 transition-colors hover:bg-muted/60 hover:text-foreground">
            <span className="inline-flex h-4 w-4 items-center justify-center">
                <span className="h-1.5 w-1.5 rounded-full bg-border" />
            </span>
            {renderFileIcon(name)}
            <span className="truncate">{name}</span>
            {extension ? (
                <span className="ml-auto text-[10px] uppercase tracking-wide text-muted-foreground/70">{extension}</span>
            ) : null}
        </div>
    );
}

export const FileTree = {
    Root: FileTreeRoot,
    Folder: FileTreeFolder,
    File: FileTreeFile
};
