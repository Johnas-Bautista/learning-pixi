
export default {
  bundles: [
    {
      name: "menu-assets",
      assets: [
        { alias: "preLoadStartButton", src: "/Assets/playBtn.png" },
        { alias: "preLoadSettingsButton", src: "/Assets/settingsBtn.png" },
        { alias: "preLoadExitButton", src: "/Assets/exitBtn.png" },
        { alias: "preLoadGoBackButton", src: "/Assets/back.png" },
        { alias: "preLoadMainMenu", src: "/Assets/main.png" }
      ],
    },
    {
      name: "loading-screen-assets",
      assets: [
        {alias: "preLoadFilledBar", src: "/Assets/progressTop.png"},
        {alias: "preLoadEmptyBar", src: "/Assets/progressBack.png"},
        {alias: "preLoadBackground", src: "/Assets/background.png"}
      ]
    },
    {
      name: "ingame-assets",
      assets: [ 
        { alias: "fahMeme", src: "/Assets/Memes/Ash_baby.webp" },
        { alias: "fahSfx", src: "/Assets/sfx/fah.mp3" },
        { alias: "emotionalDamageMeme", src: "/Assets/Memes/emotionalDamage.jpg" },
        { alias: "emotionalDamageSfx", src: "/Assets/sfx/emotionalDamage.mp3" }
      ]
    },
  ],
};
