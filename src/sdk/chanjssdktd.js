import Web3 from "web3";
import HeroLogicABI from "./abi/HeroLogicABI.js";
import Hero721ABI from "./abi/Hero721ABI.js";
import EquipLogicABI from "./abi/EquipLogicABI.js";
import Equip721ABI from "./abi/Equip721ABI.js";
import Hero20ABI from "./abi/Hero20ABI.js";
import HeroMarketABI from "./abi/HeroMarketABI.js";
import EquipMarketABI from "./abi/EquipMarketABI.js";

const CHAIN_RPC = {
	56: 'https://bsc-dataseed.binance.org',
	97: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
};
const CHAIN_BROWSER = {
	56: 'https://bscscan.com',
	97: 'https://testnet.bscscan.com'
};
const ContractsAddr = {
	56: {
		Equip721: '',
		EquipLogic: '',
		Hero20: '',
		Hero721: '',
		HeroLogic: '',
		HeroMarket: '',
		EquipMarket: ''
	},
	97: {
		Equip721: '0xEE58a45042e7422cCd8471E25766BC648FfF704E',
		EquipLogic: '0x215B8CE313716a329f0895d54eB55A3f80268302',
		Hero20: '0x7A308D9dE538C48f6313E98a4f13eA658439b792',
		Hero721: '0x1CAe7B172484cBAc60F98959Bca346977c7C95fe',
		HeroLogic: '0xCBE79571C7025e68f2C47EFa910Ae3E213a37fe0',
		HeroMarket: '0x293e5CD38Be177Bd2100B62748e8EeA8e2a0325E',
		EquipMarket: '0x112fBf413a9A5D9a5E5A6Ea75A5CC81b4C7b5110'
	}
};
const GAS = 500000;

var chainWeb3 = null;

class ChainWeb3 {
	constructor() {
		this.ethereum = null;
		this.web3 = null;
		this.ZERO_ADDR = '0x0000000000000000000000000000000000000000';
		this.apiModules = [];
	}

	registerModule(module) {
		this.apiModules.push(module);
	}

	initModules() {
		console.log('initModules...');

		for (let module of this.apiModules) {
			module.initialize();
		}

		for (let module of this.apiModules) {
			module.initAfter();
		}
	}

	handleNewChain(chainId) {
		console.log('handleNewChain:', chainId);
		chainWeb3.initModules();
	}

	handleNewAccounts(newAccounts) {
		console.log('handleNewAccounts:', newAccounts);
	}

	async connectMetamask() {
		console.log('connectMetamask');

		if (!window.ethereum || !window.ethereum.isMetaMask) {
			console.log('not found Metamask');
			return Promise.reject('not found Metamask');
		} else {
			await window.ethereum.request({
				method: 'eth_requestAccounts'
			});

			if (this.web3) {
				return Promise.resolve(this.getAccount());
			}

			this.ethereum = window.ethereum;
			this.web3 = new Web3(this.ethereum);
			this.ethereum.on('chainChanged', chainWeb3.handleNewChain);
			this.ethereum.on('accountsChanged', chainWeb3.handleNewAccounts);

			if (this.ethereum.chainId) {
				console.log('ethereum chainid', this.getChainId());
				chainWeb3.handleNewChain(this.getChainId());
			}
			console.log(`%cblockNumber%c${await this.getBlockNumber()}`, 'background: #00cc00; color: #fff; border-radius: 3px 0 0 3px;padding:2px 5px', 'background: #1475B2; color: #fff; border-radius: 0 3px 3px 0;padding:2px 5px',)

			return Promise.resolve(this.getAccount());
		}
	}

	async connectNoMetamask(chainId) {
		console.log('connectNoMetamask', chainId);
		this.ethereum = {};
		this.ethereum.chainId = chainId;
		this.web3 = new Web3(CHAIN_RPC[chainId]);
		chainWeb3.handleNewChain(this.getChainId());
	}

	getAccount() {
		return this.ethereum.selectedAddress;
	}

	getBalance() {
		return ethereum.request({ method: "eth_getBalance", params: [this.ethereum.selectedAddress, 'latest'] }).then((balance) => {
			return Web3.utils.fromWei(balance, 'ether');
		});
	}

	getChainId() {
		return Number(this.ethereum.chainId);
	}

	getEtherscanAddress(address) {
		return CHAIN_BROWSER[this.getChainId()] + '/address/' + address;
	}

