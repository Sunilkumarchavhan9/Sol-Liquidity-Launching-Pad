"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function Navbar(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: "Features", href: "#features", isExternal: false },
        { name: "How It Works", href: "#how-it-works", isExternal: false },
        { name: "FAQ", href: "#faq", isExternal: false },
        { name: "Contact", href: "#contact", isExternal: false },
       
    ];

    const scrollToSection = (href: string, isExternal: boolean) => {
        if (isExternal) {
            window.location.href = href;
        } else {
            const element = document.querySelector(href);
            element?.scrollIntoView({ behavior: "smooth" });
            setIsMenuOpen(false);
        }
    };

    return(
        <motion.nav 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="sticky top-0 z-50 bg-transparent! backdrop-blur-none! shadow-none! border-none!"
        >
            <div className="max-w mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="flex justify-between items-center h-20">
                   <svg width="100%" height="auto" viewBox="0 0 91 82" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 cursor-pointer">
                    <path d="M21.6641 0.5L34.0859 31.0781L0.5 17.1211V0.5H21.6641Z" fill="#010101" stroke="#DBDBDB"/>
                    <path d="M90.5 0.5V17.6611L56.9043 31.0996L69.3359 0.5H90.5Z" fill="#010101"  stroke="#DBDBDB"/>
                    <rect x="35.5" y="0.5" width="20" height="17" fill="#010101" stroke="#DBDBDB"/>
                    <rect x="0.5" y="32.5" width="21" height="17" fill="#010101" stroke="#DBDBDB"/>
                    <rect x="69.5" y="32.5" width="21" height="17" fill="#010101" stroke="#DBDBDB"/>
                    <rect x="35.5" y="32.5" width="20" height="17" fill="#010101" stroke="#DBDBDB"/>
                    <path d="M21.6641 81.5H0.5V64.3379L34.0947 50.8994L21.6641 81.5Z" fill="#010101" stroke="#DBDBDB"/>
                    <path d="M90.5 64.3379V81.5H69.3359L56.9043 50.8994L90.5 64.3379Z" fill="#010101" stroke="#DBDBDB"/>
                    <rect x="35.5" y="64.5" width="20" height="17" fill="#010101" stroke="#DBDBDB"/>
                    </svg>

                    <div className="hidden md:flex gap-8">
                        {navLinks.map((link) => (
                            link.isExternal && link.href === "/trust" ? (
                                <Link key={link.name} href={link.href} passHref legacyBehavior>
                                    <motion.a
                                        whileHover={{ color: "#ffffff" }}
                                        className="text-gray-400 hover:text-white transition-colors text-sm font-mono hover:underline underline-offset-4"
                                    >
                                        {link.name}
                                    </motion.a>
                                </Link>
                            ) : link.isExternal ? (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    whileHover={{ color: "#ffffff" }}
                                    className="text-gray-400 hover:text-white transition-colors text-sm font-mono hover:underline underline-offset-4"
                                >
                                    {link.name}
                                </motion.a>
                            ) : (
                                <motion.button
                                    key={link.name}
                                    onClick={() => scrollToSection(link.href, false)}
                                    whileHover={{ color: "#ffffff" }}
                                    className="text-gray-400 hover:text-white transition-colors text-sm font-mono hover:underline underline-offset-4"
                                >
                                    {link.name}
                                </motion.button>
                            )
                        ))}
                    </div>

                   
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden md:flex items-center gap-2 bg-white hover:bg-gray-100 text-black font-mono py-2 px-6  transition-all duration-200 hover:underline underline-offset-4"
                    >
                     Connect Wallet
                    </motion.button>

              
                    <motion.button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-white"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </motion.button>
                </div>

                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden pb-4 space-y-2"
                    >
                        {navLinks.map((link) => (
                            link.isExternal && link.href === "/trust" ? (
                                <Link key={link.name} href={link.href} passHref legacyBehavior>
                                    <motion.a
                                        className="block w-full text-left text-gray-400 hover:text-white px-4 py-2 text-sm font-mono hover:underline underline-offset-4"
                                    >
                                        {link.name}
                                    </motion.a>
                                </Link>
                            ) : link.isExternal ? (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    className="block w-full text-left text-gray-400 hover:text-white px-4 py-2 text-sm font-mono hover:underline underline-offset-4"
                                >
                                    {link.name}
                                </motion.a>
                            ) : (
                                <motion.button
                                    key={link.name}
                                    onClick={() => scrollToSection(link.href, false)}
                                    className="block w-full text-left text-gray-400 hover:text-white px-4 py-2 text-sm font-mono hover:underline underline-offset-4"
                                >
                                    {link.name}
                                </motion.button>
                            )
                        ))}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            className="w-full bg-white hover:bg-gray-200 text-black font-mono py-2 px-4  mt-4  hover:underline underline-offset-4"
                        >
                            Connect Wallet
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            className="w-full bg-white hover:bg-gray-200 text-black font-mono py-2 px-4 mt-2 hover:underline underline-offset-4"
                        >
                            Create Token
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    )
}