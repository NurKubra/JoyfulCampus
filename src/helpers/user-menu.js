 //kullanicin rolune gore menude gosterilcekler burda ayarlandi--> json dosyada role gore menude bulunmasi gerekenler var !!
import userMenu from "../helpers/data/user-menu.json";

export const getMenuItems = (role) => {
    if(!userMenu || !role) return [];
    const menu = userMenu[role.toLowerCase()];
    return menu;    
}

//json dosyadaki roller kucu harfle oldgu icin -> kucuk harfe cevirdik hepsini !!!