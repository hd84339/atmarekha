import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ChapterReader({ chapterId, onBack }) {
    const [chapter, setChapter] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchChapter = async () => {
            try {
                const res = await axios.get(`${apiBaseUrl}/api/chapters/detail/${chapterId}`);
                setChapter(res.data);
            } catch (err) {
                console.error('Failed to fetch chapter:', err);
            } finally {
                setLoading(false);
            }
        };

        if (chapterId) fetchChapter();
    }, [chapterId]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
        );
    }

    if (!chapter) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 dark:bg-zinc-900 dark:text-zinc-600">
                    <i className="fa-solid fa-book-open text-2xl"></i>
                </div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Chapter not found</h2>
                <p className="mt-2 text-zinc-500">This chapter may have been removed or doesn't exist.</p>
                <button
                    onClick={onBack}
                    className="mt-6 rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition hover:bg-blue-700"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            {/* Fixed Header */}
            <div className="fixed top-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/95">
                <div className="mx-auto flex max-w-5xl items-center gap-4 px-6 py-4">
                    <button
                        onClick={onBack}
                        className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
                        title="Go back"
                    >
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <div className="flex-1 min-w-0">
                        <h1 className="truncate text-lg font-bold text-zinc-900 dark:text-white">
                            Chapter {chapter.chapterNumber}
                        </h1>
                        <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">{chapter.title}</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="pt-20 pb-12">
                {/* PDF Mode */}
                {chapter.pdfUrl && (
                    <div className="mx-auto max-w-5xl px-6">
                        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <iframe
                                src={chapter.pdfUrl}
                                className="h-[85vh] w-full"
                                title="Chapter PDF"
                            />
                        </div>
                    </div>
                )}

                {/* Image Mode */}
                {chapter.pages && chapter.pages.length > 0 && (
                    <div className="mx-auto max-w-4xl">
                        <div className="flex flex-col gap-0">
                            {chapter.pages.map((page, index) => (
                                <img
                                    key={index}
                                    src={page}
                                    alt={`Page ${index + 1}`}
                                    className="w-full"
                                    loading="lazy"
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* No Content */}
                {!chapter.pdfUrl && (!chapter.pages || chapter.pages.length === 0) && (
                    <div className="mx-auto max-w-3xl px-6">
                        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 bg-white py-20 dark:border-zinc-800 dark:bg-zinc-900">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-zinc-300 dark:bg-zinc-800 dark:text-zinc-600">
                                <i className="fa-solid fa-file-circle-xmark text-2xl"></i>
                            </div>
                            <h3 className="font-semibold text-zinc-900 dark:text-white">No content available</h3>
                            <p className="mt-1 text-zinc-500">This chapter hasn't been uploaded yet.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
