import React from 'react'
import Header from '@components/Profile/Header'
import Section from '@components/Profile/Section'
import Sidebar from '@components/Profile/Sidebar'

const Champion = () => {
    return (
        <section className='profile'>
            <section className='grid grid-cols-1 grid-rows-4 gap-2 lg:grid-rows-3 lg:grid-cols-5 lg:gap-4 mx-auto w-full min-h-screen'>
                <article className="bg-blue-200 row-span-1 lg:row-span-1 lg:col-span-5">
                    <Header></Header>
                </article>
                <article className="bg-green-200 row-span-2 lg:row-span-2 lg:col-span-3">
                    <Section></Section>
                </article>
                <article className="bg-red-200 row-span-1 lg:row-span-2 lg:col-span-2">
                    <Sidebar></Sidebar>
                </article>
            </section>
        </section>
    )
}

export default Champion