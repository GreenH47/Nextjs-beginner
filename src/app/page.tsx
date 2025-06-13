// src/app/page.tsx

import Link from "next/link";


export default function Home() {
    return (
        <main className="relative h-screen overflow-hidden">
            {/* Hero background */}

            {/* Frosted overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            {/* Content */}
            <section className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
                <h1 className="text-4xl sm:text-6xl font-extrabold text-white drop-shadow-lg">
                    Welcome to Green's Demo App
                </h1>

                <p className="mt-4 max-w-prose text-lg text-white/90">
                    Next.js 15 · Clerk Auth · Supabase · Vercel 🤘
                </p>

                <nav className="mt-8 flex flex-wrap justify-center gap-4">
                    <Link
                        href="https://github.com/GreenH47/Nextjs-beginner"
                        target="_blank"
                        className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600
                       px-6 py-3 text-sm font-medium text-white shadow transition
                       hover:scale-105 hover:shadow-lg focus-visible:outline
                       focus-visible:outline-2 focus-visible:outline-offset-2
                       focus-visible:outline-blue-600"
                    >
                        View the Code ↗
                    </Link>

                    <Link
                        href="/dashboard"
                        className="rounded-lg border border-white/20 bg-white/10 px-6 py-3
                       text-sm font-medium text-white backdrop-blur
                       transition hover:bg-white/20 hover:scale-105
                       focus-visible:outline focus-visible:outline-2
                       focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                        User Dashboard
                    </Link>

                    <Link
                        href="/form"
                        className="rounded-lg bg-white/90 px-6 py-3 text-sm font-medium
                       text-blue-700 shadow transition hover:bg-white
                       hover:scale-105 focus-visible:outline
                       focus-visible:outline-2 focus-visible:outline-offset-2
                       focus-visible:outline-blue-600"
                    >
                        Message Form using supabase
                    </Link>

                    <Link
                        href="/qrcode"
                        className="rounded-lg bg-white/90 px-6 py-3 text-sm font-medium
                       text-blue-700 shadow transition hover:bg-white
                       hover:scale-105 focus-visible:outline
                       focus-visible:outline-2 focus-visible:outline-offset-2
                       focus-visible:outline-blue-600"
                    >
                        qrcode Generator using n8n
                    </Link>

                    <Link
                        href="/n8nui"
                        className="rounded-lg bg-white/90 px-6 py-3 text-sm font-medium
                       text-blue-700 shadow transition hover:bg-white
                       hover:scale-105 focus-visible:outline
                       focus-visible:outline-2 focus-visible:outline-offset-2
                       focus-visible:outline-blue-600"
                    >
                        n8nui
                    </Link>
                </nav>
            </section>
        </main>
    );
}
