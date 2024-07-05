import { revalidateTag } from 'next/cache';

export async function GET(req) {
    const tagsToRevalidate = ['items', 'championList', 'latest_version', 'runes', 'queue_types'];
    const authHeader = req.headers.get('authorization');

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', {
            status: 401,
        });
    }

    try {
        for (const tag of tagsToRevalidate) {
            revalidateTag(tag);
        }
        return Response.json({ success: 'Tags revalidated successfully' }, { status: 200 });
    } catch (error) {
        return Response.json({ error: error }, { status: 500 });
    }
}