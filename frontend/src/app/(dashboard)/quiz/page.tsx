"use client";

import { Brain } from "lucide-react";

export default function QuizPage() {
    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                    <Brain className="text-blue-600" size={32} />
                    Quiz
                </h1>
                <p className="text-slate-600 mt-2">Test your knowledge with interactive quizzes</p>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
                <div className="space-y-4">
                    <Brain className="mx-auto text-slate-300" size={64} />
                    <h2 className="text-2xl font-semibold text-slate-900">Hello, Quiz World! 👋</h2>
                    <p className="text-slate-600 text-lg">Quiz feature coming soon...</p>
                </div>
            </div>

            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
                    <div className="text-2xl mb-2">📝</div>
                    <h3 className="font-semibold text-slate-900 mb-2">Multiple Choice</h3>
                    <p className="text-slate-600 text-sm">Answer questions from your documents</p>
                </div>
                <div className="bg-purple-50 rounded-lg border border-purple-200 p-6">
                    <div className="text-2xl mb-2">⚡</div>
                    <h3 className="font-semibold text-slate-900 mb-2">Quick Review</h3>
                    <p className="text-slate-600 text-sm">Fast-paced quiz mode for quick learning</p>
                </div>
                <div className="bg-green-50 rounded-lg border border-green-200 p-6">
                    <div className="text-2xl mb-2">📊</div>
                    <h3 className="font-semibold text-slate-900 mb-2">Track Progress</h3>
                    <p className="text-slate-600 text-sm">Monitor your quiz performance</p>
                </div>
            </div>
        </div>
    );
}
