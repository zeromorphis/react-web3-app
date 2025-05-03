/*
 * @Descripttion: 授人以渔，功德无量，利在千秋
 * @version: 4.0.0
 * @Author: 言棠
 * @Date: 2022-06-17 09:28:11
 * @LastEditors: 言棠
 * @LastEditTime: 2023-10-22 20:14:34
 */
import { message } from 'antd';
import { interceptDecimal, isMobile } from "@/utils/common";
import sdk from '@/sdk/chanjssdktd.js';
import Web3 from "web3";
import { store } from "@/redux";
import { setAddress, setbnbBalance, setBindAccountCode, setGameAccount } from "@/redux/modules/user/action";
import { connectWalletApi, isBoundApi } from "@/api/modules/wallet";


export const connectWeb3 = async () => {
  // 判断链对不，链不对就请求切换网络，或者添加网络
  if (window.ethereum && window.ethereum.isMetaMask) {
    try {
      await (window.ethereum as any).request({
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: Web3.utils.numberToHex(97) // 目标链ID
        }]
      });
      await (window.ethereum as any).request({ method: 'eth_requestAccounts' }).then(async () => {
        const address = await sdk.chainWeb3.connectMetamask();
        const bnbBalance = await sdk.chainWeb3.getBalance();
        store.dispatch(setAddress(address));
        store.dispatch(setbnbBalance(bnbBalance));
        isBoundApi({ address }).then((response: any) => {
          store.dispatch(setBindAccountCode(response.code));
          store.dispatch(setGameAccount(response.data.account));
        }).catch(error => {
          store.dispatch(setBindAccountCode(error.code));
        });
        let httpData = {
          address: address,/** 钱包地址 */
          bnbOver: interceptDecimal(bnbBalance, 4),/** BNB余额 */
          heroToken: 0,/** token代币数量 */
        };
        connectWalletApi(httpData).then(function () {
          if (isMobile()) {
            message.success('Wallet connected successfully')
          } else {
            message.success('Wallet connected successfully')
          }
        })
      });
    } catch (e) {
      if ((e as any).code === 4902) {
        try {
          await (window.ethereum as any).request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: Web3.utils.numberToHex(97), // 目标链ID
                chainName: 'TD',
                nativeCurrency: {
                  name: 'BNB',
                  symbol: 'BNB',
                  decimals: 18
                },
                rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'], // 节点
                blockExplorerUrls: ['https://testnet.bscscan.com']
              }
            ]
          });
          await (window.ethereum as any).on("chainChanged", async (chainId: any) => {
            if (chainId != Web3.utils.numberToHex(97)) {
              await (window.ethereum as any).request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: Web3.utils.numberToHex(97), // 目标链ID
                    chainName: 'TD',
                    nativeCurrency: {
                      name: 'BNB',
                      symbol: 'BNB',
                      decimals: 18
                    },
                    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'], // 节点
                    blockExplorerUrls: ['https://testnet.bscscan.com']
                  }
                ]
              });
            }
          });
          connectWeb3();
        } catch (ee) {
          console.log(ee)
        }
      } else if ((e as any).code === 4001) {
        if (isMobile()) {
          message.warning({
            content: e,
            duration: 3
          })
        } else {
          message.warning({
            content: e,
            duration: 3
          })
        }
      }
    }
  } else {
    window.open('https://metamask.io/download/', "_blank")
  }
}

export function isMetaMask() {
  return window.ethereum && window.ethereum.isMetaMask
}