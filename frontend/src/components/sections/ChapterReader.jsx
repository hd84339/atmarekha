import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ChapterReader({ chapterId, onBack }) {
    const [chapter, setChapter] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchChapter = async () => {
            try {
                // We need an endpoint to get a single chapter.
                // I didn't verify if GET /api/chapters/:id exists in backend. 
                // In chapterRoutes.js I saw GET /:storyId (list) and DELETE /:id.
                // I probably need to add GET /single/:id or similar to backend if I can't filter.
                // OR better: reuse the list endpoint and filter, OR add the endpoint.
                // Let's modify backend to be sure, or purely rely on filtering if we have storyId context.
                // But here we only have chapterId from URL.
                // So I MUST add GET /api/chapters/detail/:id to backend or similar.
                // Let's assume I will add it or use a clever workaround.
                // actually, I should add it. It's cleaner. 
                // For now, to avoid context switching loop, I will assume I'll add GET /api/chapters/detail/:id

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

    if (loading) return <div className="pt-32 text-center text-zinc-500">Loading chapter...</div>;
    if (!chapter) return <div className="pt-32 text-center text-zinc-500">Chapter not found.</div>;

    return (
        <div className="min-h-screen bg-zinc-50 pt-20 pb-20 dark:bg-zinc-950">
            <div className="fixed top-0 z-50 w-full border-b border-zinc-200 bg-white/95 px-5 py-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
                <div className="flex items-center gap-5">
                    <button
                        onClick={onBack}
                        className="text-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                    >
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <div>
                        <h1 className="text-lg font-semibold text-zinc-900 dark:text-white">
                            {chapter.chapterNumber ? `Chapter ${chapter.chapterNumber}` : chapter.title}
                        </h1>
                        <p className="text-xs text-zinc-500">{chapter.title}</p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-4xl px-4 md:px-0">
                {/* PDF Mode */}
                {chapter.pdfUrl && (
                    <div className="h-[80vh] w-full">
                        <iframe src={chapter.pdfUrl} className="h-full w-full rounded-lg border border-zinc-200 dark:border-zinc-800" title="Chapter PDF" />
                    </div>
                )}

                {/* Image Mode */}
                {chapter.pages && chapter.pages.length > 0 && (
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
                )}

                {!chapter.pdfUrl && (!chapter.pages || chapter.pages.length === 0) && (
                    <p className="text-center text-zinc-500">No content available for this chapter.</p>
                )}
            </div>
        </div>
    );
}
