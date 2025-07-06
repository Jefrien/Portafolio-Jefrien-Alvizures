import { FaGithub, FaLinkedin } from "react-icons/fa";


const socials = [
    {
        icon: <FaGithub />,
        link: "https://github.com/jefrien"
    },
    {
        icon: <FaLinkedin />,
        link: "https://linkedin.com/in/jefrien"
    }
]

export const Social = ({ containerStyles, iconStyles }) => {
    return <div className={containerStyles}>
        {
            socials.map((item, index) => {
                return <a href={item.link} target="_blank" rel="noreferrer" key={index} className={iconStyles}>
                    {item.icon}
                </a>
            })
        }
    </div>
}
