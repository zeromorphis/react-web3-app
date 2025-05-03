var EquipLogicABI = [
	{
		inputs: [
			{
				internalType: "address",
				name: "equip721",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "buyer",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "price",
				type: "uint256"
			},
			{
				components: [
					{
						internalType: "uint8",
						name: "quality_box",
						type: "uint8"
					},
					{
						internalType: "uint8",
						name: "quality_equip",
						type: "uint8"
					},
					{
						internalType: "uint8",
						name: "level",
						type: "uint8"
					}
				],
				indexed: false,
				internalType: "struct EquipMetaData",
				name: "meta",
				type: "tuple"
			}
		],
		name: "EventBuyEquip",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenid",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "burnTokenId1",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "burnTokenId2",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint8",
				name: "oldLevel",
				type: "uint8"
			},
			{
				indexed: false,
				internalType: "uint8",
				name: "curLevel",
				type: "uint8"
			}
		],
		name: "EventUpLevelEquip",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "OwnershipTransferred",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "uint8",
				name: "quality",
				type: "uint8"
			}
		],
		name: "buyEquipBox",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "equip721_",
		outputs: [
			{
				internalType: "contract IEquip721",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "equip_box_price1_",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "equip_box_price2_",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "equip_box_price3_",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "kill",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "token_id",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "token_id_burn1",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "token_id_burn2",
				type: "uint256"
			}
		],
		name: "levelUpEquip",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "max_equip_level_",
		outputs: [
			{
				internalType: "uint32",
				name: "",
				type: "uint32"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "renounceOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "equip721",
				type: "address"
			}
		],
		name: "setEquip721",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint8",
				name: "quality",
				type: "uint8"
			},
			{
				internalType: "uint256",
				name: "price",
				type: "uint256"
			}
		],
		name: "setEquipBoxQualityPrice",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint32",
				name: "max_level",
				type: "uint32"
			}
		],
		name: "setMaxEquipLevel",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "transferOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "withdraw",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];

export default EquipLogicABI;
