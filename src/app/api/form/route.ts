import { UserSchema } from "@/types";
import { NextResponse } from "next/server";

// To implement server-side validation,
// we will leverage Next.js' backend capabilities
// to build a simple server. This server will receive and
// validate the data submitted through our form.
// 为了实现服务器端验证，我们将利用 Next.js
// 的后端功能构建一个简单的服务器。该服务器将接收并验证通过表单提交的数据。
export async function POST(request: Request) {
    // Retrieve the JSON data from the request body
    const body = await request.json();

    // Use Zod to validate the received data against the UserSchema
    const result = UserSchema.safeParse(body);

    // Check if the validation is successful
    if (result.success) {
        return NextResponse.json({ success: true });
    }

    // If validation errors, map them into an object
    const serverErrors = Object.fromEntries(
        result.error?.issues?.map((issue) => [issue.path[0], issue.message]) || []
    );

    // Respond with a JSON object containing the validation errors
    return NextResponse.json({ errors: serverErrors });
}