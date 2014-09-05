$(function () {

  $('.content__article')
    .accordion({
      header: "h2",
      active: true,
      alwaysOpen: false,
      fillspace: true,
      collapsible: true,
      heightStyle: 'content'
    });
});
