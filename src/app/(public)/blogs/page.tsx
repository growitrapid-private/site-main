'use client'
import React, {useEffect, useState } from 'react'
import Stars from '@/components/stars';
import style from './page.module.scss'
import TeamWorkBG2 from '../../../assets/image/teamwork2.jpg'
import { filterBlogs } from '@/functions/blog';
import BlogCard from './components/BlogCard';

type Props = {}
export default function Page({ }: Props) {
    
    const [trendingBlogs, setTrendingBlogs] = useState(Array(3).fill(undefined))
    const [popularBlogs, setPopularBlogs] = useState(Array(20).fill(undefined))

    useEffect(() => {
        async function fetchData() {
            try {
                const trendingResponse = await filterBlogs("likes", 20, 0);
                const popularResponse = await filterBlogs("views", 20, 0);

                if (trendingResponse.status === 200 && popularResponse.status === 200) {
                    setTrendingBlogs(trendingResponse.data.blogs);
                    setPopularBlogs(popularResponse.data?.blogs);
                }
            } catch (error) {
                console.error('Error fetching blogs', error);
            }
        }

        fetchData();
    }, []);


    return (
        <>
            <div>
                <header className={`relative w-full pb-[11%] bg-[var(--tertiary-color)] `}>

                    <div className={`${style.bg__image} absolute right-0 top-0 h-full w-full md:w-[50%] bg-cover bg-bottom`}
                        style={{
                            // backgroundImage: `url(${BG.src})`,
                            backgroundImage: `url(${TeamWorkBG2.src})`,
                        }}
                    />


                    <div className={`absolute h-full w-[52%] bottom-auto right-auto hidden md:block`}>
                        <svg
                            className={`absolute w-auto h-full right-0 translate-x-[25%]`}
                            viewBox="0 0 984 686"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path className={`fill-[var(--tertiary-color)]`} d="M829.645582,-3.55271368e-14 C818.959194,11.9356039 808.954818,24.8206121 799.721248,38.7211139 C723.226254,157.53566 739.861725,301.270975 797.809751,426.687474 C804.958442,442.184984 814.61534,462.120894 818.944183,473.423703 C844.673456,540.503061 856.345675,600.855141 881.916718,667.40505 C761.006678,679.138421 646.665221,685.004119 538.890625,685.004119 L0,685.004119 L0,685.004119 L0,0.00411925189 Z"></path>
                        </svg>

                        <div className={`absolute top-0 left-0 h-full w-full`}>
                            <Stars />
                        </div>
                    </div>


                    <div className={`relative z-20 px-6 py-24 md:max-w-5xl mx-auto`}>
                        <h1 className={`md:max-w-[50%] text-5xl text-center md:text-left leading-tight font-semibold text-[var(--dark-text-color)] md:text-current`}>Our Blogs</h1>

                        <p className={`mt-4 text-center md:text-left text-[var(--dark-text-color)] md:text-current max-w-[500px]`}>Discover a wealth of knowledge and stay engaged with our blog, where you&apos;ll find a treasure trove of insights, expert tips, and thought-provoking articles across diverse subjects</p>
                    </div>

                    <div className={`absolute w-full -bottom-2 z-30`}>
                        <svg
                            preserveAspectRatio="xMinYMin meet"
                            className={`w-full hidden md:block`}
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 1440 158"
                        >
                            <defs></defs>
                            <path className={`fill-[var(--bg-color)]`} fill-rule="evenodd" d="M1440-27h2v185H0V8c88-20.667 267.333 3 538 71s571.333 45.333 902-68v-38z"></path>
                        </svg>

                        <svg
                            preserveAspectRatio="xMinYMin meet"
                            className={`w-full block md:hidden`}
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 375 50"
                        >
                            <defs></defs>
                            <path className={`fill-[var(--bg-color)]`} fill-rule="evenodd" d="M376 .414V50H0V5.48C141.126 31.757 266.126 30.182 375 .756l1-.342z"></path>
                        </svg>
                    </div>
                </header>
            </div>

            <main className={style.blogs}>
                <BlogCard blogs={trendingBlogs} type={"carousel"} />
                <BlogCard blogs={popularBlogs} type={"cards"} />              
            </main>
        </>
    )
}