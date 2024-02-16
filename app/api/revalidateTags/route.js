import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export function GET() {
    const tagsToRevalidate = ['items', 'championList', 'latest_version', 'runes', 'queue_types'];

    try {
        for (const tag of tagsToRevalidate) {
            revalidateTag(tag);
        }
        return NextResponse.json({ success: 'Tags revalidated successfully' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}