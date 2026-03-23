export default function Footer() {
  return (
    <footer className="w-full py-12 bg-surface border-t border-outline-variant/15">
      <div className="flex flex-col items-center gap-6 w-full max-w-7xl mx-auto font-label uppercase text-[0.75rem] tracking-widest">
        <div className="flex gap-8 md:gap-12 mb-4">
          <a
            className="text-white/40 hover:text-primary hover:underline underline-offset-4 decoration-primary transition-all duration-300"
            href="mailto:ahmedabb101@gmail.com"
          >
            Email
          </a>
          <a
            className="text-white/40 hover:text-primary hover:underline underline-offset-4 decoration-primary transition-all duration-300"
            href="https://linkedin.com/in/ahmedabbascs"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="text-white/40 hover:text-primary hover:underline underline-offset-4 decoration-primary transition-all duration-300"
            href="https://x.com/ahmedabbascs"
            target="_blank"
            rel="noopener noreferrer"
          >
            X (Twitter)
          </a>
          <a
            className="text-white/40 hover:text-primary hover:underline underline-offset-4 decoration-primary transition-all duration-300"
            href="https://github.com/ahmedabb104"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>
        <p className="text-[0.6rem] text-outline/50 tracking-[0.4em]">
          &copy; {new Date().getFullYear()} &mdash; AHMED ABBAS
        </p>
      </div>
    </footer>
  )
}
