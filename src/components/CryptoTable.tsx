import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { RootState } from '../store/store';
import { updateAssetPrice, updateAssetVolume } from '../store/cryptoSlice';
import { WebSocketSimulator } from '../services/WebSocketSimulator';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const formatNumber = (num: number, decimals: number = 2): string => {
  if (num >= 1e9) return `$${(num / 1e9).toFixed(decimals)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(decimals)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(decimals)}K`;
  return `$${num.toFixed(decimals)}`;
};

const getChangeColor = (value: number): string => {
  return value > 0 ? '#16c784' : value < 0 ? '#ea3943' : 'inherit';
};

const getGradientId = (id: number, isPositive: boolean): string => {
  return `gradient-${id}-${isPositive ? 'positive' : 'negative'}`;
};

const CryptoTable: React.FC = () => {
  const dispatch = useDispatch();
  const assets = useSelector((state: RootState) => state.crypto.assets);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const ws = new WebSocketSimulator();
    
    const unsubscribe = ws.subscribe((message) => {
      const { type, data } = message;
      if (type === 'price') {
        const asset = assets.find(a => a.id === data.id);
        if (asset) {
          dispatch(updateAssetPrice({
            id: data.id,
            price: asset.price * (1 + data.price)
          }));
        }
      } else if (type === 'volume') {
        const asset = assets.find(a => a.id === data.id);
        if (asset) {
          dispatch(updateAssetVolume({
            id: data.id,
            volume: asset.volume24h * (1 + data.volume)
          }));
        }
      }
    });

    ws.start();
    return () => {
      ws.stop();
      unsubscribe();
    };
  }, [dispatch, assets]);

  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        width: '100%',
        height: '100%',
        borderRadius: 0,
        overflowX: 'auto',
        '& .MuiTableCell-root': {
          px: isMobile ? 1 : 1.5,
          py: isMobile ? 1.5 : 2.5,
          fontSize: isMobile ? '0.8rem' : '0.95rem'
        }
      }}
    >
      <Table sx={{ tableLayout: 'fixed', minWidth: isMobile ? 600 : '100%' }}>
        <TableHead>
          <TableRow>
            <TableCell width={isMobile ? "10%" : "3%"} sx={{ fontWeight: 600 }}>#</TableCell>
            <TableCell width={isMobile ? "30%" : "17%"} sx={{ fontWeight: 600 }}>Name</TableCell>
            <TableCell width={isMobile ? "20%" : "10%"} align="right" sx={{ fontWeight: 600 }}>Price</TableCell>
            {!isMobile && (
              <>
                <TableCell width="6%" align="right" sx={{ fontWeight: 600 }}>1h %</TableCell>
                <TableCell width="6%" align="right" sx={{ fontWeight: 600 }}>24h %</TableCell>
              </>
            )}
            <TableCell width={isMobile ? "20%" : "6%"} align="right" sx={{ fontWeight: 600 }}>7d %</TableCell>
            {!isTablet && (
              <>
                <TableCell width="13%" align="right" sx={{ fontWeight: 600 }}>Market Cap</TableCell>
                <TableCell width="13%" align="right" sx={{ fontWeight: 600 }}>Volume(24h)</TableCell>
                <TableCell width="13%" align="right" sx={{ fontWeight: 600 }}>Circulating Supply</TableCell>
              </>
            )}
            {!isMobile && (
              <TableCell width="13%" align="right" sx={{ fontWeight: 600 }}>Last 7 Days</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {assets.map((asset) => (
            <TableRow 
              key={asset.id} 
              sx={{ 
                height: isMobile ? '60px' : '72px',
                '&:hover': { backgroundColor: '#f8f9fa' }
              }}
            >
              <TableCell sx={{ fontWeight: 500 }}>{asset.id}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <img src={asset.logo} alt={asset.name} style={{ width: isMobile ? 20 : 26, height: isMobile ? 20 : 26 }} />
                  <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '0.8rem' : 'inherit' }}>{asset.name}</Typography>
                  <Typography color="text.secondary" variant="body2" sx={{ ml: 0.5, fontSize: isMobile ? '0.7rem' : 'inherit' }}>
                    {asset.symbol}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 500 }}>{formatNumber(asset.price)}</TableCell>
              {!isMobile && (
                <>
                  <TableCell align="right" sx={{ color: getChangeColor(asset.change1h), fontWeight: 500 }}>
                    {asset.change1h.toFixed(2)}%
                  </TableCell>
                  <TableCell align="right" sx={{ color: getChangeColor(asset.change24h), fontWeight: 500 }}>
                    {asset.change24h.toFixed(2)}%
                  </TableCell>
                </>
              )}
              <TableCell align="right" sx={{ color: getChangeColor(asset.change7d), fontWeight: 500 }}>
                {asset.change7d.toFixed(2)}%
              </TableCell>
              {!isTablet && (
                <>
                  <TableCell align="right" sx={{ fontWeight: 500 }}>{formatNumber(asset.marketCap)}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 500 }}>{formatNumber(asset.volume24h)}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 500 }}>
                    {asset.circulatingSupply.toFixed(2)} {asset.symbol}
                  </TableCell>
                </>
              )}
              {!isMobile && (
                <TableCell align="right">
                  <ResponsiveContainer width="100%" height={40}>
                    <AreaChart data={asset.chartData.map((value) => ({ value }))}
                      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient 
                          id={getGradientId(asset.id, asset.change7d >= 0)} 
                          x1="0" 
                          y1="0" 
                          x2="0" 
                          y2="1"
                        >
                          <stop 
                            offset="0%" 
                            stopColor={getChangeColor(asset.change7d)} 
                            stopOpacity={0.1}
                          />
                          <stop 
                            offset="100%" 
                            stopColor={getChangeColor(asset.change7d)} 
                            stopOpacity={0.01}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        type="natural"
                        dataKey="value"
                        stroke={getChangeColor(asset.change7d)}
                        strokeWidth={1.2}
                        fill={`url(#${getGradientId(asset.id, asset.change7d >= 0)})`}
                        isAnimationActive={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CryptoTable; 