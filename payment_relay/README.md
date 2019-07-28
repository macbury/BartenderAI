# About

This is simple payment relay microservice for the bartender. You need to run it to create and process bitcoin lighting network invoices.

## Setup BitCoin payment

Enter the lnd directory in repo, and start docker container, this starts node. Now create wallet, wait for testnet to finish sync:

```bash
bin/lncli data create
bin/lncli walletbalance
bin/lncli newaddress p2wkh # generate address
```

Copy generated address and send 3000 satoshi to it(min. Required to open a channel). Wait until money appears in wallet. Find node on https://explorer.acinq.co/ to connect to:

```bash
bin/lncli listpeers
bin/lncli connect 03864ef025fde8fb587d989186ce6a4a186895ee44a926bfc370e2c366597a3f8f@34.239.230.56:9735 # connect to node from https://starblocks.acinq.co/ or https://1ml.com/testnet/
bin/lncli openchannel 03864ef025fde8fb587d989186ce6a4a186895ee44a926bfc370e2c366597a3f8f 250000 # create channel for processing incoming bitcoins

# Some test faucet
bin/lncli connect 03a13a469bae4785e27fae24e7664e648cfdb976b97f95c694dea5e55e7d302846@lightning-test.puzzle.ch:9735
bin/lncli openchannel 03a13a469bae4785e27fae24e7664e648cfdb976b97f95c694dea5e55e7d302846 250000

bin/lncli connect 0270685ca81a8e4d4d01beec5781f4cc924684072ae52c507f8ebe9daf0caaab7b@159.203.125.125
bin/lncli openchannel 0270685ca81a8e4d4d01beec5781f4cc924684072ae52c507f8ebe9daf0caaab7b 250000

bin/lncli addinvoice --memo working --private --amt 700 # create just simple test invoice. It can take up to 1 hour before your node is discovered by network
```

If you get errors with *Route not found* or similar shit from your wallet there is a easy way to speed propagation of your node. Just send from the relay some small amount to your wallet:

```bash
bin/lncli payinvoice <your wallet payment request>
```

## Closing channel and retriving bitcoins

```bash
bin/lncli listchannels
# copy channel point
bin/lncli closechannel channel point
bin/lncli sendcoins
```

## References

* https://testnet-faucet.mempool.co/
* https://acinq.co/node
* https://github.com/lightningnetwork/lnd/blob/master/docs/grpc/ruby.md
* https://tpfaucet.appspot.com/
* https://explorer.acinq.co/
* https://starblocks.acinq.co/
* https://1ml.com/testnet/
* https://lightning-test.puzzle.ch/
* https://faucet.lightning.community/
* https://1ml.com/testnet/node/02af6648cd2f2b741eecf44bafa2488e0a9615a8c02414aea352c29fce60438bc1
* https://1ml.com/testnet/node/03933884aaf1d6b108397e5efe5c86bcf2d8ca8d2f700eda99db9214fc2712b134
