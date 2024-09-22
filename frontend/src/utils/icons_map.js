import * as SvgIconsComponent from '../components/icons';

/**
 * Icons Component map
 * 
 * @param {string} name - Icon name
 * @returns {React.Component} - Icon component
 */

export const getIconComponentByName = (name) => {
    const ComponentsMap = {
        bag: SvgIconsComponent.Bag,
        burgerIcon: SvgIconsComponent.BurgerIcon,
        facebook: SvgIconsComponent.Facebook,
        instagram: SvgIconsComponent.Instagram,
        searchIcon: SvgIconsComponent.SearchIcon,
        tailwindIcon: SvgIconsComponent.TailwindIcon,
        twitter: SvgIconsComponent.Twitter,
        user: SvgIconsComponent.User,
        wishlist: SvgIconsComponent.Wishlist,
        youtube: SvgIconsComponent.Youtube
    };

    if(name in ComponentsMap){
        const IconComponent = ComponentsMap[name];
        return <IconComponent />;
    }else{
        return null;
    }
}