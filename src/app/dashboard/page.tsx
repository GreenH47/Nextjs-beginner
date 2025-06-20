//src/app/dashboard/page.tsx
import { auth } from "@clerk/nextjs/server";
import { SessionDetails, UserDetails } from "./details";
// import { OnboardingDetails } from "./onboarding-details";

export default async function Dashboard() {
    const { userId, sessionClaims } = await auth()

    return (
        <div className="px-8 py-12 sm:py-16 md:px-20">
            {userId && (
                <>
                    <h1 className="text-3xl font-semibold text-black">
                        👋 Hi, {sessionClaims?.firstName || `Stranger`}

                    </h1>
                    <div className="grid gap-4 mt-8 lg:grid-cols-3">
                        <UserDetails />
                        <SessionDetails />
                        {/*<OnboardingDetails />*/}
                    </div>
                </>
            )}
        </div>
    );
}