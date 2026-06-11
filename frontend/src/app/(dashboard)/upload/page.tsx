"use client";

import UploadArea from "../../../components/uploads/UploadArea";
import { Upload, FileText, CheckCircle } from "lucide-react";

export default function UploadPage() {
    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                    <Upload className="text-blue-600" size={32} />
                    Upload PDF
                </h1>
                <p className="text-slate-600 mt-2">Upload your PDF documents to extract notes and generate quizzes</p>
            </div>

            {/* Main Upload Area */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
                <UploadArea />
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureCard
                    icon={<FileText className="text-blue-500" size={24} />}
                    title="Extract Content"
                    description="Automatically extract text and structured content from your PDFs"
                />
                <FeatureCard
                    icon={<CheckCircle className="text-green-500" size={24} />}
                    title="Generate Quizzes"
                    description="Create interactive quizzes based on the extracted content"
                />
                <FeatureCard
                    icon={<Upload className="text-purple-500" size={24} />}
                    title="Multiple Formats"
                    description="Support for various PDF formats and document types"
                />
            </div>

            {/* Info Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3">📋 Supported File Types</h3>
                <ul className="text-blue-800 space-y-2 text-sm">
                    <li>✓ PDF documents (.pdf)</li>
                    <li>✓ Maximum file size: 50MB</li>
                    <li>✓ Scanned PDFs with OCR support</li>
                </ul>
            </div>
        </div>
    );
}

function FeatureCard({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition duration-200">
            <div className="mb-3">{icon}</div>
            <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-600 text-sm">{description}</p>
        </div>
    );
}
