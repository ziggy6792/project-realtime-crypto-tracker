/* eslint-disable @typescript-eslint/no-explicit-any */
import { client as WebSocketClient, connection as Connection } from 'websocket';
import { ee } from './events';

export interface Price {
  TYPE: string;
  MARKET: string;
  FROMSYMBOL: string;
  TOSYMBOL: string;
  FLAGS: number;
  PRICE: number;
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

const API_KEY = '803c94d04602d67745b502400692d6d662240a7f37e5c7e9d72b64f74d3dd133';

export const setupConnection = async () => {
  // client.connect(`wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`);

  connection = await getConnection(`wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`);

  connection.on('error', (error) => {
    console.log(`Connection Error: ${error.toString()}`);
  });
  connection.on('close', () => {
    console.log('echo-protocol Connection Closed');
  });
  connection.on('message', (message) => {
    if (message.type === 'utf8') {
      console.log(`Received: '${message.utf8Data}'`);
      const data = JSON.parse(message.utf8Data) as Price;
      ee.emit('updatePrice', data);
    }
  });

  const subscribe = () => {
    if (connection.connected) {
      connection.sendUTF(
        JSON.stringify({
          action: 'SubAdd',
          subs: ['5~CCCAGG~BTC~USD'],
        })
      );
    }
  };
  subscribe();

  // client.removeAllListeners();

  // client.removeAllListeners();
  // client;
};

export const closeConnection = () => {
  connection.close();
};