	getEtherscanTx(tx) {
		return CHAIN_BROWSER[this.getChainId()] + '/tx/' + tx;
	}

	getContractAddr(name) {
		return ContractsAddr[this.getChainId()][name];
	}

	isZeroAddress(addr) {
		return addr == this.ZERO_ADDR;
	}

	async getBlockNumber() {
		return this.web3.eth.getBlockNumber();
	}

	async sign(msg) {
		let hexmsg = this.web3.utils.utf8ToHex(msg);
		return this.web3.eth.sign(hexmsg, this.getAccount());
	}

	verifySignature(msg, signature) {
		return this.web3.eth.accounts.recover(msg, signature);
	}

}

chainWeb3 = new ChainWeb3();
var chainWeb3$1 = chainWeb3;

class Base {
	constructor(provider, abi, name) {
		this.provider = provider;
		this.abi = abi;
		this.name = name;
		this.address = '';
		provider.registerModule(this);
	}

	initialize() {
		console.log('Base initialize:', this.name);

		try {
			this.address = this.provider.getContractAddr(this.name);

			if (this.address) {
				this.contract = new this.provider.web3.eth.Contract(this.abi, this.address);
			} else {
				console.error('Base initialize address:', this.name, this.address);
			}
		} catch (e) {
			console.error('fail to init contract:', this.name, e);
		}
	}

	initAfter() { }

}

class HeroLogic extends Base {
	constructor(provider) {
		super(provider, HeroLogicABI, 'HeroLogic');
	}
	/**
	 * @dev 查询剩余盲盒的数量
	 * @return 3个品质对应的数量，顺序低中高
	 */


	async getHeroBoxLimit() {
		return await this.contract.methods.getHeroBoxLimit().call();
	}
	/**
	 * @dev 查询盲盒的卖价
	 * @return 3个品质对应的价格，顺序低中高
	 */


	async getHeroBoxPrice() {
		try {
			let p1 = await this.contract.methods.hero_box_price1_().call();
			let p2 = await this.contract.methods.hero_box_price2_().call();
			let p3 = await this.contract.methods.hero_box_price3_().call();
			return [Web3.utils.fromWei(p1, 'ether'), Web3.utils.fromWei(p2, 'ether'), Web3.utils.fromWei(p3, 'ether')];
		} catch (e) {
			return Promise.reject(e);
		}
	}
	/**
	 * @dev 购买盲盒
	 * @param {quality 品质(1,2,3),1最差品质,3最好品质}
	 */


	async buyHeroBox(quality) {
		try {
			let price;

			if (quality == 1) {
				price = await this.contract.methods.hero_box_price1_().call();
			} else if (quality == 2) {
				price = await this.contract.methods.hero_box_price2_().call();
			} else if (quality == 3) {
				price = await this.contract.methods.hero_box_price3_().call();
			} else {
				return Promise.reject('buyHeroBox error quality!');
			}

			let gaslimit = await this.contract.methods.buyHeroBox(quality).estimateGas({
				from: this.provider.getAccount(),
				value: price,
				gas: GAS
			});
			gaslimit += 30000;

			if (gaslimit > GAS) {
				gaslimit = GAS;
			}

			return await this.contract.methods.buyHeroBox(quality).send({
				from: this.provider.getAccount(),
				value: price,
				gas: gaslimit
			});
		} catch (e) {
			return Promise.reject(e);
		}
	}
	/**
	 * @dev 开盲盒
	 * @param {token_id 玩家当前拥有的token}
	 */


	async openHero(token_id) {
		let gaslimit = await this.contract.methods.openHero(token_id).estimateGas({
			from: this.provider.getAccount(),
			gas: GAS
		});
		gaslimit += 30000;

		if (gaslimit > GAS) {
			gaslimit = GAS;
		}

		return await this.contract.methods.openHero(token_id).send({
			from: this.provider.getAccount(),
			gas: gaslimit
		});
	}
	/**
	 * @dev 英雄升星,需要两个token具备同品质同星级同职业
	 * @param {token_id 待升星的英雄}
	 * @param {token_id_burn 将要被吃掉的英雄}
	 */


	async upHeroStar(token_id, token_id_burn) {
		let gaslimit = await this.contract.methods.upHeroStar(token_id, token_id_burn).estimateGas({
			from: this.provider.getAccount(),
			gas: GAS
		});
		gaslimit += 30000;

		if (gaslimit > GAS) {
			gaslimit = GAS;
		}

		return await this.contract.methods.upHeroStar(token_id, token_id_burn).send({
			from: this.provider.getAccount(),
			gas: gaslimit
		});
	}
	/**
	 * @dev 管理员接口，查询英雄合约当前的收益
	 */


