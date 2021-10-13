# Escrow Program

Escrow Program for [sol hayama](https://www.sol-hayama.com)

# Build

```
$ cd rust
$ cargo build-bpf
```

# Deploy locally

```
$ solana-test-validator
// Open a new terminal
$ solana program deploy /Users/your/workspace/rust/escrow_program/rust/target/deploy/escrow.so
```

# Test with theclient

- You need to prepare 2 accounts(Alice, Bob)
  - Create wallets in the different location
- Create .env and add below

```
WALLET_DIR=/Users/your/workspace/.config/solana
ALICE_WALLET_DIR=/Users/your/workspace/.config/solana
BOB_WALLET_DIR=/Users/your/workspace/bob/solana-test-wallet
```

- Test escrow

```
$ yarn start:escrow-native-mint
```

- Test cancel escrow

```
$ yarn start:escrow-cancel
```

# License

```
Copyright 2021 Tomoaki Imai

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
