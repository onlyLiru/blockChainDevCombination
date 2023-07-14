"use client";

import styles from "@/app/home.module.css";
import { Toast, Space, CheckList, List, Avatar, Dialog } from "antd-mobile";
import { formatString } from "@/utils";
import { BaseError } from "viem";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import MetaMaskIcon from "public/metamask.png";
import MetaMask from "public/metamask@2x.png";
import USDC from "public/USDC@2x.png";
import TrxIcon from "public/trx@2x.png";
import Dai from "public/dai@2x.png";
import { useRecoilState } from "recoil";
import { walletState } from "@/recoil/wallet";

export default function Wallet() {
  const [wallet, setWallet] = useRecoilState(walletState);
  let DialogInstance: any = null;

  const { connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  const icons: any = {
    metaMask: MetaMaskIcon.src,
    coinbaseWallet: USDC.src,
    walletConnect: Dai.src,
    injected: TrxIcon.src,
  };

  const list = (
    <div>
      <Space block justify="center" className={styles.title}>
        连接钱包
      </Space>
      <CheckList
        value={[wallet.type]}
        style={{ "--border-bottom": "0", "--border-top": "0" }}
        onChange={async (v) => {
          if (!v.length) {
            DialogInstance?.close && DialogInstance.close();
            return;
          }
          DialogInstance?.close && DialogInstance.close();
        }}
      >
        {connectors
          .filter((x) => x.ready && x.id !== connector?.id)
          .map((x) => (
            // <button key={x.id} onClick={() => connect({ connector: x })}>
            //   {x.name}
            //   {isLoading && x.id === pendingConnector?.id && " (connecting)"}
            // </button>
            <CheckList.Item
              value="TronLink"
              key={x.id}
              onClick={() => connect({ connector: x })}
            >
              <Space align="center">
                <Avatar
                  src={icons[x.id] || TrxIcon.src}
                  fit="contain"
                  style={{ "--size": "2rem" }}
                />
                <span>
                  {" "}
                  {x.name}
                  {isLoading &&
                    x.id === pendingConnector?.id &&
                    " (connecting)"}
                </span>
              </Space>
            </CheckList.Item>
          ))}
      </CheckList>
    </div>
  );

  const handleClick = () => {
    DialogInstance = Dialog.show({
      content: list,
      closeOnAction: true,
      actions: [
        [
          {
            key: "cancel",
            text: <span style={{ color: "gray" }}>取消</span>,
          },
          {
            key: "confirm",
            text: "确定",
          },
        ],
      ],
    });
  };

  const Desc = () => {
    return (
      <>
        {(error && <div>{(error as BaseError).shortMessage}</div>) || (
          <>
            {(isConnected && (
              <button onClick={() => disconnect()}>
                Disconnect from {connector?.name}
              </button>
            )) || <>SeretRPC</>}
          </>
        )}
      </>
    );
  };

  return (
    <div onClick={handleClick}>
      <List className="wallet-box">
        <List.Item
          prefix={
            <Avatar
              src={MetaMaskIcon.src}
              style={{
                borderRadius: "100%",
                background: "#EFF4FA",
                padding: "10px",
                boxSizing: "border-box",
              }}
              fit="fill"
            />
          }
          description={<Desc />}
        >
          {isConnected ? connector?.name : "Connect Wallet"}
        </List.Item>
      </List>
    </div>
  );
}