	async getBalance() {
		try {
			let amount = await this.provider.web3.eth.getBalance(this.address);
			return Web3.utils.fromWei(amount, 'ether');
		} catch (e) {
			return Promise.reject(e);
		}
	}
	/**
	 * @dev 管理员接口，只有合约拥有者才能调用，提币(卖盲盒的收益)
	 */


	async withdraw() {
		let gaslimit = await this.contract.methods.withdraw().estimateGas({
			from: this.provider.getAccount(),
			gas: GAS
		});
		gaslimit += 30000;

		if (gaslimit > GAS) {
			gaslimit = GAS;
		}

		return await this.contract.methods.withdraw().send({
			from: this.provider.getAccount(),
			gas: gaslimit
		});
	}
	/**
	 * @dev 管理员接口，只有合约拥有者才能调用，设置英雄盲盒价格
	 * @param {quality 品质(1,2,3),1最差品质,3最好品质}
	 * @param {price 价格(币安币)}
	 */


	async setHeroBoxQualityPrice(quality, price) {
		let wei_amount = new this.provider.web3.utils.BN(Web3.utils.toWei(String(price), 'ether'));
		let gaslimit = await this.contract.methods.setHeroBoxQualityPrice(quality, wei_amount).estimateGas({
			from: this.provider.getAccount(),
			gas: GAS
		});
		gaslimit += 30000;

		if (gaslimit > GAS) {
			gaslimit = GAS;
		}

		return await this.contract.methods.setHeroBoxQualityPrice(quality, wei_amount).send({
			from: this.provider.getAccount(),
			gas: gaslimit
		});
	}
	/**
	 * @dev 管理员接口，设置盲盒首发或者增发数量
	 * @param {quality 品质(1,2,3),1最差品质,3最好品质}
	 * @param {count 数量}
	 * @param {is_reset 为true时重置合约对应品质的数量，为false时合约内剩余数量+count(增发)}
	 */


	async setHeroBoxLimit(quality, count, is_reset) {
		let gaslimit = await this.contract.methods.setHeroBoxLimit(quality, count, is_reset).estimateGas({
			from: this.provider.getAccount(),
			gas: GAS
		});
		gaslimit += 30000;

		if (gaslimit > GAS) {
			gaslimit = GAS;
		}

		return await this.contract.methods.setHeroBoxLimit(quality, count, is_reset).send({
			from: this.provider.getAccount(),
			gas: gaslimit
		});
	}

	decodeEventBuyHero(receipt) {
		let kv = {
			buyer: receipt.events.EventBuyHero.returnValues.buyer,
			quality_box: receipt.events.EventBuyHero.returnValues.quality_box,
			price: receipt.events.EventBuyHero.returnValues.price,
			tokenid: this.provider.web3.utils.hexToNumber(receipt.events[0].raw.topics[3])
		};
		return kv;
	}

	decodeEventOpenHero(receipt) {
		let kv = {
			tokenid: receipt.events.EventOpenHero.returnValues.tokenid,
			owner: receipt.events.EventOpenHero.returnValues.owner,
			meta: receipt.events.EventOpenHero.returnValues.meta
		};
		return kv;
	}

	decodeEventUpHeroStar(receipt) {
		let kv = {
			tokenid: receipt.events.EventUpHeroStar.returnValues.tokenid,
			burnTokenId: receipt.events.EventUpHeroStar.returnValues.burnTokenId,
			owner: receipt.events.EventUpHeroStar.returnValues.owner,
			fromStars: receipt.events.EventUpHeroStar.returnValues.fromStars,
			toStars: receipt.events.EventUpHeroStar.returnValues.toStars
		};
		return kv;
	}

}

class Hero721 extends Base {
	constructor(provider) {
		super(provider, Hero721ABI, 'Hero721');
	}
	/**
	 * @dev 根据 token id, 查询用户 token 的数量
	 * @param account string 账户地址
	 * @return 币的数量
	 */


	async balanceOf(account) {
		return await this.contract.methods.balanceOf(account).call();
	}
	/**
	 * @dev 查询账户下所有的token
	 * @param {account 账户地址}
	 * @return tokenid数组
	 */


