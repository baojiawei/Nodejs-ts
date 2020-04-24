'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/website/index', controller.website.home.index);
};
