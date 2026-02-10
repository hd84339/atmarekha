
export default function About() {
    return (
        <div className="min-h-screen pt-28 pb-20 px-6">
            <div className="mx-auto max-w-4xl">
                <button
                    onClick={() => window.location.hash = '#index'}
                    className="mb-8 flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition"
                >
                    &larr; Back to Home
                </button>

                <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-6">About Atma Rekha</h1>
                <div className="prose prose-zinc dark:prose-invert max-w-none">
                    <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-6">
                        Welcome to Atma Rekha, your premier destination for discovering and reading Indian Manga (Indo-Manga).
                        Our platform is dedicated to showcasing the rich storytelling traditions of India through the vivid and dynamic medium of manga.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 my-12">
                        <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-2xl">
                            <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white">Our Mission</h3>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                To provide a global stage for Indian artists and storytellers, bringing their unique perspectives and cultural narratives to manga readers everywhere.
                            </p>
                        </div>
                        <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-2xl">
                            <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white">Our Vision</h3>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                To build a thriving community where creators and fans connect, inspiring a new wave of creativity in the Indian comic industry.
                            </p>
                        </div>
                    </div>

                    <p className="text-zinc-600 dark:text-zinc-400">
                        Whether you are here to read action-packed adventures, heartfelt dramas, or mythological epics, Atma Rekha has something for everyone.
                        Join us on this journey as we explore the soul lines of Indian storytelling.
                    </p>
                </div>
            </div>
        </div>
    );
}
