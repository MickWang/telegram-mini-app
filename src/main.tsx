import React from "react";
import ReactDOM from "react-dom/client";

// Redux
import { Provider } from "react-redux";
import { store } from "./redux/store";

// TonConnect UI
import { TonConnectUIProvider } from "@tonconnect/ui-react";

// Rainbow Kit
import "./polyfills";

import { createWalletConnectModal } from "./configs/walletConnect";

// Telegram Mini App SDK
import WebApp from "@twa-dev/sdk";

// App + Styles
import App from "./App";
import "./index.css";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
// Hide the main button
WebApp.MainButton.hide();
// Expand the Telegram Mini App to full screen
WebApp.expand();
// Initialize the Telegram Mini App SDK
WebApp.ready();
// Enable the closing confirmation
WebApp.enableClosingConfirmation();

// Create the WalletConnect modal
createWalletConnectModal();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const network = "mainnet-beta";
const wallets = [new PhantomWalletAdapter()];

const endpoint =
  "https://young-clean-leaf.solana-mainnet.quiknode.pro/666f3daf8208b58c3e1adf6bf75b3e7776428314";
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <TonConnectUIProvider manifestUrl="https://softstack.github.io/telegram-mini-app/tonconnect-manifest.json">
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <App />
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </TonConnectUIProvider>
    </Provider>
  </React.StrictMode>
);
