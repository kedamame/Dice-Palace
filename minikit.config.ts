const ROOT_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://dice-palace.vercel.app';

export const minikitConfig = {
  accountAssociation: {
    header: 'TODO_GENERATE_WITH_WARPCAST_MANIFEST_TOOL',
    payload: 'TODO_GENERATE_WITH_WARPCAST_MANIFEST_TOOL',
    signature: 'TODO_GENERATE_WITH_WARPCAST_MANIFEST_TOOL',
  },
  miniapp: {
    version: '1',
    name: 'Dice Palace',
    subtitle: 'Sic Bo on Base',
    description:
      'Classic Sic Bo dice game on Base. Place bets on Big, Small, Sum, Doubles and Triples. Record your best score on-chain.',
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: '#2a2520',
    homeUrl: ROOT_URL,
    primaryCategory: 'games',
    tags: ['sic bo', 'dice', 'casino', 'base', 'onchain'],
    heroImageUrl: `${ROOT_URL}/og-image.png`,
    screenshotUrls: [
      `${ROOT_URL}/screenshot1.png`,
      `${ROOT_URL}/screenshot2.png`,
      `${ROOT_URL}/screenshot3.png`,
    ],
    tagline: 'Roll the Dice on Base',
    ogTitle: 'Dice Palace',
    ogDescription: 'Classic Sic Bo on Base. Bet, roll 3 dice, record your score on-chain.',
    ogImageUrl: `${ROOT_URL}/og-image.png`,
    noindex: false,
    requiredChains: ['eip155:8453'],
    requiredCapabilities: [],
  },
} as const;
