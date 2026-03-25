
export default {
  bundles: [
    {
      name: "menu-assets",
      assets: [
        { alias: "preLoadStartButton", src: "/Assets/playBtn.png" },
        { alias: "preLoadSettingsButton", src: "/Assets/settingsBtn.png" },
        { alias: "preLoadExitButton", src: "/Assets/exitBtn.png" },
        { alias: "preLoadGoBackButton", src: "/Assets/back.png" },
        { alias: "preLoadMainMenu", src: "/Assets/main.png" },
        { alias: "sliderButton", src: "/Assets/sliderButton.png" },
        { alias: "select3x4", src: "/Assets/3x4.png" },
        { alias: "select4x4", src: "/Assets/4x4.png" },
        { alias: "select4x5", src: "/Assets/4x5.png" },
      ],
    },
    {
      name: "loading-screen-assets",
      assets: [
        {alias: "preLoadFilledBar", src: "/Assets/progressTop.png"},
        {alias: "preLoadEmptyBar", src: "/Assets/progressBack.png"},
        {alias: "preLoadBackground", src: "/Assets/background.png"},
        {alias: "mainBgm", src: "/Assets/sfx/thick-of-it.mp3"},
        {alias: "buttonClicked", src: "/Assets/sfx/buttonClick.mp3"},
        {alias: "flipCard", src: "/Assets/sfx/flipCard.mp3"}
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
        { alias: "whatDaHell", src: "/Assets/Memes/wutdahell.webp"},
        { alias: "gay", src: "/Assets/Memes/gay.jpg"},
        { alias: "superidol", src: "/Assets/Memes/superidol.jpg"},
        { alias: "snoreMeme", src: "/Assets/Memes/snore.jfif"},
        { alias: "yoMeme", src: "/Assets/Memes/yoMeme.jfif"},
        { alias: "67Meme", src: "/Assets/Memes/67meme.png"},
      ]
    },
    {
      name: "ingame-sfx",
      assets: [
          { alias: "fahSfx", src: "/Assets/sfx/fah.mp3" },
          { alias: "emotionalDamageSfx", src: "/Assets/sfx/emotionalDamage.mp3" },
          { alias: "homelessSfx", src: "/Assets/sfx/homeless.mp3" },
          { alias: "sadHamsterSfx", src: "/Assets/sfx/sadViolin.mp3" },
          { alias: "tralaleroTralalaSfx", src: "/Assets/sfx/traleroTralala.mp3" },
          { alias: "huhCatSfx", src: "/Assets/sfx/huhCat.mp3" },
          { alias: "StopItSfx", src: "/Assets/sfx/stopItGetSomeHelp.mp3" },
          { alias: "underwaterSfx", src: "/Assets/sfx/underwater.mp3" },
          { alias: "whatDaHellSfx", src: "/Assets/sfx/wutdahel.mp3" },
          { alias: "gaySfx", src: "/Assets/sfx/gey.mp3" },
          { alias: "superidolSfx", src: "/Assets/sfx/superidol.mp3" },
          { alias: "snoreSfx", src: "/Assets/sfx/snore.mp3" },
          { alias: "yoSfx", src: "/Assets/sfx/yoSfx.mp3" },
          { alias: "67Sfx", src: "/Assets/sfx/67sfx.mp3" },
      ]
    }, {
      name: "outcome-asset",
      assets: [
        {alias: "youLose", src: "/Assets/YouLose.png"},
        {alias: "youWin", src: "/Assets/YouWin1.png"},
        {alias: "youWin1Sfx", src: "/Assets/sfx/youwinSound.mp3"},
        {alias: "youWin2Sfx", src: "/Assets/sfx/youwinSfx.mp3"},
        {alias: "restartGame", src: "/Assets/restart.png"},
        {alias: "gameOver1Sfx", src: "/Assets/sfx/gameOver1.mp3"},
        {alias: "gameOver2Sfx", src: "/Assets/sfx/gameOver2.mp3"},
        {alias: "gameOver3Sfx", src: "/Assets/sfx/gameOverFart.mp3"}
      ]
    }
  ],
};
