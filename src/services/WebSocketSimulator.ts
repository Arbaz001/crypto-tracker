export class WebSocketSimulator {
  private intervalId: number | null = null;
  private subscribers: ((data: any) => void)[] = [];

  constructor(private updateInterval: number = 2000) {}

  subscribe(callback: (data: any) => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  start() {
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      const assetId = Math.floor(Math.random() * 5) + 1;
      const priceChange = (Math.random() - 0.5) * 0.02; // -1% to +1%
      const volumeChange = (Math.random() - 0.5) * 0.05; // -2.5% to +2.5%

      this.subscribers.forEach(callback => {
        callback({
          type: Math.random() > 0.5 ? 'price' : 'volume',
          data: {
            id: assetId,
            price: priceChange,
            volume: volumeChange
          }
        });
      });
    }, this.updateInterval);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
} 