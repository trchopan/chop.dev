+++
title = "scheduled-blocks"
author = ["Chop Tr (chop.ink)"]
description = "Use the Epoch Nonce seeds and compare with the Pool sigma derived VRF key of the Pool to calculate the block assignment schedule."
date = 2022-03-01T00:00:00+07:00
tags = ["scheduled-blocks", "cardano", "blockchain", "stake", "pool", "operator", "block", "slot", "estimation"]
draft = false
+++

Use the Epoch Nonce seeds and compare with the Pool sigma derived VRF key of the Pool to calculate the block assignment schedule.

No `cardano-node` Required, data is taken from [blockfrost.io](https://blockfrost.io) and [armada-alliance.com](https://armada-alliance.com).

This is a rewritten in Haskell of the [ScheduledBlocks](https://github.com/asnakep/ScheduledBlocks) in Python.


## Commands {#commands}


### history {#history}

Get the scheduled block in past epoch (current epoch included)


### next {#next}

Get the scheduled block for the next epoch by query the nonce from `armada-aliance`.

Note: Next nonce is announce 1.5 days before the end of current epoch.


### Example {#example}

```nil
$ scheduled-blocks history --epoch 321 \
    --blockFrostApi $BLOCKFROST_API \
    --poolId $POOL_ID \
    --vrfSkey ~/vrf.skey

Checking current network epoch...done
Checking Pool Sigma from Pool History...done
Checking epoch parameters...done
Checking epoch info for active stake...done
Checking network genenis...done
Nonce: 97be25ab0a46a6537faaf32f882de17611c897f32c7eeef12f53a176b225e461
Active Slot Coefficient: 0.050
Epoch Length: 432000
Slot Length: 1
First Slot of Epoch: 53308800
Last Slot of Epoch: 53740800
Active Stake (epoch 321): 23,537,719,498,083,358
Pool Active Stake: 916,392,141,238
Pool Sigma: 0.000038933
Slot 53309568 block assigned. Time 2022-02-15 04:57:39 +0700

Working [==================>......]  74%
```


## Tags {#tags}

cardano blockchain, block schedule, epoch, blockfrost, armada-alliance


## License {#license}

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2022-, Quang Tran.