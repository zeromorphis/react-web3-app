var HeroLogicABI = [
	{
		inputs: [
			{
				internalType: "address",
				name: "hero721",
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
				indexed: false,
				internalType: "address",
				name: "buyer",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint8",
				name: "quality_box",
				type: "uint8"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "price",
				type: "uint256"
			}
		],
		name: "EventBuyHero",
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
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				components: [
					{
						internalType: "bool",
						name: "opened",
						type: "bool"
					},
					{
						internalType: "uint8",
						name: "quality_box",
						type: "uint8"
					},
					{
						internalType: "uint8",
						name: "quality_hero",
						type: "uint8"
					},
					{
						internalType: "uint8",
						name: "stars",
						type: "uint8"
					},
					{
						internalType: "uint8",
						name: "job",
						type: "uint8"
					},
					{
						internalType: "uint8",
						name: "appearance",
						type: "uint8"
					},
					{
						internalType: "uint8",
						name: "five1",
						type: "uint8"
					},
					{
						internalType: "uint8",
						name: "five2",
						type: "uint8"
					},
					{
						internalType: "uint8",
						name: "five3",
						type: "uint8"
					},
					{
						internalType: "uint8",
						name: "five4",
						type: "uint8"
					},
					{
						internalType: "uint8",
						name: "five5",
						type: "uint8"
					}
				],
				indexed: false,
				internalType: "struct HeroMetaData",
				name: "meta",
				type: "tuple"
			}
		],
		name: "EventOpenHero",
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
				name: "burnTokenId",
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
				name: "fromStars",
				type: "uint8"
			},
			{
				indexed: false,
				internalType: "uint8",
				name: "toStars",
				type: "uint8"
			}
		],
		name: "EventUpHeroStar",
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
		name: "buyHeroBox",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getHeroBoxLimit",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
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
		name: "hero721_",
		outputs: [
			{
				internalType: "contract IHero721",
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
		name: "hero_box_price1_",
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
		name: "hero_box_price2_",
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
		name: "hero_box_price3_",
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
		name: "hero_limit1_",
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
		name: "hero_limit2_",
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
		name: "hero_limit3_",
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
		],
		name: "max_hero_star_",
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
			{
				internalType: "uint256",
				name: "token_id",
				type: "uint256"
			}
		],
		name: "openHero",
		outputs: [
		],
		stateMutability: "nonpayable",
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
				name: "hero721",
				type: "address"
			}
		],
		name: "setHero721",
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
				name: "count",
				type: "uint256"
			},
			{
				internalType: "bool",
				name: "is_reset",
				type: "bool"
			}
		],
		name: "setHeroBoxLimit",
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
		name: "setHeroBoxQualityPrice",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint32",
				name: "max_hero_star",
				type: "uint32"
			}
		],
		name: "setMaxHeroStar",
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
			{
				internalType: "uint256",
				name: "token_id",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "token_id_burn",
				type: "uint256"
			}
		],
		name: "upHeroStar",
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

export default HeroLogicABI;