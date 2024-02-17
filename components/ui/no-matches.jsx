import {
    Ghost,
} from "lucide-react"

export default function NoMatches() {
    return (
        <section>
            <div className='container-header flex flex-row justify-start min-h-[42px] gap-2 rounded-t-lg border-t border-x border-x-slate-700 border-t-slate-700'>
            </div>
            <div className='flex flex-row min-h-[250px] bg-stone-900 justify-center items-center gap-4 border border-gray-600 rounded-b-lg p-3'>
                <Ghost size={44} color="#4B63A3" />
                <p className='text-gray-300 text-lg'>No matches found.</p>
            </div>
        </section>
    )
}