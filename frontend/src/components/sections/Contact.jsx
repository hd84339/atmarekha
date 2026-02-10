
export default function Contact() {
    return (
        <div className="min-h-screen pt-28 pb-20 px-6">
            <div className="mx-auto max-w-4xl">
                <button
                    onClick={() => window.location.hash = '#index'}
                    className="mb-8 flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition"
                >
                    &larr; Back to Home
                </button>

                <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">Contact Us</h1>
                <p className="text-zinc-500 dark:text-zinc-400 mb-12 text-lg">
                    We'd love to hear from you. Reach out to us for any queries, support, or feedback.
                </p>

                <div className="grid gap-12 md:grid-cols-2">
                    {/* Contact Details */}
                    <div>
                        <div className="rounded-2xl bg-zinc-900 p-8 text-white shadow-xl dark:bg-zinc-800">
                            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                            <p className="text-zinc-300 mb-8">
                                Our team is ready to assist you.
                            </p>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center dark:bg-zinc-700">
                                    <i className="fas fa-envelope text-blue-400"></i>
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-400 uppercase font-semibold tracking-wider">Email Us</p>
                                    <a href="mailto:atmarekha4u@gmail.com" className="font-medium hover:text-blue-300 transition">
                                        atmarekha4u@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center dark:bg-zinc-700">
                                    <i className="fas fa-phone text-blue-400"></i>
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-400 uppercase font-semibold tracking-wider">Call Us</p>
                                    <a href="tel:+917204137931" className="font-medium hover:text-blue-300 transition">
                                        +91 72041 37931
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info or Form Placeholder */}
                    <div className="flex flex-col justify-center space-y-6">
                        <div className="p-6 rounded-xl bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
                            <h3 className="font-bold text-lg mb-2 text-zinc-900 dark:text-white">Business Inquiries</h3>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                For partnerships, advertising, or press inquiries, please use the email above with the subject "Business Inquiry".
                            </p>
                        </div>
                        <div className="p-6 rounded-xl bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
                            <h3 className="font-bold text-lg mb-2 text-zinc-900 dark:text-white">Creator Support</h3>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                Are you an artist looking to publish? We'd love to see your work. Send us your portfolio!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
