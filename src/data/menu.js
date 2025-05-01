/*
 * Main and demo navigation arrays
 *
 * 'to' attribute points to the route name, not the path url
 */

export default {
  main: [
    {
      name: "Dashboard",
      to: "dashboard",
      icon: "si si-speedometer",
    },

    {
      name: "Banners",
      to: "banners",
      icon: "si si-layers",
    },
   

  
  ],
  // You can also set an external link to your main navigation and it will render as a link
  // {
  //   name: "Link Name",
  //   to: "https://example.com",
  //   icon: "si si-link",
  //   target: "_blank", // You can also set its target property
  // },
};
