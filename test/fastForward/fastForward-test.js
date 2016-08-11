var assert = require('assert');

var Workbench = require('ethereum-sandbox-workbench');
var workbench = new Workbench({
  defaults: {
    from: '0xcd2a3d9f938e13cd947ec05abc7fe734df8dd826'
  }
});

workbench.startTesting([], function(contracts) {
  var startingBlockNumber;
  it('tests-fast-forward', function() {
    startingBlockNumber = workbench.sandbox.web3.eth.blockNumber;
    return workbench.fastForward(15, Date.parse('2020-09-09'))
    .then(function() {
      var blockNumber = workbench.sandbox.web3.eth.blockNumber;
      assert.equal(blockNumber - startingBlockNumber, 15);
      assert.equal(workbench.sandbox.web3.eth.getBlock(blockNumber).timestamp * 1000, Date.parse('2020-09-09'));
    });
  });
});
