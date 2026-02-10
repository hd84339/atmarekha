export default function InfoSection() {
    const cards = [
        {
            icon: "fa-book-open-reader",
            title: "Diverse Library",
            desc: "From mythological epics to modern slice-of-life, explore a vast collection of Indian stories.",
            color: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-50 dark:bg-blue-900/20"
        },
        {
            icon: "fa-pen-nib",
            title: "Creators First",
            desc: "Supporting independent Indian artists. Platform designed to help creators share their vision.",
            color: "text-purple-600 dark:text-purple-400",
            bg: "bg-purple-50 dark:bg-purple-900/20"
        },
        {
            icon: "fa-users",
            title: "Community Driven",
            desc: "Join a growing community of manga lovers. Discuss chapters, share fan art, and connect.",
            color: "text-emerald-600 dark:text-emerald-400",
            bg: "bg-emerald-50 dark:bg-emerald-900/20"
        },
        {
            icon: "fa-mobile-screen",
            title: "Read Anywhere",
            desc: "Optimized for all devices. Enjoy a seamless reading experience on mobile, tablet, or desktop.",
            color: "text-orange-600 dark:text-orange-400",
            bg: "bg-orange-50 dark:bg-orange-900/20"
        }
    ];

    return (
        <section className="py-24 bg-white dark:bg-zinc-950">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                        Why Choose Atma Rekha?
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                        More than just a platform, we are a movement to revive and revolutionize Indian storytelling.
                    </p>
                </div>

                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="group relative flex flex-col items-start p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50 border border-zinc-100 dark:border-zinc-800"
                        >
                            <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${card.bg} transition-transform duration-300 group-hover:scale-110`}>
                                <i className={`fa-solid ${card.icon} text-2xl ${card.color}`}></i>
                            </div>

                            <h3 className="text-lg font-semibold leading-8 tracking-tight text-zinc-900 dark:text-white">
                                {card.title}
                            </h3>

                            <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400 flex-1">
                                {card.desc}
                            </p>

                            <div className="mt-6 flex items-center text-sm font-medium text-zinc-900 dark:text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <span>Learn more</span>
                                <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
