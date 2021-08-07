import { Transaction,TransactionParams } from 'algosdk'
import { SignedTxn, Wallet } from './wallet'
import algosdk from 'algosdk'

class InsecureWallet implements Wallet {
    accounts: string[]
    default_account: number
    network: string

    pkToSk: object

    async connect(mnemonic: string): Promise<boolean> {
        if(this.isConnected()) return true

        const sk = algosdk.mnemonicToSecretKey(mnemonic)

        this.accounts = [sk.addr]
        this.pkToSk  = {[sk.addr]: mnemonic.split(" ")}
        this.default_account = 0;

        return true
    }

    static img(inverted: boolean): string {
        return "" 
    }

    img(inverted: boolean): string {
        return InsecureWallet.img(inverted)
    }

    isConnected(): boolean {
        return this.accounts && this.accounts.length>0;
    }

    getDefaultAccount(): string {
        if(!this.isConnected()) return ""
        return this.accounts[this.default_account];
    }

    async signTxn(txns: Transaction[]): Promise<SignedTxn[]> {
        const signed = [];
        const default_addr = this.getDefaultAccount()
        for(let txidx in txns){
            let addr = algosdk.encodeAddress(txns[txidx].from.publicKey)
            if(addr == default_addr){
                signed.push(algosdk.signTransaction(txns[txidx], this.pkToSk[addr].sk)) 
            }else{
                signed.push({txID:"", blob:new Uint8Array()})
            }
        }
        return signed
    }

    async sign(txn: TransactionParams): Promise<SignedTxn> {
        let addr = this.getDefaultAccount()
        return algosdk.signTransaction(new Transaction(txn), this.pkToSk[addr].sk)
    }

    async signBytes(b: Uint8Array): Promise<Uint8Array> {
        let addr = this.getDefaultAccount()
        return algosdk.signBytes(b, this.pkToSk[addr].sk)
    }

    signTeal(teal: Uint8Array): Promise<Uint8Array> {
        throw new Error('Method not implemented.')
    }
}

export default InsecureWallet;