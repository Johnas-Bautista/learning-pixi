export default {
  bundles: [
    {
      name: "menu-assets",
      assets: [
        { alias: "preLoadMenuButtons", src: "/public/Assets/menu_btn.png" },
        { alias: "preLoadMainMenu", src: "/public/Assets/main.png" },
      ],
    },
    {
      name: "loading-screen",
      assets: [
        {alias: "preLoadFilledBar", src: "/Assets/progressTop.png"},
        {alias: "preLoadEmptyBar", src: "/Assets/progressBack.png"},
        {alias: "preLoadBackground", src: "/Assets/background.png"}
      ]
    },
  ],
};
