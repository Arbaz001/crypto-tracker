import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CryptoState, CryptoAsset } from '../types/crypto';

const initialState: CryptoState = {
  assets: [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
      price: 93759.48,
      change1h: 0.43,
      change24h: 0.93,
      change7d: 11.11,
      marketCap: 1861618902186,
      volume24h: 43874950947,
      circulatingSupply: 19.85,
      maxSupply: 21,
      chartData: [45000, 46000, 47000, 48000, 49000, 50000, 51000]
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
      price: 1802.46,
      change1h: 0.60,
      change24h: 3.21,
      change7d: 13.68,
      marketCap: 217581279327,
      volume24h: 23547469307,
      circulatingSupply: 120.71,
      maxSupply: null,
      chartData: [2800, 2900, 3000, 3100, 3200, 3300, 3400]
    },
    {
      id: 3,
      name: 'Tether',
      symbol: 'USDT',
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
      price: 1.00,
      change1h: 0.00,
      change24h: 0.00,
      change7d: 0.04,
      marketCap: 145320022085,
      volume24h: 92288882007,
      circulatingSupply: 145.27,
      maxSupply: null,
      chartData: [1, 1, 1, 1, 1, 1, 1]
    },
    {
      id: 4,
      name: 'XRP',
      symbol: 'XRP',
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/52.png',
      price: 2.22,
      change1h: 0.46,
      change24h: 0.54,
      change7d: 6.18,
      marketCap: 130073814966,
      volume24h: 5131481491,
      circulatingSupply: 58.39,
      maxSupply: 100,
      chartData: [0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1]
    },
    {
      id: 5,
      name: 'BNB',
      symbol: 'BNB',
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
      price: 606.65,
      change1h: 0.09,
      change24h: -1.20,
      change7d: 3.73,
      marketCap: 85471956947,
      volume24h: 1874281784,
      circulatingSupply: 140.89,
      maxSupply: 200,
      chartData: [300, 310, 320, 330, 340, 350, 360]
    }
  ],
  loading: false,
  error: null
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateAssetPrice: (state, action: PayloadAction<{ id: number; price: number }>) => {
      const asset = state.assets.find(a => a.id === action.payload.id);
      if (asset) {
        const oldPrice = asset.price;
        asset.price = action.payload.price;
        asset.change1h = ((action.payload.price - oldPrice) / oldPrice) * 100;
      }
    },
    updateAssetVolume: (state, action: PayloadAction<{ id: number; volume: number }>) => {
      const asset = state.assets.find(a => a.id === action.payload.id);
      if (asset) {
        asset.volume24h = action.payload.volume;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { updateAssetPrice, updateAssetVolume, setLoading, setError } = cryptoSlice.actions;
export default cryptoSlice.reducer; 