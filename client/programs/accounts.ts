/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { deserializeUnchecked, serialize } from 'borsh';
import { NATIVE_MINT, Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import {
  Connection,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  TransactionInstruction,
} from '@solana/web3.js';
import type { Connection as ConnectionType, Signer } from '@solana/web3.js';

/**
 * Create Token mint to the payer account
 * @returns
 */
export async function mintToken({
  connection,
  payer,
  decimals,
}: {
  connection: ConnectionType;
  payer: Signer;
  decimals: number;
}): Promise<Token> {
  // We are using existing program
  const mintToken = await Token.createMint(
    connection,
    payer,
    payer.publicKey,
    null,
    decimals,
    TOKEN_PROGRAM_ID,
  );

  const fromTokenAccount = await mintToken.getOrCreateAssociatedAccountInfo(
    payer.publicKey,
  );

  // Mint 1 Token
  await mintToken.mintTo(fromTokenAccount.address, payer.publicKey, [], 1);

  return mintToken;
}

/**
 * Create MintTokenAccount
 * Token Account that holds amounts to send to
 * owner: payer(initializer)
 * authorizer: payer(initializer)
 */
export async function createMintTokenAccount({
  connection,
  payer,
  amount,
}: {
  connection: Connection;
  payer: Signer;
  amount: number;
}): Promise<[PublicKey, Token]> {
  const mintToken = await Token.createMint(
    connection,
    payer,
    payer.publicKey,
    null,
    0, // Consider it as NFT
    TOKEN_PROGRAM_ID,
  );
  const account = await mintToken.createAccount(payer.publicKey);
  await mintToken.mintTo(account, payer, [], amount);
  return [account, mintToken];
}

/**
 * Create NativeMintTokenAccount
 * Token Account that holds amounts to send to
 * owner: payer(initializer)
 * authorizer: payer(initializer)
 * amount: amount of lamports to wrap
 */
export async function createNativeMintTokenAccount({
  connection,
  payer,
  amount,
}: {
  connection: Connection;
  payer: Signer;
  amount: number;
}): Promise<[PublicKey, Token]> {
  const mintTokenAccount = await Token.createWrappedNativeAccount(
    connection,
    TOKEN_PROGRAM_ID,
    payer.publicKey,
    payer,
    amount,
  );
  const mintToken = new Token(connection, NATIVE_MINT, TOKEN_PROGRAM_ID, payer);
  return [mintTokenAccount, mintToken];
}
