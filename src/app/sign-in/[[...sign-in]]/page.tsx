import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
        <div className="mt-6 border rounded-md p-4 bg-muted text-sm">
            <p className="font-medium mb-2">Test accounts</p>
            <ul className="list-disc pl-5 space-y-1">
                <li>
                    <span className="font-semibold">greenh</span> / 12#$qwER
                </li>
            </ul>
        </div>
    </div>

  )
}
