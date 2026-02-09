import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ReadingPage({
  storyId,
  displayRating,
  isSaved,
  onOpenRating,
  onToggleSave,
  onSortToggle,
  onOpenComments,
  onBack
}) {
  const [chapters, setChapters] = useState([]);
  const [story, setStory] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    if (!storyId) return;

    const fetchData = async () => {
      try {
        // Fetch story details (we need an endpoint for single story or filter from list)
        // Since we don't have GET /api/stories/:id, we can fetch all and find, or add the endpoint.
        // For now, let's try fetching all and filtering (less efficient but works without backend change immediately)
        // OR better: Just fetch chapters and if we need story metadata, we might need to add that endpoint.
        // Actually I implemented GET /api/stories (all) and GET /api/chapters/:storyId

        // Let's just fetch chapters first. Story title might need to be passed or fetched.
        // I'll cheat slightly and fetch all stories to find the title for now to avoid backend switch context if possible.
        // Wait, I should probably check if I implemented GET /api/stories/:id.
        // Checking my memory/logs... I implemented DELETE /:id but not GET /:id in storyRoutes.
        // I'll fetch all stories and find the one.

        const storiesRes = await axios.get(`${apiBaseUrl}/api/stories`);
        const foundStory = storiesRes.data.find(s => s._id === storyId);
        setStory(foundStory);

        const chaptersRes = await axios.get(`${apiBaseUrl}/api/chapters/${storyId}`);
        setChapters(chaptersRes.data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };
    fetchData();
  }, [storyId]);

  return (
    <main className="pt-16">
      <div className="sticky top-0 z-50 flex items-center gap-5 border-b border-zinc-200 bg-white/95 px-5 py-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
        <button className="text-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white" onClick={onBack}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        {story && (
          <>
            <img
              src={story.coverImage}
              alt={story.title}
              className="h-16 w-12 rounded-lg border border-zinc-200 object-cover dark:border-zinc-800"
            />
            <div>
              <h1 className="text-lg font-semibold text-zinc-900 dark:text-white">{story.title}</h1>
              <div className="mt-1 flex gap-4">
                <button
                  onClick={onOpenRating}
                  className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                >
                  <i className="fa-solid fa-star text-yellow-400"></i>
                  <span>{displayRating}</span>
                </button>
                <button
                  onClick={onToggleSave}
                  className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                >
                  <i className={isSaved ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'}></i>
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mx-auto max-w-2xl px-5 py-6">
        <div className="mb-4 flex items-center justify-between text-sm text-zinc-500">
          <span className="font-semibold">{chapters.length} Chapters</span>
          <button
            onClick={onSortToggle}
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            <i className="fa-solid fa-sort"></i>
            Sort
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {chapters.map((ch) => (
            <div
              key={ch._id}
              className="grid grid-cols-[64px_1fr_auto_56px] items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-4 text-sm transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            >
              <a href={`#read-chapter/${ch._id}`} className="contents">
                <span className="font-bold text-zinc-900 dark:text-white">Ch. {ch.chapterNumber}</span>
                <span className="truncate text-zinc-700 dark:text-zinc-200">{ch.title}</span>
                <span className="text-xs text-zinc-400">{new Date(ch.createdAt).toLocaleDateString()}</span>
              </a>
              <button
                className="rounded-full p-2 text-zinc-400 transition hover:text-zinc-900 dark:hover:text-white"
                onClick={() => onOpenComments(ch.chapterNumber)}
              >
                <i className="fa-regular fa-comment-dots"></i>
              </button>
            </div>
          ))}
          {chapters.length === 0 && (
            <p className="text-center text-zinc-500">No chapters uploaded yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}