	async getTokens(account) {
		return await this.contract.methods.getTokens(account).call();
	}
	/**
	 * @dev 查询账户下所有的元数据
	 * @param {account 账户地址}
	 * @return tokenid数组,HeroMetaData数组
	 */


	async getMetas(account) {
		return await this.contract.methods.getMetas(account).call();
	}
	/**
	 * @dev 查询单个token元数据
	 * @param {token_id nft id}
	 * @return HeroMetaData
	 */


	async getMeta(token_id) {
		return await this.contract.methods.getMeta(token_id).call();
	}
	/**
	 * @dev 授权市场操作
	 * @param {operator 授权地址}
	 * @param {approved 权限}
	 */


	async setApprovalForAll(operator, approved) {
		let gaslimit = await this.contract.methods.setApprovalForAll(operator, approved).estimateGas({
			from: this.provider.getAccount(),
			gas: GAS
		});
		gaslimit += 30000;

		if (gaslimit > GAS) {
			gaslimit = GAS;
		}

		return await this.contract.methods.setApprovalForAll(operator, approved).send({
			from: this.provider.getAccount(),
			gas: gaslimit
		});
	}
	/**
	 * @dev 授权市场操作
	 * @param {operator 授权地址}
	 * @return bool
	 */


	async isApprovedForAll(operator) {
		return await this.contract.methods.isApprovedForAll(this.provider.getAccount(), operator).call();
	}

}

class EquipLogic extends Base {
	constructor(provider) {
		super(provider, EquipLogicABI, 'EquipLogic');
	}
	/**
	 * @dev 查询盲盒的卖价
	 * @return 3个品质对应的价格，顺序低中高
	 */


	async getEquipBoxPrice() {
		try {
			let p1 = await this.contract.methods.equip_box_price1_().call();
			let p2 = await this.contract.methods.equip_box_price2_().call();
			let p3 = await this.contract.methods.equip_box_price3_().call();
			return [Web3.utils.fromWei(p1, 'ether'), Web3.utils.fromWei(p2, 'ether'), Web3.utils.fromWei(p3, 'ether')];
		} catch (e) {
			return Promise.reject(e);
		}
	}
	/**
	 * @dev 购买装备
	 * @param {quality 品质(1,2,3),1最差品质,3最好品质}
	 */


	async buyEquipBox(quality) {
		try {
			let price;

			if (quality == 1) {
				price = await this.contract.methods.equip_box_price1_().call();
			} else if (quality == 2) {
				price = await this.contract.methods.equip_box_price2_().call();
			} else if (quality == 3) {
				price = await this.contract.methods.equip_box_price3_().call();
			} else {
				return Promise.reject('buyEquipBox error quality!');
			}

			let gaslimit = await this.contract.methods.buyEquipBox(quality).estimateGas({
				from: this.provider.getAccount(),
				value: price,
				gas: GAS
			});
			gaslimit += 30000;

			if (gaslimit > GAS) {
				gaslimit = GAS;
			}

			return await this.contract.methods.buyEquipBox(quality).send({
				from: this.provider.getAccount(),
				value: price,
				gas: gaslimit
			});
		} catch (e) {
			return Promise.reject(e);
		}
	}
	/**
	 * @dev 装备升级(普通材料和相同品质的材料数量需要满足)
	 * @param {token_id 待升级的装备}
	 */


	async levelUpEquip(token_id, token_id_burn1, token_id_burn2) {
		let gaslimit = await this.contract.methods.levelUpEquip(token_id, token_id_burn1, token_id_burn2).estimateGas({
			from: this.provider.getAccount(),
			gas: GAS
		});
		gaslimit += 30000;

		if (gaslimit > GAS) {
			gaslimit = GAS;
		}

		return await this.contract.methods.levelUpEquip(token_id, token_id_burn1, token_id_burn2).send({
			from: this.provider.getAccount(),
			gas: gaslimit
		});
	}
	/**
	 * @dev 管理员接口，查询英雄合约当前的收益
	 */


	async getBalance() {
		try {
			let amount = await this.provider.web3.eth.getBalance(this.address);
			return Web3.utils.fromWei(amount, 'ether');
		} catch (e) {
			return Promise.reject(e);
		}
	}
	/**
	 * @dev 管理员接口，只有合约拥有者才能调用，提币(卖盲盒的收益)
	 */


