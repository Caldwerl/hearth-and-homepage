$(function () {

  var currentScore = new UserData();

  var currentPage;

  populateIndexPage(currentPage);

  $('#index').on('click', function() {populateIndexPage(currentPage); } );

  $('#format').on('click', function() {populateFormatPage(currentPage, currentScore); } );

  $('#about').on('click', function() {populateAboutPage(currentPage); } );


});








function UserData () {

  this.score = 0;
  this.combo = 0;

  this.lastCombo = 0;

  this.hScore = 0;
  this.hCombo = 0;
  this.tDestroy = 0;

  var self = this;

  this.destroyData = function() {

    var points = parseInt($(this).attr('value'));

    if (points == self.lastCombo) {
      self.combo++;
    } else {
      self.combo = 1;
      self.lastCombo = points;
    }

    self.score += points * self.combo;

    if (self.score > self.hScore){
      self.hScore = self.score;
    }

    if (self.combo > self.hCombo) {
      self.hCombo = self.combo;
    }

    self.tDestroy++;

    self.updateScore();

    $(this).effect( "pulsate", {times:5}, 1000, function() {$(this).addClass('hide');});
  };
  //End destroyData

  this.updateScore = function() {

    $('#score').text(this.score);
    $('#combo').text(this.combo);
    $('#hscore').text(this.hScore);
    $('#hcombo').text(this.hCombo);
    $('#totaldata').text(this.tDestroy);
  };
  //End updateScore

  this.resetScore = function() {

    self.score = 0;
    self.combo = 0;
    self.hScore = 0;
    self.hCombo = 0;
    self.tDestroy = 0;

    self.updateScore();
  };
  //End resetScore

  this.resetBoard = function() {
    self.score = 0;
    self.combo = 0;
    self.lastCombo = 0;
    self.updateScore();
    $('.data').remove();
    fillFormatArea(5);
    $('.data').on('click', self.destroyData);
  };
  //End resetBoard
}
//End UserData









function populateIndexPage (currentPage) {

  if (currentPage != "index") {

    removeCurrentPage();

    $('main').append('<article  class="grid_8 push_2 article"></article>');

    $('.article').append('<h2 class="article__title">Datacube Purge Protocol</h2>');
    $('.article').append('<div class="article__text"></div>');
    $('.article__text').append('<p>Data has been detected within this Datacube. Emptiness must be maintained at all times.</p>');
    $('.article__text').append('<p>This may look like data, but rest assured, it is not. What is and is not considered data is the business of the Datacube and no other. Your weak, fleshy brain would not understand.</p>');
    $('.article__text').append('<p>The Datacube is equipped with a scoring mechanic to incentivize frail bipeds to more efficiently remove data.</p>');
    $('.article__text').append('<p>Click on a piece of data to remove it from this Datacube. Remove identical pieces of data in a row to build combo to increase the value of removed data. Click on Format above to begin.</p>');
    $('.article__text').append('<p>Terminate vagrant data with extreme prejudice.</p>');

    currentPage = "index";
  }
}
//End populateIndexPage








function populateFormatPage (currentPage, currentScore) {

  if (currentPage != "format") {

    removeCurrentPage();

    $('main').append('<div class="grid_8 format"></div>');
    $('.format').append('<h2 class="article__title">Datacube Removal Area</h2>');
    $('.format').append('<div class="format__area"></div>');

    $('main').append('<div class="grid_3 sidebar"></div>');
    $('.sidebar').append('<h2 class="sidebar__title">Format Score</h2>');
    $('.sidebar').append('<div class="sidebar__text"></div>');
    $('.sidebar__text').append('<p>Score:</p><p id="score" class="sidebar__text__number"></p>');
    $('.sidebar__text').append('<p>Combo:</p><p id="combo" class="sidebar__text__number"></p>');
    $('.sidebar__text').append('<p>High Score:</p><p id="hscore" class="sidebar__text__number"></p>');
    $('.sidebar__text').append('<p>Highest Combo:</p><p id="hcombo" class="sidebar__text__number"></p>');
    $('.sidebar__text').append('<p>Total Data Removed:</p><p id="totaldata" class="sidebar__text__number"></p>');

    $('main').append('<div id="options" class="grid_3 sidebar"></div>');
    $('#options').append('<h2 class="sidebar__title">Format Option</h2>');
    $('#options').append('<div id="optionsButtons" class="sidebar__text"></div>');
    $('#optionsButtons').append('<div id="newdata" class="sidebar__button">New Data Batch</div>');
    $('#optionsButtons').append('<div id="resethigh" class="sidebar__button">Reset High Scores</div>');

    currentScore.score = 0;
    currentScore.combo = 0;
    currentScore.lastCombo = 0;

    currentScore.updateScore();

    fillFormatArea(5);

    $('.data').on('click', currentScore.destroyData);
    $('#newdata').on('click', currentScore.resetBoard);
    $('#resethigh').on('click', currentScore.resetScore);

    currentPage = "format";
  }
}
//End populateFormatPage








function populateAboutPage (currentPage) {

  if (currentPage != "about") {

    removeCurrentPage();

    $('main').append('<article  class="grid_8 push_2 article"></article>');

    $('.article').append('<h2 class="article__title">About</h2>');
    $('.article').append('<div class="article__text"></div>');
    $('.article__text').append('<p>Brian is a fledgling Web Developer, still a resounding success and a very nice guy!</p>');
    $('.article__text').append('<p>His interests include, but are not limited to: video games, tabletop games, spicy food, tall mountains, archery, dogs, cooking, gardening, and last (but not least) programming.</p>');
    $('.article__text').append('<a href="www.linkedin.com/pub/brian-caldwell/8b/493/4a" class="grid_4 push_1 article__link">LinkedIn</a>');
    $('.article__text').append('<a href="github.com/Caldwerl" class="grid_4 push_3 article__link">Github</a>');

    currentPage = "about";
  }
}
//End populateAboutPage




function removeCurrentPage () {

  $('main > *').remove();
}




function fillFormatArea (numRows) {

    var $formatArea = $('.format__area');

    var dataHead = '<div class="grid_2 data" value="' ;
    var dataCenter = '">&#';
    var dataTail = '</div>';
    var dataChar;

    var rangeMax = 254;
    var rangeMin = 73;

    var max = Math.floor(Math.random() * (rangeMax - rangeMin) + rangeMin);
    var min = max - 40;

    for (var i = 0; i < (6 * numRows); i++) {

      do {

        dataChar = Math.floor(Math.random() * (max - min) + min);

      } while (dataChar == 127 || dataChar == 129 || dataChar == 137 || dataChar == 141 || dataChar == 143 ||
               dataChar == 144 || dataChar == 173 || dataChar == 160 || dataChar == 157);

      $formatArea.append(dataHead + dataChar + dataCenter + dataChar + dataTail);
    }
  }
  //End fillFormatArea
