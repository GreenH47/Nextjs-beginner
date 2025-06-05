"use client";

import { startTransition, useState } from "react";
import { useForm } from "react-hook-form";                   // intuitive form API :contentReference[oaicite:0]{index=0}
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";       // RHF ↔ Zod bridge :contentReference[oaicite:1]{index=1}
import { createMessage } from "./actions";
import { schema } from "./schema";

// const schema = z.object({
//     name: z.string().min(1, "Subject is required").max(120),
//     body: z.string().min(1, "Body is required").max(5000),     // mirrors DB checks :contentReference[oaicite:2]{index=2}
// });
type FormValues = z.infer<typeof schema>;

export default function FormClient() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({ resolver: zodResolver(schema) });

    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    /** Runs only after Zod says the payload is valid */
    const onValid = (values: FormValues) => {
        const fd = new FormData();
        fd.append("name", values.name);
        fd.append("body", values.body);

        // keep UI responsive during async work 🎈 :contentReference[oaicite:3]{index=3}
        startTransition(async () => {
            const res = await createMessage(undefined, fd);
            if (res.ok) {
                alert(`✅ Message saved! Row id: ${res.id}`);
                reset();
                setErrorMsg(null);
            } else {
                setErrorMsg(res.message);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-4">
            <input
                {...register("name")}
                placeholder="Subject"
                maxLength={120}
                className="border rounded p-2"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

            <textarea
                {...register("body")}
                placeholder="Your message (max 5000 chars)…"
                maxLength={5000}
                rows={6}
                className="border rounded p-2"
            />
            {errors.body && <p className="text-red-500 text-sm">{errors.body.message}</p>}

            {errorMsg && <p className="text-red-600 text-sm">❌ {errorMsg}</p>}

            <button
                type="submit"
                disabled={isSubmitting}
                className="rounded bg-blue-600 text-white py-2 font-medium hover:bg-blue-700 disabled:opacity-50"
            >
                {isSubmitting ? "Saving…" : "Save"}
            </button>
        </form>
    );
}
