//mutenroch_rev2

// helpers
var _ = require('lodash');
var log = require('../core/log.js');


// let's create our own method
var method = {};

// prepare everything our method needs
method.init = function() {

 // keep state if adviced or not
 this.adviced = false;  

 // how many candles do we need as a base
 // before we can start giving advice?
 this.requiredHistory = this.tradingAdvisor.historySize;

 // define the indicators we need
 this.addIndicator('psar', 'PSAR', this.settings);
 this.addIndicator('sma', 'SMA', this.settings.windowLength);
}

// what happens on every new candle?
method.update = function(candle) {
 // nothing!
}


method.check = function(candle) {
 
 this.bull = this.indicators.psar.bull;

 if(this.bull && candle.close > this.indicators.sma.result) {
   
   if(this.adviced == false){
   // new uptrend detected
   this.advice('long');
   this.adviced = true;

   }else
   this.advice();
   

 } else {
   
   if(this.adviced == true){
   // new downtrend detected
   this.advice('short');
   this.adviced = false;

   }else
   this.advice();
   } 
}

module.exports = method;