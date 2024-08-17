import { GoHome } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { TbTransfer } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
export const headerNav = [
 {
  id : 1,
  title : "Home",
  url : "",
 },
 {
  id : 2 ,
  title : "Contact Us",
  url :"ContactUs" 
 },
 {
  id : 3 ,
  title : "About us",
  url : "AboutUs"
 },
 {
  id : 4 ,
  title : "Join us",
  url : "JoinUs"
 }
]

export const menu = [
    {
      id: 1,
      title: "main",
      listItems: [
        {
          id: 1,
          title: "Homepage",
          url: "/mainPage",
          icon: <GoHome />,
        },
        {
          id: 2,
          title: "Profile",
          url: "profile",
          icon: <CgProfile />
        },
      ],
    },
    {
      id: 2,
      title: "lists",
      listItems: [
        {
          id: 1,
          title: "exhibitions",
          url: "exhibitions",
          icon: <AiOutlineProduct/>,
        },
        {
          id: 2,
          title: "Categories",
          url: "categories",
          icon: <BiCategoryAlt/>,
        },
        {
          id: 3,
          title: "Trade marks",
          url: "tradeMarks",
          icon: <BiCategoryAlt/>,
        },
      ],
    },
    {
      id: 3,
      title: "Actions",
      listItems: [
        {
          id: 1,
          title: "Create exhibition",
          url: "createexhibition",
          icon: <IoCreateOutline/>,
        },
        {
          id: 2,
          title: "Add Admin",
          url: "signUp",
          icon: <IoMdPersonAdd/>,
        },
        {
          id: 3,
          title: "Transfer",
          url: "transfer",
          icon: <TbTransfer/>,
        },
      ],
    },
    {
      id: 4,
      title: "Maintenance",
      listItems: [
        {
          id: 1,
          title: "Settings",
          url: "settings",
          icon: <IoSettingsOutline/>,
        },
      ],
    },
  ];
  export const Tmenu = [
    {
      id: 1,
      title: "main",
      listItems: [
        {
          id: 1,
          title: "Homepage",
          url: "/TmainPage",
          icon: <GoHome />,
        },
        {
          id: 2,
          title: "Profile",
          url: "profile",
          icon: <CgProfile />
        },
      ],
    },
    {
      id: 2,
      title: "lists",
      listItems: [
        {
          id: 1,
          title: "Products",
          url: "products",
          icon: <AiOutlineProduct/>,
        },
        {
          id: 1,
          title: "Representatives",
          url: "representatives",
          icon: <AiOutlineProduct/>,
        },
      ],
    },
    {
      id: 3,
      title: "Actions",
      listItems: [
        {
          id: 1,
          title: "Participate",
          url: "participate",
          icon: <IoCreateOutline/>,
        },
      ],
    },
    {
      id: 4,
      title: "Maintenance",
      listItems: [
        {
          id: 1,
          title: "Settings",
          url: "settings",
          icon: <IoSettingsOutline/>,
        },
      ],
    },
  ];
  
  export const topDealUsers = [
    {
      id: 1,
      img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
      username: "Elva McDonald",
      email: "elva@gmail.com",
      amount: "both N.12",
    },
    {
      id: 2,
      img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600",
      username: "Linnie Nelson",
      email: "linnie@gmail.com",
      amount: "both N.11",
    },
    {
      id: 3,
      img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1600",
      username: "Brent Reeves",
      email: "brent@gmail.com",
      amount: "both N.5",
    },
    {
      id: 4,
      img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1600",
      username: "Adeline Watson",
      email: "adeline@gmail.com",
      amount: "both N.9",
    },
    {
      id: 5,
      img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1600",
      username: "Juan Harrington",
      email: "juan@gmail.com",
      amount: "both N.7",
    },
  ];
