"use strict";

// подгружаем модуль динамически при нажатии кнопки
// через современный механизм await import

async function getTemplate(message) {
  try {
    // eslint-disable-next-line
    let template = await import(/* webpackChunkName: "importButton" */ "./modules/import_block");
    // eslint-disable-next-line
    alert(template.default + message);
    return template;
  } catch(err) {
    // eslint-disable-next-line
    console.error("template error");
    return new Error(err);
  }
}

document.getElementById("importButton").onclick = function () {
  // noinspection JSIgnoredPromiseFromCall
  getTemplate(" из dynamic_import => dynamic_block");
};


// noinspection JSUnresolvedVariable
if(module.hot) {
  module.hot.accept("./modules/import_block", function() {
    // noinspection JSIgnoredPromiseFromCall
    getTemplate(" dynamic_import через HMR");
  });
}
