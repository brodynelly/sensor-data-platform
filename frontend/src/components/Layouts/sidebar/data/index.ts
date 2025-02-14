import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Icons.HomeIcon,
        items: [],
      },
      {
        title: "Tables",
        icon: Icons.PieChart,
        items: [
          {
            title: "Pig",
            url: "/visualization/pigs",
          },
        ],
      },
    ],
  },
  {
    label: "DATABASE",
    items: [
      {
        title: "Graphs",
        icon: Icons.Table,
        items: [
          {
            title: "Pigs",
            url: "/database/pigs",
          },
        ],
        
      },
      {
        title: "Upload Data",
        url: "/database/upload",
        icon: Icons.ChevronUp,
        items: [],
      },
    ],
  },
];