	async withdraw() {
		let gaslimit = await this.contract.methods.withdraw().estimateGas({
			from: this.provider.getAccount(),
			gas: GAS
		});
		gaslimit += 30000;

		if (gaslimit > GAS) {
			gaslimit = GAS;
		}

		return await this.contract.methods.withdraw().send({
			from: this.provider.getAccount(),
			gas: gaslimit
		});
	}
	/**
	 * @dev 管理员接口，只有合约拥有者才能调用，设置装备盲盒的价格
	 * @param {quality 品质(1,2,3),1最差品质,3最好品质}
	 * @param {price 价格(币安币)}
	 */


	async setEquipBoxQualityPrice(quality, price) {
		let wei_amount = new this.provider.web3.utils.BN(Web3.utils.toWei(String(price), 'ether'));
		let gaslimit = await this.contract.methods.setEquipBoxQualityPrice(quality, wei_amount).estimateGas({
			from: this.provider.getAccount(),
			gas: GAS
		});
		gaslimit += 30000;

		if (gaslimit > GAS) {
			gaslimit = GAS;
		}

		return await this.contract.methods.setEquipBoxQualityPrice(quality, wei_amount).send({
			from: this.provider.getAccount(),
			gas: gaslimit
		});
	}

	decodeEventBuyEquip(receipt) {
		let kv = {
			buyer: receipt.events.EventBuyEquip.returnValues.buyer,
			price: receipt.events.EventBuyEquip.returnValues.price,
			meta: receipt.events.EventBuyEquip.returnValues.meta,
			tokenid: this.provider.web3.utils.hexToNumber(receipt.events[0].raw.topics[3])
		};
		return kv;
	}

	decodeEventUpLevelEquip(receipt) {
		let kv = {
			tokenid: receipt.events.EventUpLevelEquip.returnValues.tokenid,
			burnTokenId1: receipt.events.EventUpLevelEquip.returnValues.burnTokenId1,
			burnTokenId2: receipt.events.EventUpLevelEquip.returnValues.burnTokenId2,
			owner: receipt.events.EventUpLevelEquip.returnValues.owner,
			oldLevel: receipt.events.EventUpLevelEquip.returnValues.oldLevel,
			curLevel: receipt.events.EventUpLevelEquip.returnValues.curLevel
		};
		return kv;
	}

}

class Equip721 extends Base {
	constructor(provider) {
		super(provider, Equip721ABI, 'Equip721');
	}
	/**
	 * @dev 根据 token id, 查询用户 token 的数量
	 * @param account string 账户地址
	 * @return 币的数量
	 */


	async balanceOf(account) {
		return await this.contract.methods.balanceOf(account).call();
	}
	/**
	 * @dev 查询账户下所有的token
	 * @param {account 账户地址}
	 * @return tokenid数组
	 */


	async getTokens(account) {
		return await this.contract.methods.getTokens(account).call();
	}
	/**
	 * @dev 查询账户下所有的元数据
	 * @param {account 账户地址}
	 * @return tokenid数组,EquipMetaData
	 */


	async getMetas(account) {
		return await this.contract.methods.getMetas(account).call();
	}
	/**
	 * @dev 查询单个token元数据
	 * @param {token_id nft id}
	 * @return EquipMetaData
	 */


	async getMeta(token_id) {
		return await this.contract.methods.getMeta(token_id).call();
	}
	/**
	 * @dev 授权市场操作
	 * @param {operator 授权地址}
	 * @param {approved 权限}
	 */


	async setApprovalForAll(operator, approved) {
		let gaslimit = await this.contract.methods.setApprovalForAll(operator, approved).estimateGas({
			from: this.provider.getAccount(),
			gas: GAS
		});
		gaslimit += 30000;

		if (gaslimit > GAS) {
			gaslimit = GAS;
		}

		return await this.contract.methods.setApprovalForAll(operator, approved).send({
			from: this.provider.getAccount(),
			gas: gaslimit
		});
	}
	/**
	 * @dev 授权市场操作
	 * @param {operator 授权地址}
	 * @return bool
	 */


	async isApprovedForAll(operator) {
		return await this.contract.methods.isApprovedForAll(this.provider.getAccount(), operator).call();
	}

}

class Hero20 extends Base {
	constructor(provider) {
		super(provider, Hero20ABI, 'Hero20');
	}
	/**
	 * @dev 根据 token id, 查询用户 token 的数量
	 * @param account string 账户地址
	 * @return 币的数量
	 */


