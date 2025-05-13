/*
 * @Author: 言棠
 * @version: 3.0.0
 * @Descripttion: 人人都说顶峰相见，路边的水沟人满为患
 * @Date: 2023-10-21 23:48:43
 * @LastEditors: YT
 * @LastEditTime: 2025-05-13 20:09:16
 */
import { ethers, Contract, formatUnits, parseUnits, toBeHex } from "ethers";

import ExampleABI from "@/sdk/abi/Example.json";

import { store } from "@/redux";
import { setAddress, setBalance, signOut } from "@/redux/modules/user/action";

const CHAIN_BROWSER: any = {
  8453: "https://basescan.org", //正式链浏览器
};

const ContractsAddr: any = {
  //正式链合约地址8453
  8453: {
    Example: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", //空投地址
  },
};

const TARGET_CHAIN_ID = 8453; // 8453 Base 测试网（十六进制）
const CHAIN_INFO = {
  chainId: toBeHex(TARGET_CHAIN_ID),
  chainName: "Base Mainnet",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://base-mainnet.infura.io"],
  blockExplorerUrls: ["https://basescan.org"],
};

const exampleLength: number = 6; //浮点数保留长度

var chainWeb3: any = null;
class ChainWeb3 {
  ethereum: any;
  provider: any;
  signer: any;
  apiModules: any[];
  ZERO_ADDR: string;
  constructor() {
    this.ethereum = null;
    this.provider = null;
    this.signer = null;
    this.ZERO_ADDR = "0x0000000000000000000000000000000000000000";
    this.apiModules = [];
  }

  registerModule(module: any) {
    this.apiModules.push(module);
  }

  initModules() {
    console.log("initModules...");

    for (let module of this.apiModules) {
      module.initialize();
    }

    for (let module of this.apiModules) {
      module.initAfter();
    }
  }

  handleNewChain(chainId: any) {
    console.log("handleNewChain:", chainId);
    chainWeb3.initModules();
  }

  handleNewAccounts(newAccounts: any) {
    console.log("handleNewAccounts:", newAccounts);
    store.dispatch(setAddress(newAccounts[0]));
  }

  // 监听网络和账户变化
  async networkListening() {
    if (window.ethereum == null || !window.ethereum || !window.ethereum.isMetaMask) {
      return Promise.reject("MetaMask not installed; using read-only defaults");
    } else {
      await (window.ethereum as any).on("chainChanged",async (chainId: any) => {
          if (chainId != toBeHex(TARGET_CHAIN_ID)) {
            console.warn("不是这个网络-清除登录信息并退出");
            store.dispatch(signOut()); //清空redux
          } else {
            console.info("是这个网络-建立连接并重载数据");
          }
        }
      );
      await (window.ethereum as any).on("accountsChanged",async (accounts: string) => {
          console.warn("账户切换...");
          store.dispatch(signOut()); //清空redux
          console.log(accounts); //一旦切换账号这里就会执行
        }
      );
    }
  }

