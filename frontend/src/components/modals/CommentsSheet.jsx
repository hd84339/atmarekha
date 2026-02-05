export default function CommentsSheet({ isOpen, activeChapter, comments, inputValue, onInputChange, onSubmit, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[1900] bg-black/80" onClick={onClose}></div>
      <div className="fixed bottom-0 left-0 right-0 z-[2000] h-[72vh] rounded-t-3xl border-t-4 border-white/40 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Comments: {activeChapter}</h3>
          <button className="text-xl text-zinc-400" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="mb-4 h-[45vh] overflow-y-auto">
          {(comments || []).map((comment, idx) => (
            <div
              key={`${activeChapter}-${idx}`}
              className="mb-4 rounded-xl bg-zinc-100 p-3 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
            >
              <b className="mb-1 block text-zinc-900 dark:text-white">User:</b>
              {comment}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <input
            value={inputValue}
            onChange={onInputChange}
            placeholder="Add a comment..."
            className="flex-1 rounded-full border border-zinc-200 bg-zinc-100 px-5 py-3 text-sm text-zinc-800 outline-none dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
          />
          <button onClick={onSubmit} className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg text-black shadow-md">
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </>
  );
}
