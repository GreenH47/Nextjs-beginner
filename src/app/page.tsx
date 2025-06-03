//src/app/page.tsx
// import Image from "next/image";
// import Link from "next/link";
import homeImage from "/public/home.jpg";
import Hero from "@/components/hero";
import Link from 'next/link';

export default function Home() {
    return (
        <>
            {/*<Hero imgData={homeImage}*/}
            {/*      imgAlt="car factory"*/}
            {/*      title="lalala"/>*/}

            <Link
                href="/dashboard"
                className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5
                   text-sm font-medium text-white shadow-sm transition
                   hover:bg-blue-700 focus-visible:outline focus-visible:outline-2
                   focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
                Go to User's Dashboard
            </Link>
            <Link
                href="/form"
                className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5
                   text-sm font-medium text-white shadow-sm transition
                   hover:bg-blue-700 focus-visible:outline focus-visible:outline-2
                   focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
                Go to form page
            </Link>
        </>

    )

}
