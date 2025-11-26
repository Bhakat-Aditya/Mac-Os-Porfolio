const navLinks = [
    {
        id: 1,
        name: "Projects",
        type: "finder",
    },
    {
        id: 3,
        name: "Contact",
        type: "contact",
    },
    {
        id: 4,
        name: "Resume",
        type: "resume",
    },
];

const navIcons = [
    {
        id: 1,
        img: "/icons/wifi.svg",
    },
    {
        id: 2,
        img: "/icons/search.svg",
    },
    {
        id: 3,
        img: "/icons/user.svg",
    },
    {
        id: 4,
        img: "/icons/mode.svg",
    },
];

const dockApps = [
    {
        id: "finder",
        name: "Portfolio", // was "Finder"
        icon: "finder.png",
        canOpen: true,
    },
    {
        id: "safari",
        name: "Education", // was "Safari"
        icon: "safari.png",
        canOpen: true,
    },
    {
        id: "photos",
        name: "Gallery", // was "Photos"
        icon: "photos.png",
        canOpen: true,
    },
    {
        id: "contact",
        name: "Contact", // or "Get in touch"
        icon: "contact.png",
        canOpen: true,
    },
    {
        id: "terminal",
        name: "Skills", // was "Terminal"
        icon: "terminal.png",
        canOpen: true,
    },
    {
        id: "trash",
        name: "Archive", // was "Trash"
        icon: "trash.png",
        canOpen: false,
    },
];

const blogPosts = [
    {
        id: 1,
        date: "2006 - 2020",
        title:
            "Class X (ISCE) ",
        image: "/images/edu1.jpg",
        link: "https://drive.google.com/file/d/1ontRm56syAiQ4_rAsCJwvx0SaZG62sb3/view?usp=drive_link",
    },
    {
        id: 2,
        date: "2020 - 2022",
        title: "Class XII (ISE) ",
        image: "/images/edu2.jpg",
        link: "https://drive.google.com/file/d/1VU9nxF8CxFEXUNlaZgUqcJM567JLvJrK/view?usp=drive_link",
    },
    {
        id: 3,
        date: "2022-Present",
        title: "Bachelor of Commerce (B.Com) Honours in Accountancy",
        image: "/images/edu3.jpg",
        link: "https://drive.google.com/file/d/1H_UOy52-tH8ljsjNMk3kzUREO8hJKl6k/view?usp=drive_link",
    },
];

const techStack = [
    {
        category: "Frontend",
        items: ["React.js", "HTML"],
    },
    {
        category: "Styling",
        items: ["Tailwind CSS", "CSS"],
    },
    {
        category: "Backend     (Learning)",
        items: ["Node.js", "Express"],
    },
    {
        category: "Database     (Learning)",
        items: ["MongoDB"],
    },
    {
        category: "Dev Tools",
        items: ["Git", "GitHub"],
    },
];

const socials = [
    {
        id: 1,
        text: "Github",
        icon: "/icons/github.svg",
        bg: "#f4656b",
        link: "https://github.com/Bhakat-Aditya",
    },
    {
        id: 2,
        text: "Instagram",
        icon: "/icons/atom.svg",
        bg: "#4bcb63",
        link: "https://www.instagram.com/aditya_bhakat69/",
    },
    {
        id: 3,
        text: "Twitter/X",
        icon: "/icons/twitter.svg",
        bg: "#ff866b",
        link: "https://x.com/ADITYABHAK4172",
    },
    {
        id: 4,
        text: "LinkedIn",
        icon: "/icons/linkedin.svg",
        bg: "#05b6f6",
        link: "https://www.linkedin.com/in/aditya-bhakat-anshu/",
    },
];

const photosLinks = [
    {
        id: 1,
        icon: "/icons/gicon1.svg",
        title: "Library",
    },
    {
        id: 2,
        icon: "/icons/gicon2.svg",
        title: "Memories",
    },
    {
        id: 3,
        icon: "/icons/file.svg",
        title: "Places",
    },
    {
        id: 4,
        icon: "/icons/gicon4.svg",
        title: "People",
    },
    {
        id: 5,
        icon: "/icons/gicon5.svg",
        title: "Favorites",
    },
];

const gallery = [
    {
        id: 1,
        img: "/images/gal1.jpg",
    },
    {
        id: 2,
        img: "/images/gal2.jpg",
    },
    {
        id: 3,
        img: "/images/gal3.webp",
    },
    {
        id: 4,
        img: "/images/gal4.webp",
    },
];

export {
    navLinks,
    navIcons,
    dockApps,
    blogPosts,
    techStack,
    socials,
    photosLinks,
    gallery,
};