	async balanceOf(account) {
		try {
			let amount = await this.contract.methods.balanceOf(account).call();
			return Web3.utils.fromWei(amount, 'ether');
		} catch (e) {
			return Promise.reject(e);
		}
	}
	/**
	 * @dev 管理员用户调用，给玩家提币
	 * @param account string 账户地址
	 * @param amount 数量
	 */


	async mintTo(account, amount) {
		let wei_amount = new this.provider.web3.utils.BN(Web3.utils.toWei(String(amount), 'ether'));
		let gaslimit = await this.contract.methods.mintTo(account, wei_amount).estimateGas({
			from: this.provider.getAccount(),
			gas: GAS
		});
		gaslimit += 30000;

		if (gaslimit > GAS) {
			gaslimit = GAS;
		}

		return await this.contract.methods.mintTo(account, wei_amount).send({
			from: this.provider.getAccount(),
			gas: gaslimit
		});
	}

}

class HeroMarket extends Base {
	constructor(provider) {
		super(provider, HeroMarketABI, 'HeroMarket');
	}
	/**
	 * @dev 发布商品
	 * @param {token_id 英雄token}
	 * @param {price 售价}
	 */


	async put(token_id, price) {
		let wei_amount = new this.provider.web3.utils.BN(Web3.utils.toWei(String(price), 'ether'));
		let gaslimit = await this.contract.methods.put(token_id, wei_amount).estimateGas({
			from: this.provider.getAccount(),
			gas: GAS
		});
		gaslimit += 30000;

		if (gaslimit > GAS) {
			gaslimit = GAS;
		}

		return await this.contract.methods.put(token_id, wei_amount).send({
			from: this.provider.getAccount(),
			gas: gaslimit
		});
	}
	/**
	 * @dev 删除商品
	 * @param {token_id 英雄token}
	 */


	async del(token_id) {
		let gaslimit = await this.contract.methods.del(token_id).estimateGas({
			from: this.provider.getAccount(),
			gas: GAS
		});
		gaslimit += 30000;

		if (gaslimit > GAS) {
			gaslimit = GAS;
		}

		return await this.contract.methods.del(token_id).send({
			from: this.provider.getAccount(),
			gas: gaslimit
		});
	}
	/**
	 * @dev 改价商品
	 * @param {token_id 英雄token}
	 * @param {price 新售价}
	 */


	async change(token_id, price) {
		let wei_amount = new this.provider.web3.utils.BN(Web3.utils.toWei(String(price), 'ether'));
		let gaslimit = await this.contract.methods.change(token_id, wei_amount).estimateGas({
			from: this.provider.getAccount(),
			gas: GAS
		});
		gaslimit += 30000;

		if (gaslimit > GAS) {
			gaslimit = GAS;
		}

		return await this.contract.methods.change(token_id, wei_amount).send({
			from: this.provider.getAccount(),
			gas: gaslimit
		});
	}
	/**
	 * @dev 购买商品
	 * @param {token_id 英雄token}
	 */


	async buy(token_id) {
		try {
			let price = await this.contract.methods.getItemPrice(token_id).call();
			let gaslimit = await this.contract.methods.buy(token_id).estimateGas({
				from: this.provider.getAccount(),
				value: price,
				gas: GAS
			});
			gaslimit += 30000;

			if (gaslimit > GAS) {
				gaslimit = GAS;
			}

			return await this.contract.methods.buy(token_id).send({
				from: this.provider.getAccount(),
				value: price,
				gas: gaslimit
			});
		} catch (e) {
			return Promise.reject(e);
		}
	}
	/**
	 * @dev 获取商品列表
	 * @param {index 索引从0开始}
	 * @param {num 数量}
	 */


	async getItems(index, num) {
		return await this.contract.methods.getItems(index, num).call();
	}
	/**
	 * @dev 获取商品列表
	 * @param {index 索引从0开始}
	 * @param {num 数量}
	 */


	async getMyItems() {
		return await this.contract.methods.getMyItems(this.provider.getAccount()).call();
	}
	/**
	 * @dev 管理员接口，只有合约拥有者才能调用，提币(卖盲盒的收益)
	 */


	async withdraw() {
		let gaslimit = await this.contract.methods.withdraw().estimateGas({
			from: this.provider.getAccount(),
			gas: GAS
		});
		gaslimit += 30000;

		if (gaslimit > GAS) {
			gaslimit = GAS;
		}

		return await this.contract.methods.withdraw().send({
			from: this.provider.getAccount(),
			gas: gaslimit
		});
	}

}

