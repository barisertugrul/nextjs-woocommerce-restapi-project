import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { isEmpty } from "lodash";
import { useState } from "react";
import { Bag, BurgerIcon, TailwindIcon, User, Wishlist } from "../../icons";
import { sanitizeHTML } from "@/src/utils/miscellaneous";

const Header = ({data}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {siteTitle, siteDescription, siteUrl, primaryMenu, siteLogo, siteFavicon} = data || {};

	const siteLogoUrl = siteLogo || siteFavicon || "/favicon.ico";
    const headerMenuItems = [];
	if(primaryMenu){
		data.primaryMenu.forEach((menuItem) => {
			headerMenuItems.push(menuItem);
		});
	}

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

    /* const isEmpty = (obj) => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) return false;
        }
        return true
    } */


  return (
    <>
    <Head>
        <title>{siteTitle || 'Nextjs WooCommerce'}</title>
        <meta name="description" content={data.site_description} />
        <link rel="icon" href={ siteFavicon || '/favicon.ico' }/>
    </Head>
    <div className="header">
				<nav className="bg-white p-4">
					<div className="flex items-center justify-between flex-wrap container mx-auto">
						<div className="flex items-center flex-shrink-0 text-black mr-20">
							<Link href="/">
								
									{
										siteLogoUrl ? (
											<Image className="mr-2" src={ siteLogoUrl } alt={ `${ siteTitle } logo` } width="86"
											     height="86"/>
										) : ( <TailwindIcon /> )
									}
								
							</Link>
							<span>
								<Link href="/">
									<span className="font-semibold text-xl tracking-tight">{ siteTitle || 'WooNext' }</span>
								</Link>
								{ siteDescription ? <p>{ siteDescription }</p> : null }
							</span>
						</div>
						<div className="flex justify-end w-auto lg:hidden">
							<button
								onClick={toggleMenu}
								className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-black hover:border-black">
								<BurgerIcon className="fill-current h-3 w-3" />
							</button>
						</div>
						<div className={`overflow-hidden lg:h-full flex-grow lg:flex lg:items-center lg:w-auto ml-3 lg:ml-0 ${isMenuOpen ? 'max-h-full w-full block' : 'h-0'}`}>
							<div className="text-sm font-medium lg:flex-grow">
								{ !isEmpty( headerMenuItems ) && headerMenuItems.length ? headerMenuItems.map( menuItem => (
									<Link key={menuItem?.id} href={ menuItem?.url.replace( siteUrl, process.env.NEXT_PUBLIC_FRONTEND_URL ) || '/' }>
										<span className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-black mr-10"
										   dangerouslySetInnerHTML={{__html: sanitizeHTML(menuItem.label)}}/>
									</Link>
								) ) : null }
							</div>
							<div className="text-sm font-medium">
								<a href="#responsive-header"
								   className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-black mr-10">
									<span className="flex flex-row items-center lg:flex-col">
										<User className="mr-1 lg:mr-0" />
										Profile
									</span>
								</a>
								<a href="#responsive-header"
								   className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-black mr-10">
									<span className="flex flex-row items-center lg:flex-col">
										<Wishlist className="mr-1 lg:mr-0" />
										Wishlist
									</span>
								</a>
								<a className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-black mr-10"
								   href="/cart/">
									<span className="flex flex-row items-center lg:flex-col">
										<Bag className="mr-1 lg:mr-0" />
										Cart
									</span>
								</a>
							</div>
						</div>
					</div>
				</nav>
			</div>
    </>
  );
};

export default Header;
