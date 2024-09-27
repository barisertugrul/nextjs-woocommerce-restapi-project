import { isArray, isEmpty } from "lodash";
import { sanitizeHTML } from "../../../utils/miscellaneous";
import Link from "next/link";
import { getIconComponentByName } from "@/src/utils/icons_map";
import DOMPurify from "isomorphic-dompurify";
import { useEffect, useState } from "react";

const Footer = ({ data }) => {
    const { copyrightText, footerMenuItems, sidebarOne, sidebarTwo, socialLinks } = data || {};

    const [sanitizedCopyrightText, setSanitizedCopyrightText] = useState("");
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
		return () => setIsMounted(false);
	}, []);

    const decodeHTML = (html) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Client-side'da DOM işlemleri
            const decodedText = decodeHTML(copyrightText || "");
            const cleanText = DOMPurify.sanitize(decodedText);
            setSanitizedCopyrightText(cleanText);
        }
    }, [copyrightText]);

    return (
        <footer className="bg-orange-500 p-6">
            <div className="container mx-auto">
                <div className="flex flex-wrap -mx-1 owerflow-hidden text-white">
                    { isMounted ? (
						<>
							{/* Widget One */}
							<div className="my-1 px-1 w-full overflow-hidden sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
                        		<div dangerouslySetInnerHTML={{ __html: sanitizeHTML(sidebarOne) }} />
							</div>
							{/* Widget Two */}
							<div className="my-1 px-1 w-full overflow-hidden sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
								<div dangerouslySetInnerHTML={{ __html: sanitizeHTML(sidebarTwo) }} />
							</div>
						</>
					) : null}

                    {/* Footer Menu */}
                    <div className="my-1 px-1 w-full overflow-hidden sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
                        {!isEmpty(footerMenuItems) && isArray(footerMenuItems) ? (
                            <ul>
                                {footerMenuItems.map((menuItem) => (
                                    <li key={menuItem?.ID}>
                                        <Link href={menuItem?.url}>
                                            <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(menuItem?.title) }} />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : null}
                    </div>
                </div>
                <div className="mb-8 mt-8 w-full flex flex-wrap">
                    {/* Copyright Text */}
                    <div className="w-full md:w-1/2 lg:w-1/4 text-white">
                        {sanitizedCopyrightText ? (
                            <div dangerouslySetInnerHTML={{ __html: sanitizedCopyrightText }} />
                        ) : (
                            "@ 2024 ERT Yazılım"
                        )}
                    </div>

                    {/* Social Links */}
                    <div className="w-full md:w-1/2 lg:w-3/4 flex justify-end">
                        {!isEmpty(socialLinks) && isArray(socialLinks) ? (
                            <ul className="flex items-center align-middle">
                                {socialLinks.map((socialLink) => (
                                    <li key={socialLink?.iconName} className="ml-4">
                                        <a href={socialLink?.iconUrl || "#"} target="_blank" title={socialLink?.iconName} className="flex items-center align-middle">
                                            {getIconComponentByName(socialLink?.iconName)}
                                            <span className="sr-only">{socialLink?.iconName}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : null}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
