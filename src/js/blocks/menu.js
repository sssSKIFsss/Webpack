"use strict";

async function showMenu() {
  try {
    // eslint-disable-next-line
    let menuID = await import(/* webpackChunkName: "menuButton" */ "@components/menu");
    let Menu = menuID.default;
    let homeMenu = new Menu({
      title: "Комнаты дома",
      items: [{
        text: "Детская",
        href: "#childroom"
      }, {
        text: "Кухня",
        href: "#kitchen"
      }, {
        text: "Гостиная",
        href: "#guestroom"
      }]
    });
    return document.body.appendChild(homeMenu.elem);
  } catch (err) {
    // eslint-disable-next-line
    console.error("menu error");
    return new Error(err);
  }
}

document.getElementById("menuButton").onclick = function () {
  // noinspection JSIgnoredPromiseFromCall
  showMenu();
};

// для реализации Hot Reload
// noinspection JSUnresolvedVariable
if(module.hot) {
  module.hot.accept("@components/menu", function() {
    document.getElementById("menuButton").onclick = function () {
      // noinspection JSIgnoredPromiseFromCall
      showMenu();
    };
  });
}
