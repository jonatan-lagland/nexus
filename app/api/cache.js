import { revalidateTag } from 'next/cache'

export async function revalidateCache(tag) {
    try {
        revalidateTag(tag)
    } catch (error) {
        console.log(error.message)
    }
}

export default revalidateCache;