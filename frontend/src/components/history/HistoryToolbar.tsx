"use client";

import { useState } from "react";

export default function HistoryToolbar({
    pageIndex,
    totalPages,
    mode,
    extracting,
    onPrev,
    onNext,
    onGoToPage,
    onToggleMode,
    onExtract,
}: any) {
    const [input, setInput] = useState(
        String(pageIndex + 1)
    );

    return (
        <div className="h-14 border-b bg-white px-4 flex items-center gap-3">

            <button
                onClick={onPrev}
                className="px-3 py-1 border rounded"
            >
                Prev
            </button>

            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        const page = Number(input);

                        if (!Number.isNaN(page)) {
                            onGoToPage(page - 1);
                        }
                    }
                }}
                className="w-20 border rounded px-2 py-1"
            />

            <span>
                / {totalPages}
            </span>

            <button
                onClick={onNext}
                className="px-3 py-1 border rounded"
            >
                Next
            </button>

            <button
                onClick={onToggleMode}
                className="px-3 py-1 rounded bg-blue-600 text-white"
            >
                {mode === "clean"
                    ? "Viewing Clean Text"
                    : "Viewing Raw Text"}
            </button>

            <button
                onClick={onExtract}
                disabled={extracting}
                className="px-3 py-1 rounded bg-green-600 text-white ml-auto"
            >
                {extracting
                    ? "Extracting..."
                    : "Extract Text"}
            </button>
        </div>
    );
}