  async connectWallet() {
    if (window.ethereum == null || !window.ethereum || !window.ethereum.isMetaMask) {
      window.open("https://metamask.io/download/", "_blank");
      return Promise.reject("MetaMask not installed; using read-only defaults");
    } else {
      try {
        const currentChainId = await window.ethereum.request({
          method: "eth_chainId",
        });

        console.log('钱包选择链：', currentChainId)
        console.log('目标选择链：', toBeHex(TARGET_CHAIN_ID))

        // 如果当前链不是目标链，则尝试切换
        if (currentChainId !== toBeHex(TARGET_CHAIN_ID)) {
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: toBeHex(TARGET_CHAIN_ID) }],
            });
            this.connectWallet();
          } catch (e) {
            if (e.code === 4902) {
              try {
                await window.ethereum.request({
                  method: "wallet_addEthereumChain",
                  params: [CHAIN_INFO],
                });
                this.connectWallet();
              } catch (addError) {
                console.error("添加链失败:", addError);
                return Promise.reject(`添加链失败:${addError}`);
              }
            } else if (e.code === 4001) {
              console.warn("用户拒绝了网络切换请求");
              return Promise.reject(`用户拒绝了网络切换请求`);
            } else {
              console.error("切换链失败:", e);
              return Promise.reject(`切换链失败:${e}`);
            }
          }
        }

        // 请求连接账户
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // 创建 Ethers.js 的 Web3Provider
        const provider = new ethers.BrowserProvider(window.ethereum);

        // 获取签名者（Signer）
        const signer = await provider.getSigner();

        this.ethereum = window.ethereum;
        this.provider = provider;
        this.signer = signer;

        // 监听事件
        this.ethereum.on("chainChanged", chainWeb3.handleNewChain);
        this.ethereum.on("accountsChanged", chainWeb3.handleNewAccounts);

        if (this.ethereum.chainId) {
          chainWeb3.handleNewChain(this.getChainId());
        }

        console.log(`%cblockNumber%c${await this.getBlockNumber()}`,"background: #00cc00; color: #fff; border-radius: 3px 0 0 3px;padding:2px 5px","background: #1475B2; color: #fff; border-radius: 0 3px 3px 0;padding:2px 5px");

        store.dispatch(setAddress(this.getAccount()));
        store.dispatch(setBalance(await this.getBalance()));

        return Promise.resolve(this.getAccount());
      } catch (connectError) {
        console.error("连接钱包失败:", connectError);
      }
    }
  }

  // 废弃
  async connectNoMetamask(chainId: any) {
    console.log("connectNoMetamask", chainId);
    this.ethereum = {};
    this.ethereum.chainId = chainId;
    chainWeb3.handleNewChain(this.getChainId());
  }

  // 断开连接
  async disconnectWallet() {
    this.ethereum = null;
    this.provider = null;
    this.signer = null;
    store.dispatch(signOut()); //清空redux
  }

  getAccount() {
    return this.ethereum.selectedAddress;
  }

  async getBalance() {
    return this.getAddrBalance(this.getAccount());
  }

  async getAddrBalance(address: string) {
    if (address && address.length > 20) {
      return formatUnits(await this.provider.getBalance(address), 18);
    } else {
      return 0;
    }
  }

  getChainId() {
    return Number(this.ethereum.chainId);
  }

  getEtherscanAddress(address: any) {
    return CHAIN_BROWSER[this.getChainId()] + "/address/" + address;
  }

  getEtherscanTx(tx: any) {
    return CHAIN_BROWSER[this.getChainId()] + "/tx/" + tx;
  }

  getContractAddr(name: any) {
    return ContractsAddr[this.getChainId()][name];
  }

  isZeroAddress(addr: any) {
    return addr == this.ZERO_ADDR;
  }

  async getBlockNumber() {
    return this.provider.getBlockNumber();
  }

  async sign(msg: string) {
    const signature = await this.signer?.signMessage(msg);
    return signature;
  }
}

chainWeb3 = new ChainWeb3();
class Base {
  provider: any;
  contractAbi: any;
  contractName: any;
  contractAddress: any;
  contract: any;
  constructor(provider: any, abi: any, name: any) {
    this.provider = provider;
    this.contractAbi = abi;
    this.contractName = name;
    this.contractAddress = null;
    this.contract = null;
    chainWeb3.registerModule(this);
  }

  initialize() {
    console.log("Base initialize:", this.contractName);
    try {
      this.contractAddress = this.provider.getContractAddr(this.contractName);
      if (this.contractAddress) {
        this.contract = new Contract(
          this.contractAddress,
          this.contractAbi,
          this.provider.signer
        );
      } else {
        console.error(
          "Base initialize contractAddress:",
          this.contractName,
          this.contractAddress
        );
      }
    } catch (e) {
      console.error("Fail to init contract:", this.contractName, e);
    }
  }
  initAfter() {
    console.log("Base initAfter:", this.contractName);
  }
}

//空投合约
class Example extends Base {
  constructor(provider: any) {
    super(provider, ExampleABI, "Example");
  }

  async balanceOf(address: any) {
    try {
      if (address && address.length > 20) {
        return formatUnits(
          await this.contract.balanceOf(address),
          exampleLength
        );
      } else {
        return 0;
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async transfer(address: any, value: any) {
    try {
      const amountFormatted = parseUnits(value, exampleLength);
      const tx = await this.contract.transfer(address, amountFormatted);
      console.log("tx----", tx);
      return await tx.wait();
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

class ChainMain {
  chainWeb3: any;
  Example: any;
  constructor(chainWeb3: any) {
    this.chainWeb3 = chainWeb3;
    this.Example = new Example(this.chainWeb3);
  }
}

export default new ChainMain(chainWeb3);
