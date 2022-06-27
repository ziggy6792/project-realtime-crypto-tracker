/* eslint-disable @typescript-eslint/no-explicit-any */
import { client as WebSocketClient, connection as Connection } from 'websocket';

enum WsEventType {
  PRICE_UPDATE = '5',
  HEARTBEAT = '999',
}

interface WsBaseEvent {
  TYPE: WsEventType;
}

interface HeartbeatWsEvent extends WsBaseEvent {
  TYPE: WsEventType.HEARTBEAT;
  MESSAGE: string;
  TIMEMS: number;
}

export interface PriceUpdateWsEvent {
  TYPE: WsEventType.PRICE_UPDATE;
  MARKET: string;
  FROMSYMBOL: string;
  TOSYMBOL: string;
  FLAGS: number;
  PRICE?: number;
  LASTUPDATE: number;
  MEDIAN: number;
  LASTVOLUME: number;
  LASTVOLUMETO: number;
  LASTTRADEID: string;
  VOLUMEDAY: number;
  VOLUMEDAYTO: number;
  VOLUME24HOUR: number;
  VOLUME24HOURTO: number;
  LASTMARKET: string;
  VOLUMEHOUR: number;
  VOLUMEHOURTO: number;
  TOPTIERVOLUME24HOUR: number;
  TOPTIERVOLUME24HOURTO: number;
  CURRENTSUPPLYMKTCAP: number;
  CIRCULATINGSUPPLYMKTCAP: number;
  MAXSUPPLYMKTCAP: number;
}

export type WsEvent = PriceUpdateWsEvent | HeartbeatWsEvent;

let connection: Connection;

const getConnection = (connectionString: string) =>
  new Promise((resolve, rejeect) => {
    const client = new WebSocketClient();
    client.connect(connectionString);
    client.on('connect', (connection) => {
      console.log('WebSocket Client Connected');
      resolve(connection);
    });
    client.on('connectFailed', (error) => {
      console.log(`Connect Error: ${error.toString()}`);
      rejeect(error);
    });
  }) as Promise<Connection>;

// ToDo: Provie types for process.env
const API_KEY = process.env.API_CRYPTOCOMPARE_API_KEY;

interface ISetupConnectionArgs {
  onUpdatePrice: (data: PriceUpdateWsEvent) => void;
  subsciptions?: string[];
}

export const setupConnection = async ({ onUpdatePrice, subsciptions = ['5~CCCAGG~BTC~USD', '5~CCCAGG~ETH~USD'] }: ISetupConnectionArgs) => {
  connection = await getConnection(`${process.env.API_CRYPTOCOMPARE_WS_URL}?api_key=${API_KEY}`);

  connection.on('error', (error) => {
    console.log(`Connection Error: ${error.toString()}`);
  });
  connection.on('close', () => {
    console.log('Connection Closed');
  });
  connection.on('message', (message) => {
    if (message.type === 'utf8') {
      const data = JSON.parse(message.utf8Data) as WsEvent;
      if (data.TYPE === WsEventType.PRICE_UPDATE) {
        // I'm not sure why but sometimes update happens with no price
        if (data.PRICE) {
          onUpdatePrice(data);
        }
      }
    }
  });

  // Subscribe
  if (connection.connected) {
    connection.sendUTF(
      JSON.stringify({
        action: 'SubAdd',
        subs: subsciptions,
      })
    );
  }
};

export const closeConnection = () => {
  connection.close();
};
