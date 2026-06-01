import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: { current?: string };
    }>(req, process.env.SANITY_REVALIDATE_SECRET);

    // Validate the request signature (recommended for production)
    if (!isValidSignature && process.env.NODE_ENV === "production") {
      return new Response("Invalid signature", { status: 401 });
    }

    if (!body?._type) {
      return new Response("Bad Request", { status: 400 });
    }

    // Revalidate based on document type
    switch (body._type) {
      case "settings":
      case "header":
      case "footer":
      case "banner":
        // These are global, revalidate everything
        revalidatePath("/", "layout");
        break;
      case "page":
        revalidatePath("/", "layout");
        if (body.slug?.current) {
          revalidatePath(`/${body.slug.current}`);
        }
        break;
      case "post":
        revalidatePath("/blog", "page");
        if (body.slug?.current) {
          revalidatePath(`/blog/${body.slug.current}`);
        }
        break;
      case "contact":
        revalidatePath("/contact");
        break;
      default:
        // Fallback: revalidate everything
        revalidatePath("/", "layout");
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
    });
  } catch (err: any) {
    console.error(err);
    return new Response(err.message, { status: 500 });
  }
}
