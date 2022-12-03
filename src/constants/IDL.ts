export type Plege = {
  version: "0.1.0";
  name: "plege";
  instructions: [
    {
      name: "createUser";
      accounts: [
        {
          name: "userMeta";
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: "const";
                type: "string";
                value: "USER_META";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "auth";
              }
            ];
          };
        },
        {
          name: "auth";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "createApp";
      accounts: [
        {
          name: "app";
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: "const";
                type: "string";
                value: "APP";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "auth";
              },
              {
                kind: "arg";
                type: "u8";
                path: "app_id";
              }
            ];
          };
        },
        {
          name: "userMeta";
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: "const";
                type: "string";
                value: "USER_META";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "auth";
              }
            ];
          };
        },
        {
          name: "auth";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "appId";
          type: "u8";
        },
        {
          name: "name";
          type: "string";
        }
      ];
    },
    {
      name: "createTier";
      accounts: [
        {
          name: "tier";
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: "const";
                type: "string";
                value: "SUBSCRIPTION_TIER";
              },
              {
                kind: "account";
                type: "publicKey";
                account: "App";
                path: "app";
              },
              {
                kind: "arg";
                type: "u8";
                path: "tier_id";
              }
            ];
          };
        },
        {
          name: "app";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "tierId";
          type: "u8";
        },
        {
          name: "name";
          type: "string";
        },
        {
          name: "price";
          type: "u64";
        },
        {
          name: "interval";
          type: {
            defined: "Interval";
          };
        }
      ];
    },
    {
      name: "createSubscription";
      accounts: [
        {
          name: "app";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tier";
          isMut: true;
          isSigner: false;
        },
        {
          name: "subscription";
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: "const";
                type: "string";
                value: "SUBSCRIPTION";
              },
              {
                kind: "account";
                type: "publicKey";
                account: "App";
                path: "app";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "subscriber";
              }
            ];
          };
        },
        {
          name: "subscriber";
          isMut: true;
          isSigner: true;
        },
        {
          name: "subscriberAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "cancelSubscription";
      accounts: [
        {
          name: "app";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tier";
          isMut: true;
          isSigner: false;
        },
        {
          name: "subscription";
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: "const";
                type: "string";
                value: "SUBSCRIPTION";
              },
              {
                kind: "account";
                type: "publicKey";
                account: "App";
                path: "app";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "subscriber";
              }
            ];
          };
        },
        {
          name: "subscriber";
          isMut: true;
          isSigner: true;
        },
        {
          name: "subscriberAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "completePayment";
      accounts: [
        {
          name: "subscription";
          isMut: true;
          isSigner: false;
        },
        {
          name: "app";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tier";
          isMut: true;
          isSigner: false;
        },
        {
          name: "owner";
          isMut: true;
          isSigner: false;
        },
        {
          name: "subscriberAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "app";
      type: {
        kind: "struct";
        fields: [
          {
            name: "auth";
            type: "publicKey";
          },
          {
            name: "name";
            type: "string";
          },
          {
            name: "numTiers";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "subscription";
      type: {
        kind: "struct";
        fields: [
          {
            name: "status";
            type: {
              defined: "SubscriptionStatus";
            };
          },
          {
            name: "app";
            type: "publicKey";
          },
          {
            name: "tier";
            type: "publicKey";
          },
          {
            name: "subscriber";
            type: "publicKey";
          },
          {
            name: "start";
            type: "i64";
          },
          {
            name: "amountPaid";
            type: "u64";
          },
          {
            name: "active";
            type: "bool";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "canceledSubscription";
      type: {
        kind: "struct";
        fields: [];
      };
    },
    {
      name: "tier";
      type: {
        kind: "struct";
        fields: [
          {
            name: "app";
            type: "publicKey";
          },
          {
            name: "name";
            type: "string";
          },
          {
            name: "mint";
            type: "publicKey";
          },
          {
            name: "price";
            type: "u64";
          },
          {
            name: "interval";
            type: {
              defined: "Interval";
            };
          }
        ];
      };
    },
    {
      name: "userMeta";
      type: {
        kind: "struct";
        fields: [
          {
            name: "auth";
            type: "publicKey";
          },
          {
            name: "numApps";
            type: "u8";
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "TierCreationError";
      type: {
        kind: "enum";
        variants: [
          {
            name: "InvalidTierId";
          }
        ];
      };
    },
    {
      name: "SubscriptionStatus";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Active";
          },
          {
            name: "Canceled";
          }
        ];
      };
    },
    {
      name: "Interval";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Month";
          },
          {
            name: "Year";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "InvalidAppId";
      msg: "Invalid App ID";
    }
  ];
};

export const IDL: Plege = {
  version: "0.1.0",
  name: "plege",
  instructions: [
    {
      name: "createUser",
      accounts: [
        {
          name: "userMeta",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "USER_META",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "auth",
              },
            ],
          },
        },
        {
          name: "auth",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "createApp",
      accounts: [
        {
          name: "app",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "APP",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "auth",
              },
              {
                kind: "arg",
                type: "u8",
                path: "app_id",
              },
            ],
          },
        },
        {
          name: "userMeta",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "USER_META",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "auth",
              },
            ],
          },
        },
        {
          name: "auth",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "appId",
          type: "u8",
        },
        {
          name: "name",
          type: "string",
        },
      ],
    },
    {
      name: "createTier",
      accounts: [
        {
          name: "tier",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "SUBSCRIPTION_TIER",
              },
              {
                kind: "account",
                type: "publicKey",
                account: "App",
                path: "app",
              },
              {
                kind: "arg",
                type: "u8",
                path: "tier_id",
              },
            ],
          },
        },
        {
          name: "app",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "tierId",
          type: "u8",
        },
        {
          name: "name",
          type: "string",
        },
        {
          name: "price",
          type: "u64",
        },
        {
          name: "interval",
          type: {
            defined: "Interval",
          },
        },
      ],
    },
    {
      name: "createSubscription",
      accounts: [
        {
          name: "app",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tier",
          isMut: true,
          isSigner: false,
        },
        {
          name: "subscription",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "SUBSCRIPTION",
              },
              {
                kind: "account",
                type: "publicKey",
                account: "App",
                path: "app",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "subscriber",
              },
            ],
          },
        },
        {
          name: "subscriber",
          isMut: true,
          isSigner: true,
        },
        {
          name: "subscriberAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "cancelSubscription",
      accounts: [
        {
          name: "app",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tier",
          isMut: true,
          isSigner: false,
        },
        {
          name: "subscription",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "SUBSCRIPTION",
              },
              {
                kind: "account",
                type: "publicKey",
                account: "App",
                path: "app",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "subscriber",
              },
            ],
          },
        },
        {
          name: "subscriber",
          isMut: true,
          isSigner: true,
        },
        {
          name: "subscriberAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "completePayment",
      accounts: [
        {
          name: "subscription",
          isMut: true,
          isSigner: false,
        },
        {
          name: "app",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tier",
          isMut: true,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: true,
          isSigner: false,
        },
        {
          name: "subscriberAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "app",
      type: {
        kind: "struct",
        fields: [
          {
            name: "auth",
            type: "publicKey",
          },
          {
            name: "name",
            type: "string",
          },
          {
            name: "numTiers",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "subscription",
      type: {
        kind: "struct",
        fields: [
          {
            name: "status",
            type: {
              defined: "SubscriptionStatus",
            },
          },
          {
            name: "app",
            type: "publicKey",
          },
          {
            name: "tier",
            type: "publicKey",
          },
          {
            name: "subscriber",
            type: "publicKey",
          },
          {
            name: "start",
            type: "i64",
          },
          {
            name: "amountPaid",
            type: "u64",
          },
          {
            name: "active",
            type: "bool",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "canceledSubscription",
      type: {
        kind: "struct",
        fields: [],
      },
    },
    {
      name: "tier",
      type: {
        kind: "struct",
        fields: [
          {
            name: "app",
            type: "publicKey",
          },
          {
            name: "name",
            type: "string",
          },
          {
            name: "mint",
            type: "publicKey",
          },
          {
            name: "price",
            type: "u64",
          },
          {
            name: "interval",
            type: {
              defined: "Interval",
            },
          },
        ],
      },
    },
    {
      name: "userMeta",
      type: {
        kind: "struct",
        fields: [
          {
            name: "auth",
            type: "publicKey",
          },
          {
            name: "numApps",
            type: "u8",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "TierCreationError",
      type: {
        kind: "enum",
        variants: [
          {
            name: "InvalidTierId",
          },
        ],
      },
    },
    {
      name: "SubscriptionStatus",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Active",
          },
          {
            name: "Canceled",
          },
        ],
      },
    },
    {
      name: "Interval",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Month",
          },
          {
            name: "Year",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "InvalidAppId",
      msg: "Invalid App ID",
    },
  ],
};
