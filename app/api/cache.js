import { revalidateTag } from 'next/cache'

export function revalidateCache(tag) {
    try {
        revalidateTag(tag)
    } catch (error) {
        return;
    }
}

export default revalidateCache;