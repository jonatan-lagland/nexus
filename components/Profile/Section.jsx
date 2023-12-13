'use client'

import { useState, useEffect } from 'react';
import React from 'react'
import Image from 'next/image';
import {
    useImgPathItem,
} from '@utils/images';


function Section(props) {
    const AVATAR_WIDTH = 64;
    const AVATAR_HEIGHT = 64;
    const [imgPath, setImgPath] = useState("");
    useImgPathItem(setImgPath);

    return (
        <section className="flex justify-start p-2">
            {imgPath ? (
                <div>
                    <div className="container-blue p-3">
                        <div className="title-recommended">Recommended</div>
                        <div className="container-blue-light p-1 flex flex-wrap">
                            {props.items.map((item, index) => (
                                <React.Fragment key={index}>
                                    <Image
                                        src={`${imgPath}/${item}.png`}
                                        alt={`Item ${item}`}
                                        width={AVATAR_WIDTH}
                                        height={AVATAR_HEIGHT}
                                        quality={100}
                                        className='object-fit p-1'
                                    />
                                    {index < props.items.length - 1 && <span className="arrow-right">&rarr;</span>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="loader mx-auto w-full max-w-2xl flex justify-center items-center"></div>
            )}
        </section>
    );
}

export default Section;
