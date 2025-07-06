import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,    
    DropdownMenuShortcut,    
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTranslation } from "react-i18next";
import { IoLanguage } from "react-icons/io5";
import { UsaIcon } from "../icons/UsaIcon";
import { SpainIcon } from "../icons/SpainIcon";

export const LangSwitcher = () => {

    const { i18n, t } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        // save language in localStorage
        localStorage.setItem('lang', lang);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='size-8 hover:bg-primary/10 flex items-center justify-center cursor-pointer rounded-full w-12 h-12 ml-4'>
                    <IoLanguage size={24} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">                
                <DropdownMenuGroup>
                    <DropdownMenuItem className="!pl-4" onClick={() => changeLanguage('en')}>
                        {t('English')}
                        <DropdownMenuShortcut>
                            <UsaIcon className="size-4" />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="!pl-4" onClick={() => changeLanguage('es')}>
                        {t('Spanish')}
                        <DropdownMenuShortcut>
                            <SpainIcon className="size-4" />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
