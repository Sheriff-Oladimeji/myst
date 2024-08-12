import { FaXTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { IconType } from "react-icons";

interface NavLink {
  id: number;
  title: string;
  url: string;
}

interface Footer {
  id: number;
  url: string;
  icon: IconType;
}

const navItems: NavLink[] = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Categories",
    url: "/categories",
  },

  {
    id: 3,
    title: "Authors",
    url: "/authors",
  },
];

const footerItems: Footer[] = [
  {
    id: 1,
    url: "https://x.com/dimeji_dev",
    icon: FaXTwitter,
  },
  {
    id: 2,
    url: "https://github.com/Sheriff-Oladimeji",
    icon: FaGithub,
  },
  {
    id: 3,
    url: "https://www.linkedin.com/in/sheriff-oladimeji-022362255/",
    icon: FaLinkedinIn,
  },
];

export { navItems, footerItems };
