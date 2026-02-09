import { useState, useEffect } from 'react';
import AdminStories from './AdminStories';
import AdminChapters from './AdminChapters';

export default function Dashboard() {
    const [view, setView] = useState('home');
    const [selectedStoryId, setSelectedStoryId] = useState(null);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

    // Handle hash-based routing for direct links
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash.startsWith('#admin-chapters/')) {
                const storyId = hash.split('/')[1];
                setSelectedStoryId(storyId);
                setView('chapters');
            } else if (hash === '#dashboard') {
                setView('home');
                setSelectedStoryId(null);
            }
        };

        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const renderContent = () => {
        if (view === 'chapters' && selectedStoryId) {
            return (
                <AdminChapters
                    apiBaseUrl={apiBaseUrl}
                    storyId={selectedStoryId}
                    onBack={() => {
                        window.location.hash = '#dashboard';
                        setView('stories'); // Go back to stories list usually
                    }}
                />
            );
        }

        if (view === 'stories') {
            return (
                <div>
                    <button onClick={() => setView('home')} className="mb-4 flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
                        &larr; Back to Dashboard
                    </button>
                    <AdminStories apiBaseUrl={apiBaseUrl} />
                </div>
            );
        }

        return (
            <>
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Admin Dashboard</h1>
                <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                    Welcome to the AtmaRekha admin panel. Select an option below to manage content.
                </p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div
                        onClick={() => setView('stories')}
                        className="cursor-pointer rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
                    >
                        <h3 className="font-semibold text-zinc-900 dark:text-white">Manage Stories & Chapters</h3>
                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Add, edit, or delete stories and their chapters.</p>
                    </div>

                    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 opacity-50">
                        <h3 className="font-semibold text-zinc-900 dark:text-white">User Comments</h3>
                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Moderate and reply to reader comments. (Coming Soon)</p>
                    </div>

                    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 opacity-50">
                        <h3 className="font-semibold text-zinc-900 dark:text-white">Analytics</h3>
                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">View readership content. (Coming Soon)</p>
                    </div>
                </div>
            </>
        );
    };

    return (
        <main className="min-h-screen px-6 pt-28 pb-20">
            <div className="mx-auto max-w-4xl">
                {renderContent()}
            </div>
        </main>
    );
}