const WORK_LOCATION = {
    id: 1,
    type: "work",
    name: "Work",
    icon: "/icons/work.svg",
    kind: "folder",
    children: [
        // ▶ Project 1
        {
            id: 5,
            name: "Gaming Website",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-10 left-5", // icon position inside Finder
            windowPosition: "top-[5vh] left-7", // optional: Finder window position
            children: [
                {
                    id: 1,
                    name: "Gaming Website Project.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 left-10",
                    description: [
                        "Made this using React.js and Tailwind CSS for a sleek, modern look. Used GSAP a lot to create smooth animations and engaging interactions throughout the site and ensured it's fully responsive so it looks great on all devices.",
                    ],
                },
                {
                    id: 2,
                    name: "gaming-gsap-website.app",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://gaming-gsap-website.vercel.app/",
                    position: "top-10 right-20",
                },
                {
                    id: 4,
                    name: "gaming-gsap-website.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 right-80",
                    imageUrl: "/images/GamingWebsite.png",
                },
            ],
        },

        // ▶ Project 2
        {
            id: 6,
            name: "Mojito Shop Website",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-52 right-80",
            windowPosition: "top-[20vh] left-7",
            children: [
                {
                    id: 1,
                    name: "Mojito Shop Website Project.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 right-10",
                    description: [
                        "This Mojito Shop Website is built with React.js and styled using Tailwind CSS to create a fresh and inviting look. The site features smooth animations powered by GSAP, enhancing the user experience with engaging interactions. Designed to be fully responsive, it ensures a seamless browsing experience across all devices, making it easy for customers to explore our mojito offerings anytime, anywhere.",
                    ],
                },
                {
                    id: 2,
                    name: "mojito-shop-website.com",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://cocktail-bar-omega.vercel.app/",
                    position: "top-20 left-20",
                },
                {
                    id: 4,
                    name: "mojito-shop-website.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 left-80",
                    imageUrl: "/images/Mojito.png",
                }
            ],
        },

        // ▶ Project 3
        {
            id: 7,
            name: "Protein Shake Landing Page",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-10 left-80",
            windowPosition: "top-[35vh] left-7",
            children: [
                {
                    id: 1,
                    name: "Protein Shake Landing Page.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 left-10",
                    description: [
                        "This Protein Shake Landing Page is crafted using React.js for a dynamic user experience and styled with Tailwind CSS to achieve a clean, modern aesthetic. The page incorporates GSAP animations to create engaging visual effects that highlight the product's features. Designed with responsiveness in mind, the landing page ensures an optimal viewing experience across all devices, making it easy for potential customers to learn about and purchase the protein shake.",
                    ],
                },
                {
                    id: 2,
                    name: "protein-shake-landing-page.com",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://spylt-eight-lovat.vercel.app/",
                    position: "top-10 right-20",
                },
                {
                    id: 4,
                    name: "protein-shake-landing-page.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 right-80",
                    imageUrl: "/images/Splty.png",
                }
            ],
        }
    ],
};

const ABOUT_LOCATION = {
    id: 2,
    type: "about",
    name: "About me",
    icon: "/icons/info.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "me.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-10 left-5",
            imageUrl: "/images/dp.jpg",
        },
        {
            id: 2,
            name: "nature_Lover_me.webp",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-28 right-42",
            imageUrl: "/images/gal4.webp",
        },
        {
            id: 3,
            name: "bullet_Lover_me.webp",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-62 left-60",
            imageUrl: "/images/gal3.webp",
        },
        {
            id: 4,
            name: "about-me.txt",
            icon: "/images/txt.png",
            kind: "file",
            fileType: "txt",
            position: "top-60 left-5",
            subtitle: "Meet the Developer Behind the Code",
            image: "/images/gal2.jpg",
            description: [
                `I’m a final-year B.Com (Accounts) graduate with a strong analytical
          mindset, currently transitioning into web development. I specialize in
          creating responsive, user-friendly interfaces using HTML, CSS,
          JavaScript, React, and modern animation tools like GSAP to deliver
          smooth interactions and visually striking experiences. Continuously
          learning through hands-on projects, I’m now expanding my skills into
          backend development to become a full-stack developer. By combining
          financial knowledge with technical adaptability and a focus on clean
          code and meaningful design, I aim to build digital solutions that not
          only work efficiently but also connect with users in a valuable way.`
            ],
        },
    ],
};

const RESUME_LOCATION = {
    id: 3,
    type: "resume",
    name: "Resume",
    icon: "/icons/file.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "Resume.pdf",
            icon: "/images/pdf.png",
            kind: "file",
            fileType: "pdf",
        },
    ],
};

const TRASH_LOCATION = {
    id: 4,
    type: "trash",
    name: "Trash",
    icon: "/icons/trash.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "trash1.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-10 left-10",
            imageUrl: "/images/trash-1.png",
        },
        {
            id: 2,
            name: "trash2.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-40 left-80",
            imageUrl: "/images/trash-2.png",
        },
    ],
};

export const locations = {
    work: WORK_LOCATION,
    about: ABOUT_LOCATION,
    resume: RESUME_LOCATION,
    trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
    finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };