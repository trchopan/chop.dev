+++
title = "Test procedure for scheduled-blocks"
author = ["Chop Tr (chop.ink)"]
description = "Part 1: Setup test cases for developing scheduled-blocks in Haskell"
date = 2022-02-24T00:00:00+07:00
tags = ["test", "procedure", "scheduled-blocks", "cardano", "blockchain", "stake", "pool", "operator"]
draft = false
+++

## Setup test vrf.key {#setup-test-vrf-dot-key}

Execute the below command on with `cardano-cli`

```bash
cardano-cli node key-gen-VRF \
--verification-key-file vrf.vkey \
--signing-key-file vrf.skey

cat vrf.skey
```

Output of `vrf.skey`:

```json
{
    "type": "VrfSigningKey_PraosVRF",
    "description": "VRF Signing Key",
    "cborHex": "584052206c64f589b12dedefe07a454b24248ec9dc993bcafbe91705a5a5ae5acff8496e38d9aa9739392eb548796bc84688315b843f3841805d7775b5c95c5ba212"
}
```


## Getting a set of test result from the `ScheduledBlocks` {#getting-a-set-of-test-result-from-the-scheduledblocks}

repo: <https://github.com/asnakep/ScheduledBlocks>

file: `ScheduledBlocks.py`


### Put the `vrf.skey` into the `ScheduledBlocks` folder {#put-the-vrf-dot-skey-into-the-scheduledblocks-folder}

```bash
cp test/vrf.skey <path_to_ScheduledBlock>/
```


### Input the configuration for `ScheduledBlocks.py` {#input-the-configuration-for-scheduledblocks-dot-py}

I pick random `PoolTicker` and corespont `PoolID` for this. Can be obtain from any pool information from [adapool.org](https://adapools.org/) or [cardanoscan](https://cardanoscan.io/)

```python
### Set These Variables ###
BlockFrostId = "<your_blockfrost_API_key>"
PoolId = "689a60c22ae02ece9405e0cd5fefdb7ceffc0a52c61c42d9955a9b1b"
PoolTicker = "ETO5"
VrfKeyFile = "./vrf.skey"
### -------------------------------------------------------------- ###
```


### Edit the file to output the example results {#edit-the-file-to-output-the-example-results}

```python
def mkSeed(slot, eta0):
    h = hashlib.blake2b(digest_size=32)
    h.update(bytearray([0, 0, 0, 0, 0, 0, 0, 1]))  # neutral nonce
    seedLbytes = h.digest()

    print("seedLbytes", binascii.hexlify(seedLbytes)) # <- Add output

    h = hashlib.blake2b(digest_size=32)
    h.update(slot.to_bytes(8, byteorder="big") + binascii.unhexlify(eta0))
    slotToSeedBytes = h.digest()

    print("slotToSeedBytes", binascii.hexlify(slotToSeedBytes)) # <- Add output

    seed = [x ^ slotToSeedBytes[i] for i, x in enumerate(seedLbytes)]


    return bytes(seed)

```

```python
# Determine if our pool is a slot leader for this given slot
# @param slot The slot to check
# @param activeSlotCoeff The activeSlotsCoeff value from protocol params
# @param sigma The controlled stake proportion for the pool
# @param eta0 The epoch nonce value
# @param poolVrfSkey The vrf signing key for the pool

def isSlotLeader(slot, activeSlotCoeff, sigma, eta0, poolVrfSkey):
    seed = mkSeed(slot, eta0)

    print("mkSeed", binascii.hexlify(seed)) # <- Add output

    tpraosCanBeLeaderSignKeyVRFb = binascii.unhexlify(poolVrfSkey)
    cert = vrfEvalCertified(seed, tpraosCanBeLeaderSignKeyVRFb)

    print("proofHashRaw", binascii.hexlify(cert))  # <- Add output

    certNat = int.from_bytes(cert, byteorder="big", signed=False)
    certNatMax = math.pow(2, 512)
    denominator = certNatMax - certNat
    q = certNatMax / denominator
    c = math.log(1.0 - activeSlotCoeff)
    sigmaOfF = math.exp(-sigma * c)

    # <- Add output
    print("certNat", certNat)
    print("certNatMax", certNatMax.to_bytes(8, byteorder="big"))
    print("denominator", denominator.to_bytes(8, byteorder="big"))
    print("q", q)
    print("c", c)
    print("sigmaOfF", sigmaOfF)

    return q <= sigmaOfF

```

Change the loop to only process 3 epochs for small set of results

```python
for slot in range(firstSlotOfEpoch, 3 + firstSlotOfEpoch): # Change epochLength -> 3 here
    # <- Add output
    print("slot", slot)
    print("eta0", eta0)
    print("poolVrfSkey", poolVrfSkey)

    slotLeader = isSlotLeader(slot, activeSlotCoeff, sigma, eta0, poolVrfSkey)

    if slotLeader:
        pass
        timestamp = datetime.fromtimestamp(slot + 1591566291, tz=local_tz)
        slotcount += 1

        print(
            col.bold
            + "Leader At Slot: "
            + str(slot - firstSlotOfEpoch)
            + " - Local Time "
            + str(
                timestamp.strftime("%Y-%m-%d %H:%M:%S")
                + " - Scheduled Epoch Blocks: "
                + str(slotcount)
            )
        )
```


### Example output {#example-output}

```nil
$ python3 ScheduledBlocks.py

Welcome to ScheduledBlocks for Cardano SPOs.

Check Assigned Blocks in Next, Current and Previous Cardano Epochs.

Current Epoch: 322


(N) to check Next Epoch Schedules (Next Epoch Nonce Available)

(C) to Check Current Epoch

(P) to Check Previous Epochs

(X) to Exit


Checking SlotLeader Schedules for Stakepool: ETO5

Pool Id: 689a60c22ae02ece9405e0cd5fefdb7ceffc0a52c61c42d9955a9b1b

Epoch: 322

Nonce: f2e96ac93621858d0a40f528c8bcbe432058279294be35627204e893d2f9a71e

Network Active Stake in Epoch 322: 23,504,746,248.174263 ₳

Pool Active Stake in Epoch 322: 60,470,356.039707 ₳

activeSlotCoeff 0.05
sigma 0.002572687039512458
slot 53740800
eta0 f2e96ac93621858d0a40f528c8bcbe432058279294be35627204e893d2f9a71e
poolVrfSkey 52206c64f589b12dedefe07a454b24248ec9dc993bcafbe91705a5a5ae5acff8496e38d9aa9739392eb548796bc84688315b843f3841805d7775b5c95c5ba212
seedLBytes b'12dd0a6a7d0e222a97926da03adb5a7768d31cc7c5c2bd6828e14a7d25fa3a60'
slotToSeedBytes b'4ab1b6157f2523b666c32aee91cf16893e2bbc06c2be8abdbb01c4159be4de11'
mkSeed b'586cbc7f022b019cf151474eab144cfe56f8a0c1077c37d593e08e68be1ee471'
proofHashRaw b'becddea8194aac725513e53fbf9873077a87554ec63909ba6942b4c60f139aae684e00f63ca60a50e0f50118a60e3a270a91d5adb52a308b84098cd6c2d2c04f'
certNat 9993225705143723881832524447511445738479038514063651361752838137906868366962293258609055832134432965671983794949003812407739981266111016766432334247542863
certNatMax 1.3407807929942597e+154
denominator 3.4145822247988726e+153
q 3.9266320291151726
c -0.05129329438755058
sigmaOfF 1.0001319703009988
slot 53740801
eta0 f2e96ac93621858d0a40f528c8bcbe432058279294be35627204e893d2f9a71e
poolVrfSkey 52206c64f589b12dedefe07a454b24248ec9dc993bcafbe91705a5a5ae5acff8496e38d9aa9739392eb548796bc84688315b843f3841805d7775b5c95c5ba212
seedLBytes b'12dd0a6a7d0e222a97926da03adb5a7768d31cc7c5c2bd6828e14a7d25fa3a60'
slotToSeedBytes b'84d6e70468f8050f3f5c2c24365193a8c0e3dd075e69dfda00a3d6939944f589'
mkSeed b'960bed6e15f62725a8ce41840c8ac9dfa830c1c09bab62b228429ceebcbecfe9'
proofHashRaw b'dec6f1b5ea0296cd024ac969865d93bc2a3e1b2c4df5617bf3784a24d6acc3481cb942aa1ce0799980b23de8c48a9d33c5cc0513441ca62bc0d159a3f7e88c34'
certNat 11667784815308455192673506042946055463951095368222055616419769672112316184660192266868880753383549053509178687606901197330403772752548239681811759539719220
certNatMax 1.3407807929942597e+154
denominator 1.7400231146341417e+153
q 7.70553437892791
c -0.05129329438755058
sigmaOfF 1.0001319703009988
```

Above I ran the script `ScheduledBlocks.py` for current epoch `322` on `mainnet`. The extracted values are:

```json
{
  "activeSlotCoeff": 0.05,
  "sigma": 0.002572687039512458,
  "poolTicker": "ETO5",
  "nonce": "f2e96ac93621858d0a40f528c8bcbe432058279294be35627204e893d2f9a71e",
  "vrfSkey": "52206c64f589b12dedefe07a454b24248ec9dc993bcafbe91705a5a5ae5acff8496e38d9aa9739392eb548796bc84688315b843f3841805d7775b5c95c5ba212",
  "seedLBytes": "12dd0a6a7d0e222a97926da03adb5a7768d31cc7c5c2bd6828e14a7d25fa3a60",
  "certNatMax": "13407807929942597099574024998205846127479365820592393377723561443721764030073546976801874298166903427690031858186486050853753882811946569946433649006084096",
  "slots": [
    {
      "slotToSeedBytes": "4ab1b6157f2523b666c32aee91cf16893e2bbc06c2be8abdbb01c4159be4de11",
      "mkSeed": "586cbc7f022b019cf151474eab144cfe56f8a0c1077c37d593e08e68be1ee471",
      "proofHashRaw": "becddea8194aac725513e53fbf9873077a87554ec63909ba6942b4c60f139aae684e00f63ca60a50e0f50118a60e3a270a91d5adb52a308b84098cd6c2d2c04f",
      "certNat": "9993225705143723881832524447511445738479038514063651361752838137906868366962293258609055832134432965671983794949003812407739981266111016766432334247542863",
      "denominator": 3.4145822247988726e153,
      "q": 3.9266320291151726,
      "c": -0.05129329438755058,
      "sigmaOfF": 1.0001319703009988,
      "slot": 53740800
    },
    {
      "slotToSeedBytes": "84d6e70468f8050f3f5c2c24365193a8c0e3dd075e69dfda00a3d6939944f589",
      "mkSeed": "960bed6e15f62725a8ce41840c8ac9dfa830c1c09bab62b228429ceebcbecfe9",
      "proofHashRaw": "dec6f1b5ea0296cd024ac969865d93bc2a3e1b2c4df5617bf3784a24d6acc3481cb942aa1ce0799980b23de8c48a9d33c5cc0513441ca62bc0d159a3f7e88c34",
      "certNat": "11667784815308455192673506042946055463951095368222055616419769672112316184660192266868880753383549053509178687606901197330403772752548239681811759539719220",
      "denominator": 1.7400231146341417e153,
      "q": 7.70553437892791,
      "c": -0.05129329438755058,
      "sigmaOfF": 1.0001319703009988,
      "slot": 53740801
    }
  ]
}
```

These will be the test expected value during my developement.
