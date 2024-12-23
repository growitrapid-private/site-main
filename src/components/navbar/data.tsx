import React from 'react'
import config from "@/utils/config";
import type { NavItem } from "./structure";
import MegaMenu from './megamenu';
import MegaMenuSlider from './megamenuslider';
import Link from 'next/link';
import { FaUpRightFromSquare } from 'react-icons/fa6';

const menuItems = [
    {
        name: "About Us",
        link: config.links.about,
        icon: null
    },
    {
        name: "Blog",
        link: config.links.blogs,
        icon: null,
        items: [
            {
                name: "Coming Soon...",
                link: "#",
                icon: null
            },
        ]
    },
    {
        name: "Courses",
        link: "#",
        icon: null,
        items: [
            {
                name: "Coming Soon...",
                link: "#",
                icon: null
            },
        ],
    },
    {
        name: "Services",
        link: "/services",
        icon: null,
    },
    // {
    //     name: "Researches",
    //     link: "data.researchesUrl",
    //     icon: null,
    //     items: [
    //     ]
    // },
    // {
    //     name: "Products",
    //     link: "/products",
    //     icon: null,
    //     items: [
    //     ]
    // },
    // {
    //     name: "Terms & Policy",
    //     link: config.links.terms_policy,
    //     icon: null
    // }
] as ({
    name: string;
    link: string;
    icon: null;
    items?: undefined;
} | {
    name: string;
    link: string;
    icon: null;
    items?: {
        name: string;
        link: string;
        icon: null;
    }[];
})[];

export default function getNavItems({
    services, session, status
}: {
    services: {
        _id: string;
        _updatedAt: string;
        title: string;
        description: string;
        slug: string;
        image: string;
        items: {
            item_title: string;
            description: string;
            item_slug: string;
        }[];
    }[] | null;
    session: {
        user: {roles: string}
    } | null;
    status: string;
}): NavItem[] {

    console.log(status, session)
    const data = [
        {
            title: "Home",
            icon: null,
            link: "/",
            isMegaMenu: false,
            items: null,
        },
        {
            title: "Blogs",
            icon: null,
            link: "/blogs",
            isMegaMenu: false,
            items: null,
        },
        {
            title: "Courses",
            icon: null,
            link: "/courses",
            isMegaMenu: false,
            items: null,
        },
       
        {
            title: "Services",
            icon: null,
            link: "/",
            isMegaMenu: true,
            isMultiMenu: true,
            items: services?.map((service) => ({
                title: service.title,
                icon: null,
                link: `/services/${service.slug}`,
                isMegaMenu: true,
                items: <div className='flex flex-wrap items-stretch justify-start gap-3 p-2'>
                    {service.items.map((item, index) => (
                        <Link className={`no-after flex-auto
                            w-full max-w-[32%]
                            bg-[#101520] hover:bg-[#02070b]
                            transition-colors duration-300 ease-in-out
                            rounded-md border-2 border-[var(--border-primary-color)]
                            py-2 px-3
                        `} href={`/services`} key={index}>
                            <div className='flex flex-col'>
                                <p className={`whitespace-pre-wrap`}>{item.item_title}</p>
                                <p className='text-xs opacity-50 whitespace-pre-wrap'>{item.description}</p>
                            </div>

                            <FaUpRightFromSquare className={`hidden flex-shrink-0 inline-block align-baseline`} />
                        </Link>
                    ))}
                </div>
            })),
        },


    ]
    if (status === "authenticated") {

        if (session?.user.roles[0] === 'operator') {
            data.push({
                title: "Upload Courses",
                icon: null,
                link: "/uploader",
                isMegaMenu: false,
                items: null,
            },)
        }
    }
    return data;
}