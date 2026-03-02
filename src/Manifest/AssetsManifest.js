
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
        {alias: "preLoadBackground", src: "/Assets/background.png"},
        {alias: "mainBgm", src: "/Assets/sfx/thick-of-it.mp3"},
        {alias: "buttonClicked", src: "/Assets/sfx/buttonClick.mp3"}
      ]
    },
    {
      name: "ingame-assets",
      assets: [ 
        { alias: "fahMeme", src: "/Assets/Memes/Ash_baby.webp" },
        { alias: "emotionalDamageMeme", src: "/Assets/Memes/emotionalDamage.jpg" },
        { alias: "homelessMeme", src: "/Assets/Memes/homelessMeme.png"},
        { alias: "sadHamsterMeme", src: "/Assets/Memes/sadHamster.png"},
        { alias: "traleroTralalaMeme", src: "/Assets/Memes/tralaleroTralala.jpg"},
        { alias: "huhCatMeme", src: "/Assets/Memes/huhCat.png"},
        { alias: "StopItMeme", src: "/Assets/Memes/stopItGetSomeHelp.png"},
        { alias: "underwaterMeme", src: "/Assets/Memes/underWater.png"},
      ]
    },
    {
      name: "ingame-sfx",
      assets: [
          { alias: "fahSfx", src: "/Assets/sfx/fah.mp3" },
          { alias: "emotionalDamageSfx", src: "/Assets/sfx/emotionalDamage.mp3" },
          { alias: "homelessSfx", src: "/Assets/sfx/homeLess.mp3" },
          { alias: "sadHamsterSfx", src: "/Assets/sfx/sadViolin.mp3" },
          { alias: "tralaleroTralalaSfx", src: "/Assets/sfx/traleroTralala.mp3" },
          { alias: "huhCatSfx", src: "/Assets/sfx/huhCat.mp3" },
          { alias: "StopItSfx", src: "/Assets/sfx/stopItGetSomeHelp.mp3" },
          { alias: "underwaterSfx", src: "/Assets/sfx/underwater.mp3" },
      ]
    }, {
      name: "game-over-asset",
      assets: [
        {alias: "gameOver", src: "/Assets/GameOver.png"},
        {alias: "gameOverSfx", src: "/Assets/GameOver.png"}
      ]
    }
  ],
};
