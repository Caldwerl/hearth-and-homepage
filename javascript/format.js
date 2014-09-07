$(function () {

  var currentScore = new UserData();

  currentScore.updateScore();

  fillFormatArea(5);

  $('.data').on('click', currentScore.destroyData);

  $('#newdata').on('click', currentScore.resetBoard);

  $('#resethigh').on('click', currentScore.resetScore);
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






function fillFormatArea (numRows) {

  var $formatArea = $('.format__area');

  var dataHead = '<div class="grid_2 data" value="' ;
  var dataCenter = '">&#';
  var dataChar;
  var dataTail = '</div>';

  var rangeMax = 254
  var rangeMin = 73

  var max = Math.floor(Math.random() * (rangeMax - rangeMin) + rangeMin);
  var min = max - 40;

  for (var i = 0; i < (6 * numRows); i++) {

    do {

      dataChar = Math.floor(Math.random() * (max - min) + min);

    } while (dataChar == 127 || dataChar == 129 || dataChar == 141 || dataChar == 143 ||
             dataChar == 144 || dataChar == 173 || dataChar == 160 || dataChar == 157);

    $formatArea.append(dataHead + dataChar + dataCenter + dataChar + dataTail);
  }
}
//End fillFormatArea
