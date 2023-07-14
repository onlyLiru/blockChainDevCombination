import * as crypto from "crypto";

// 定义区块链环签名的数据结构
interface RingSignature {
  message: string;
  publicKeys: string[];
  signature: string;
}

// 生成密钥对
function generateKeyPair(): any {
  return crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });
}

// 生成环签名
function generateRingSignature(
  message: string,
  publicKeys: string[],
  privateKey: string
): RingSignature {
  const signature = crypto.sign("sha256", Buffer.from(message), {
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST,
  });

  return {
    message,
    publicKeys,
    signature: signature.toString("base64"),
  };
}

// 验证环签名
function verifyRingSignature(ringSignature: RingSignature): boolean {
  const { message, publicKeys, signature } = ringSignature;
  const messageBuffer = Buffer.from(message);
  const signatureBuffer = Buffer.from(signature, "base64");

  for (let i = 0; i < publicKeys.length; i++) {
    const publicKey = publicKeys[i];
    const verify = crypto.verify(
      "sha256",
      messageBuffer,
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST,
      },
      signatureBuffer
    );

    if (verify) {
      return true;
    }
  }

  return false;
}

// 示例用法
const keyPair1 = generateKeyPair();
const keyPair2 = generateKeyPair();
const keyPair3 = generateKeyPair();

const message = "Hello, world!";
const publicKeys = [keyPair1.publicKey, keyPair2.publicKey, keyPair3.publicKey];
const privateKey = keyPair1.privateKey;

const ringSignature = generateRingSignature(message, publicKeys, privateKey);
const isValid = verifyRingSignature(ringSignature);

console.log("环签名:", ringSignature);
console.log("验证结果:", isValid);
