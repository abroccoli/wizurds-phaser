(function() {
  'use strict';

  function Credits() {
  }

  Credits.prototype = {

    create: function () {
      this.back = this.game.add.button(2, 2, 'back', this.renderMenu);

      this.add.text(200, 200, 'Designed and Developed by Anthony Broccoli', {fill: '#fff', fontSize: '30px'});
      this.add.text(200, 250, 'Background Art by JJCanvas', {fill: '#fff', fontSize: '30px'});
      this.add.text(200, 300, 'Character Art by Disthron', {fill: '#fff', fontSize: '30px'});
    },

    update: function () {

    },
    renderMenu: function(){
      this.game.state.start('menu');
    }
  };

  window['wizurds'] = window['wizurds'] || {};
  window['wizurds'].Credits = Credits;

}());
