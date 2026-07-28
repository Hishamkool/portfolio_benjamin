import { useEffect, useState } from "react";
import { transform } from "motion";
import DesktopMap from "./home_desktop/DesktopMap";
import MobileMap from "./home_mobile/MobileMap";

const TREE_POSITIONS = [
  // Behind the house (z-index: 5)
  { top: "15%", left: "10%", width: "8%", zIndex: 5 },
  { top: "20%", left: "16%", width: "7%", zIndex: 5 },
  { top: "14%", left: "23%", width: "6%", zIndex: 5 },

  // In front of the house (z-index: 15)
  { top: "7%", left: "2%", width: "6%", zIndex: 15 },
  { top: "27%", left: "4.3%", width: "13%", zIndex: 15 },
  { top: "35%", left: "20%", width: "7%", zIndex: 15 },
  { top: "70%", left: "2%", width: "12%", zIndex: 15 },
];

// const MAP_ITEMS = [
//   {
//     id: "projects",
//     label: "Projects",
//     position: { top: "10.2%", left: "3.5%", width: "17.9%" },
//     imageSrc: "/assets/home/house_jump_gif2.gif",
//     tagPosition: {
//       top: "50px",
//       left: "-6%",
//     },
//   },
//   {
//     id: "about",
//     label: "About the artist",

//     videoSrc: "/assets/home/boy_withoutbg.webm",
//     position: { top: "36.4%", left: "31.1%", width: "15.1%" },
//     tagPosition: { top: "" },
//   },
//   {
//     id: "services",
//     label: "Services",
//     videoSrc: "/assets/home/services_withoutbg.webm",
//     position: { top: "35.6%", left: "47.0%", width: "31.9%" },
//     tagPosition: {},
//   },
//   {
//     id: "contact",
//     label: "Contact",
//     videoSrc: "/assets/home/ship_withoutbg.webm",
//     position: { top: "-20%", left: "76.9%", width: "23.1%" },
//     tagPosition: {
//       top: "300px",
//       left: "-15%",
//     },
//   },
// ];
const MAP_ITEMS = [
  {
    id: "projects",
    label: "Projects",
    imageSrc: "/assets/home/house_jump_gif2.gif",

    desktop: {
      position: {
        top: "17.2%",
        left: "3.5%",
        width: "17.9%",
      },
      tagPosition: {
        top: "0%",
        // right: "43%",
        right: "50%",
        transform: "translate(50%)",
      },
    },

    mobile: {
      position: {
        top: "0%",
        left: "12%",
        width: "49%",
      },
      tagPosition: {
        top: "",
        right: "40%",
      },
    },
  },

  {
    id: "about",
    label: "About the artist",
    videoSrc: "/assets/home/boy_withoutbg.webm",

    desktop: {
      position: {
        top: "36.4%",
        left: "31.1%",
        width: "15.1%",
      },
      tagPosition: {
        top: "-35%",
        left: " 52%",
        transform: "translate(-50%)",
      },
    },

    mobile: {
      position: {
        top: "27%",
        left: "50%",
        width: "40%",
      },
      tagPosition: {
        top: "-50%",
        left: "",
      },
    },
  },

  {
    id: "services",
    label: "Services",
    videoSrc: "/assets/home/services_withoutbg.webm",

    desktop: {
      position: {
        top: "35.6%",
        left: "47.0%",
        width: "31.9%",
      },
      tagPosition: {
        left: "50%",
        transform: "translate(-50%)",transform: "translate(-50%)",
      },
    },

    mobile: {
      position: {
        top: "45%",
        left: "5%",
        width: "75%",
      },
      tagPosition: {
        top: "-30%",
        left: "",
      },
    },
  },

  {
    id: "contact",
    label: "Contact",
    videoSrc: "/assets/home/ship_withoutbg.webm",

    desktop: {
      position: {
        top: "-20%",
        left: "76.9%",
        width: "23.1%",
      },
      tagPosition: {
        top: "40%",
        left: "25%",
      },
    },

    mobile: {
      position: {
        top: "63%",
        right: "-10%",
        width: "70%",
      },
      tagPosition: {
        top: "35%",
        right: "50%",
      },
    },
  },
];

export default function HomePage({
  onProjectsClick,
  onAboutClick,
  onContactClick,
  onServicesClick,
}) {
  const handleClick = (id) => {
    if (id === "projects" && onProjectsClick) onProjectsClick();
    if (id === "about" && onAboutClick) onAboutClick();
    if (id === "contact" && onContactClick) onContactClick();
    if (id === "services" && onServicesClick) onServicesClick();
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    <MobileMap mapItems={MAP_ITEMS} handleClick={handleClick} />
  ) : (
    <DesktopMap
      mapItems={MAP_ITEMS}
      handleClick={handleClick}
      treePositions={TREE_POSITIONS}
    />
  );
}
