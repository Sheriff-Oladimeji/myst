import { FaXTwitter, FaGithub, FaInstagram } from "react-icons/fa6";
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
    title: "Popular",
    url: "/popular",
  },
];

const footerItems: Footer[] = [
  {
    id: 1,
    url: "https://twitter.com",
    icon: FaXTwitter,
  },
  {
    id: 2,
    url: "https://github.com",
    icon: FaGithub,
  },
  {
    id: 3,
    url: "https://instagram.com",
    icon: FaInstagram,
  },
];

export { navItems, footerItems };
