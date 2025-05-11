import {
  Tag,
  User,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  Squirrel
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/", // TODO: Update this to the correct href
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "/study",
          label: "Study",
          active: pathname.includes("/study"),
          icon: Squirrel,
          submenus: []
        },
        {
          href: "",
          label: "Generate",
          active: pathname.includes("/generate"),
          icon: SquarePen,
          submenus: [
            {
              href: "/generate",
              label: "Flashcards",
              active: pathname === "/generate/flashcards"
            },
            {
              href: "/generate",
              label: "Quizzes",
              active: pathname === "/generate/quizzes"
            }
          ]
        },
        {
          href: "/modules",
          label: "Modules",
          active: pathname.includes("/categories"),
          icon: Bookmark,
          submenus: []
        },
        {
          href: "/tags",
          label: "Tags",
          active: pathname.includes("/tags"),
          icon: Tag,
          submenus: [] 
          // TOOD: Add tag submenus
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/my_account",
          label: "My Account",
          active: pathname.includes("/my_account"),
          icon: User,
          submenus: []
        },
        {
          href: "/settings",
          label: "Setting",
          active: pathname.includes("/settings"),
          icon: Settings,
          submenus: []
        }
      ]
    }
  ];
}
