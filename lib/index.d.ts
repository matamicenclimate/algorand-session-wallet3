import AlgoSignerWallet from './wallets/algosigner';
import MyAlgoConnectWallet from './wallets/myalgoconnect';
import InsecureWallet from './wallets/insecure';
import { Wallet, SignedTxn } from './wallets/wallet';
import { Transaction } from 'algosdk';
export declare const allowedWallets: {
    'algo-signer': typeof AlgoSignerWallet;
    'my-algo-connect': typeof MyAlgoConnectWallet;
    'insecure-wallet': typeof InsecureWallet;
    'dev-wallet': typeof InsecureWallet;
};
export declare class SessionWallet {
    wallet: Wallet;
    wname: string;
    network: string;
    constructor(network: string, wname?: string);
    connect(): Promise<boolean>;
    connected(): boolean;
    setAccountList(accts: string[]): void;
    accountList(): string[];
    setAccountIndex(idx: number): void;
    accountIndex(): number;
    setWalletPreference(wname: string): void;
    walletPreference(): string;
    setMnemonic(m: string): void;
    mnemonic(): string;
    disconnect(): void;
    getDefaultAccount(): string;
    signTxn(txns: Transaction[]): Promise<SignedTxn[]>;
}