class EquipMarket extends Base {
	constructor(provider) {
		super(provider, EquipMarketABI, 'EquipMarket');
	}
	/**
	 * @dev 发布商品
	 * @param {token_id 英雄token}
	 * @param {price 售价}
	 */


	async put(token_id, price) {
		let wei_amount = new this.provider.web3.utils.BN(Web3.utils.toWei(String(price), 'ether'));
		let gaslimit = await this.contract.methods.put(token_id, wei_amount).estimateGas({
			from: this.provider.getAccount(),
			gas: GAS
		});
		gaslimit += 30000;

		if (gaslimit > GAS) {
			gaslimit = GAS;
		}

		return await this.contract.methods.put(token_id, wei_amount).send({
			from: this.provider.getAccount(),
			gas: gaslimit
		});
	}
	/**
	 * @dev 删除商品
	 * @param {token_id 英雄token}
	 */


	async del(token_id) {
		let gaslimit = await this.contract.methods.del(token_id).estimateGas({
			from: this.provider.getAccount(),
			gas: GAS
		});
		gaslimit += 30000;

		if (gaslimit > GAS) {
			gaslimit = GAS;
		}

		return await this.contract.methods.del(token_id).send({
			from: this.provider.getAccount(),
			gas: gaslimit
		});
	}
	/**
	 * @dev 改价商品
	 * @param {token_id 英雄token}
	 * @param {price 新售价}
	 */


	async change(token_id, price) {
		let wei_amount = new this.provider.web3.utils.BN(Web3.utils.toWei(String(price), 'ether'));
		let gaslimit = await this.contract.methods.change(token_id, wei_amount).estimateGas({
			from: this.provider.getAccount(),
			gas: GAS
		});
		gaslimit += 30000;

		if (gaslimit > GAS) {
			gaslimit = GAS;
		}

		return await this.contract.methods.change(token_id, wei_amount).send({
			from: this.provider.getAccount(),
			gas: gaslimit
		});
	}
	/**
	 * @dev 购买商品
	 * @param {token_id 英雄token}
	 */


	async buy(token_id) {
		try {
			let price = await this.contract.methods.getItemPrice(token_id).call();
			let gaslimit = await this.contract.methods.buy(token_id).estimateGas({
				from: this.provider.getAccount(),
				value: price,
				gas: GAS
			});
			gaslimit += 30000;

			if (gaslimit > GAS) {
				gaslimit = GAS;
			}

			return await this.contract.methods.buy(token_id).send({
				from: this.provider.getAccount(),
				value: price,
				gas: gaslimit
			});
		} catch (e) {
			return Promise.reject(e);
		}
	}
	/**
	 * @dev 获取商品列表
	 * @param {index 索引从0开始}
	 * @param {num 数量}
	 */


	async getItems(index, num) {
		return await this.contract.methods.getItems(index, num).call();
	}
	/**
	 * @dev 获取商品列表
	 * @param {index 索引从0开始}
	 * @param {num 数量}
	 */


	async getMyItems() {
		return await this.contract.methods.getMyItems(this.provider.getAccount()).call();
	}
	/**
	 * @dev 管理员接口，只有合约拥有者才能调用，提币(卖盲盒的收益)
	 */


	async withdraw() {
		let gaslimit = await this.contract.methods.withdraw().estimateGas({
			from: this.provider.getAccount(),
			gas: GAS
		});
		gaslimit += 30000;

		if (gaslimit > GAS) {
			gaslimit = GAS;
		}

		return await this.contract.methods.withdraw().send({
			from: this.provider.getAccount(),
			gas: gaslimit
		});
	}

}

class ChainMain {
	constructor(chainWeb3) {
		this.chainWeb3 = chainWeb3;
		this.HeroLogic = new HeroLogic(this.chainWeb3);
		this.Hero721 = new Hero721(this.chainWeb3);
		this.EquipLogic = new EquipLogic(this.chainWeb3);
		this.Equip721 = new Equip721(this.chainWeb3);
		this.Hero20 = new Hero20(this.chainWeb3);
		this.HeroMarket = new HeroMarket(this.chainWeb3);
		this.EquipMarket = new EquipMarket(this.chainWeb3);
	}
}

var chainApi = new ChainMain(chainWeb3$1);

export default chainApi

