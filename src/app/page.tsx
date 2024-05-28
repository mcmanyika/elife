"use client";
import { useEffect, useState } from "react";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";
import Web3 from "web3";
import Layout from './components/Layout';
import AllAgents from '../../pages/AllAgents';
import EventList from '../../pages/EventList';
import Subscribe from './components/Subscribe';

const clientId = "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ"; // get from https://dashboard.web3auth.io

const chainConfig = {
  chainId: "0x1", // Please use 0x1 for Mainnet
  rpcTarget: "https://rpc.ankr.com/eth",
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  displayName: "Ethereum Mainnet",
  blockExplorerUrl: "https://etherscan.io/",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://images.toruswallet.io/eth.svg",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
});

export default function Home() {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    try {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
      if (web3auth.connected) {
        setLoggedIn(true);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const getUserInfo = async () => {
    try {
      const user = await web3auth.getUserInfo();
      uiConsole(user);
    } catch (error) {
      console.error("Failed to get user info", error);
    }
  };

  const logout = async () => {
    try {
      await web3auth.logout();
      setProvider(null);
      setLoggedIn(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const getAccounts = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    try {
      const web3 = new Web3(provider as any);
      const address = await web3.eth.getAccounts();
      uiConsole(address);
    } catch (error) {
      console.error("Failed to get accounts", error);
    }
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    try {
      const web3 = new Web3(provider as any);
      const address = (await web3.eth.getAccounts())[0];
      const balance = web3.utils.fromWei(await web3.eth.getBalance(address), "ether");
      uiConsole(balance);
    } catch (error) {
      console.error("Failed to get balance", error);
    }
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    try {
      const web3 = new Web3(provider as any);
      const fromAddress = (await web3.eth.getAccounts())[0];
      const originalMessage = "YOUR_MESSAGE";
      const signedMessage = await web3.eth.personal.sign(originalMessage, fromAddress, "test password!");
      uiConsole(signedMessage);
    } catch (error) {
      console.error("Failed to sign message", error);
    }
  };

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
      console.log(...args);
    }
  }

  

  return (
    <Layout loggedIn={loggedIn} login={login} logout={logout}>
      <AllAgents />
      <EventList />
      <Subscribe />
      <div id="console"><p></p></div>
    </Layout>
  );
}
