// import Link from 'next/link';
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'

export default function Header() {
    return (
        <ClerkProvider>
            <header className="flex justify-between items-center p-4">
                <h1 className="text-2xl font-bold">
                    <a href="/">
                        Green's homepage
                    </a>
                </h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <a href="/dashboard" className="text-blue-500 hover:underline">
                                dashboard
                            </a>
                        </li>
                        <li>
                            <a href="/form" className="text-blue-500 hover:underline">
                                form
                            </a>
                        </li>

                        <li>
                            <a href="/qrcode" className="text-blue-500 hover:underline">
                                qrcode
                            </a>
                        </li>

                        <li>
                            <a href="/n8nui" className="text-blue-500 hover:underline">
                                n8nui
                            </a>
                        </li>

                        <li>
                            <a href="/lipsync" className="text-blue-500 hover:underline">
                                Wawa Lipsync
                            </a>
                        </li>

                    </ul>
                </nav>
                <SignedOut>
                    <SignInButton/>
                    <SignUpButton/>
                </SignedOut>
                <SignedIn>
                <UserButton />
                </SignedIn>
            </header>
        </ClerkProvider>
    );
}
