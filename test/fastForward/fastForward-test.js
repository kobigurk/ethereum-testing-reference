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
      var block = workbench.sandbox.web3.eth.getBlock(blockNumber);
      assert.equal(blockNumber - startingBlockNumber, 15);
      assert.equal(block.timestamp * 1000, Date.parse('2020-09-09'));
      return new Promise((resolve, reject) => {
        setTimeout(function() {
          return workbench.sendTransaction({
            to: '0xcd2a3d9f938e13cd947ec05abc7fe734df8dd826',
            value: workbench.sandbox.web3.toWei(1)
          })
          .then(resolve)
          .catch(reject);
        }, 5000);
      });
    })
    .then(function(txHash) {
      return workbench.waitForReceipt(txHash);
    })
    .then(function(receipt) {
      var blockNumber = receipt.blockNumber;
      var block = workbench.sandbox.web3.eth.getBlock(blockNumber);
      assert(block.timestamp * 1000 > Date.parse('2020-09-09'));
    });
  });
});
