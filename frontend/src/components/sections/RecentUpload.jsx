import { useState, useEffect } from 'react';
import axios from 'axios';
import { gsap } from 'gsap';
import ReviewModal from '../modals/ReviewModal';

export default function RecentUpload() {
  const [stories, setStories] = useState([]);
  const [reviewStory, setReviewStory] = useState(null); // Story being reviewed
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/api/stories`);
        setStories(res.data);
      } catch (err) {
        console.error('Failed to fetch stories:', err);
      }
    };
    fetchStories();
  }, []);

  const handleReviewClick = (e, story) => {
    e.stopPropagation(); // Prevent card click (navigation)
    setReviewStory(story);
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h2 className="mb-7 text-center text-xl font-semibold text-zinc-900 dark:text-white">Recent Uploads</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {stories.map(story => (
          <div
            key={story._id}
            className="card-animate overflow-hidden rounded-xl border border-zinc-200 bg-white transition hover:-translate-y-1.5 hover:shadow-deep dark:border-zinc-800 dark:bg-zinc-900 cursor-pointer group"
            onClick={() => window.location.hash = `#reading/${story._id}`}
          >
            <div className="relative">
              <img
                src={story.coverImage}
                alt={story.title}
                className="h-56 w-full object-cover"
              />
              <button
                onClick={(e) => handleReviewClick(e, story)}
                className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-blue-600 shadow-md backdrop-blur transition hover:bg-white hover:text-blue-700 opacity-0 group-hover:opacity-100"
              >
                <i className="fa-regular fa-pen-to-square mr-1"></i> Review
              </button>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{story.title}</h3>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{story.author}</p>
              <span className="mt-3 inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                {story.status}
              </span>
            </div>
          </div>
        ))}
        {stories.length === 0 && (
          <p className="col-span-full text-center text-zinc-500">No stories available.</p>
        )}
      </div>

      <ReviewModal
        isOpen={!!reviewStory}
        onClose={() => setReviewStory(null)}
        storyId={reviewStory?._id}
        storyTitle={reviewStory?.title}
      />
    </section>
  );
}
