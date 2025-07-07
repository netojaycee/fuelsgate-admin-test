export const menuItems = [
  {
    label: "Analytics",
    href: "/analytics",
  },
  {
    label: "Users",
    href: "/users",
    // SubMenu: [
    //   {
    //     label: "All Users",
    //     href: "/users",
    //     comingSoon: false,
    //   },
    //   {
    //     label: "Suppliers",
    //     href: "/users/suppliers",
    //     comingSoon: true,
    //   },
    //   {
    //     label: "Transporters",
    //     href: "/users/transporters",
    //     comingSoon: true,
    //   },
    //   {
    //     label: "Traders",
    //     href: "/users/traders",
    //     comingSoon: true,
    //   },
    // ],
    comingSoon: false,
  },
  {
    label: "Audit Logs",
    href: "/audit-logs",
    comingSoon: false,
  },
  {
    label: "Uploaded Products",
    href: "/uploaded-products",
    comingSoon: true,
  },
  {
    label: "Trucks",
    href: "/trucks",
    comingSoon: false,
  },
  {
    label: "Orders",
    comingSoon: true,
    SubMenu: [
      {
        label: "Product Orders",
        href: "/product-orders",
        comingSoon: true,
      },
      {
        label: "Truck Orders",
        href: "/truck-orders",
        comingSoon: true,
      },
    ],
  },
  {
    label: "Products",
    href: "/products",
  },
  {
    label: "Depots",
    href: "/depots",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "Platform Config",
    href: "/platform-config",
    comingSoon: false,
  },
];
