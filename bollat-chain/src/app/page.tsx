"use client";

import {
  useAccount,
  useConnect,
  useEnsName,
  useEnsAddress,
  useBalance,
  useNetwork,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { NetworkSwitcher } from "../components/NetworkSwitcher";
import { Connect } from "../components/Connect";
import { Connected } from "../components/Connected";

const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getMyLuckyNumber",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "ownerToLuckyNumber",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_luckyNumber",
        type: "uint256",
      },
    ],
    name: "saveLuckyNumber",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "a",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "b",
        type: "uint256",
      },
    ],
    name: "sum",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_luckyNumber",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_newLuckyNumber",
        type: "uint256",
      },
    ],
    name: "updateLuckyNumber",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const getAccount = async (client: any) => {
  return client.getAddresses();
};

export default function Home() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  // const { data, isError, isLoading } = useEnsAddress({
  //   name: "awkweb.eth",
  // });
  // console.log(data);

  const { data, isError, isLoading } = useBalance({
    address: "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
  });
  console.log(data);

  const network = useNetwork();
  console.log(network);

  return (
    <>
      <Connect />
      <Connected>
        <h1>Good</h1>
      </Connected>
      <NetworkSwitcher />
    </>
  );
}
