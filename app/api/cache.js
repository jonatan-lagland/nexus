import { revalidateTag } from 'next/cache'

export async function revalidateCache(tag) {
    try {
        revalidateTag(tag)
        console.log(`Revalidated ${tag}`)
    } catch (error) {
        console.log(error.message)
    }
}

export default revalidateCache;