export default {
  bundles: [
    {
      name: "menu-assets",
      assets: [
        { alias: "preLoadStartButton", src: "/Assets/playBtn.png" },
        { alias: "preLoadSettingsButton", src: "/Assets/settingsBtn.png" },
        { alias: "preLoadExitButton", src: "/Assets/exitBtn.png" },
        { alias: "preLoadMainMenu", src: "/Assets/main.png" },
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
