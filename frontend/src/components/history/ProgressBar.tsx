export default function ProgressBar({
    progress,
    status
}: {
    progress: number;
    status: string;
}) {
    return (
        <div className="w-full bg-gray-200 h-2">
            <div
                className="bg-green-500 h-2 transition-all"
                style={{ width: `${progress}%` }}
            />
            <div className="text-xs p-1">{status}</div>
        </div>
    );
}