import React, { useRef } from "react";
import Button from "../../components/Button";
import "./styles/screens/login-id.scss";

declare global {
  interface Window {
    universal_login_context: any;
  }
}

const LoginIdScreen: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const loginIdManager = window.universal_login_context

/**
 * get public key
 */
  async function getPasskey() {
    const publicKey = window.universal_login_context.screen.data.passkey.public_key;
    if (!publicKey) throw new Error("Errors.PASSKEY_DATA_UNAVAILABLE");
    const passkey = await getPasskeyCredentials(publicKey);
    return passkey;
  }

  /**
   * formulate passkey credential response by utilizing public key
   */
  async function getPasskeyCredentials(publicKey: any): Promise<any> {
    if (!publicKey) throw new Error("Errors.PASSKEY_PUBLIC_KEY_UNAVAILABLE");
    const hasWebAuthPlatform = await isWebAuthPlatformAvailable();
    const challenge = base64UrlToUint8Array(publicKey.challenge);

    const credential = (await navigator.credentials.get({
      publicKey: { challenge },
    })) as PublicKeyCredential | null;

    if (!credential) throw new Error("Errors.PASSKEY_CREDENTIALS_UNAVAILABLE");
    const response = credential.response as any;

    return {
      id: credential.id,
      rawId: safeBase64Url(credential.rawId ?? null),
      type: credential.type,
      authenticatorAttachment: credential.authenticatorAttachment,
      response: {
        clientDataJSON: safeBase64Url(response.clientDataJSON ?? null),
        authenticatorData: safeBase64Url(response.authenticatorData ?? null),
        signature: safeBase64Url(response.signature ?? null),
        userHandle: safeBase64Url(response.userHandle ?? null),
      },
      isUserVerifyingPlatformAuthenticatorAvailable: hasWebAuthPlatform,
    };
  }

  /**
   * Check platform support for passkey
   */
  async function isWebAuthPlatformAvailable(): Promise<boolean> {
    if (typeof window.PublicKeyCredential === 'undefined') {
      return false;
    }
    const isAvailable = await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    return isAvailable;
  }


  /***
   * Converting Base64 URL-encoded data into a raw ArrayBuffer (binary data).
   * This binary data that can be used by your computer to perform actions like encryption or decryption.
   */
  function base64UrlToUint8Array(base64Url: string): ArrayBuffer {
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padding = base64.length % 4 ? '='.repeat(4 - (base64.length % 4)) : '';
    const base64WithPadding = base64 + padding;
    const binaryString = atob(base64WithPadding);
    const length = binaryString.length;
    const uint8Array = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }
    return uint8Array.buffer;
  }

  /**
   * Encoding conversion
   */
  function safeBase64Url(buffer: ArrayBuffer | null): string | null {
    return buffer ? uint8ArrayToBase64Url(buffer) : null;
  }

  function uint8ArrayToBase64Url(arraybuffer: ArrayBufferLike): string | null {
    if (!arraybuffer) return null;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    const bytes = new Uint8Array(arraybuffer);
    let base64url = '';
    for (let i = 0; i < bytes.length; i += 3) {
      base64url += chars[bytes[i] >> 2];
      base64url += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
      base64url += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
      base64url += chars[bytes[i + 2] & 63];
    }

    if (bytes.length % 3 === 2) base64url = base64url.slice(0, -1);
    else if (bytes.length % 3 === 1) base64url = base64url.slice(0, -2);
    return base64url;
  }

  /**
   * Start Passkey flow by initiating capture of passkey
   * And then injecting the data into html form element
   */
  async function handlePasskeyLogin(event: any) {
    event.preventDefault()
    const passkey = await getPasskey();

    (event.target.childNodes[0] as HTMLInputElement).value = loginIdManager.transaction.state;
    (event.target.childNodes[1] as HTMLInputElement).value = JSON.stringify(passkey);
    event.target.submit()
  };

  return (
    <div className="prompt-container">
      <div className="title-container">
        <h1>{loginIdManager.screen.texts?.title}</h1>
        <p>{loginIdManager.screen.texts?.description}</p>
      </div>
      <div className="input-container">
        <button className="pick-country-code hidden" id="pick-country-code">
          Pick country code - {loginIdManager.transaction.countryCode}: +
          {loginIdManager.transaction.countryPrefix}
        </button>
        <label>Enter your email</label>
        <input
          type="text"
          id="username"
          ref={usernameRef}
          placeholder="Enter your email"
        />
        <div className="button-container">
          <Button onClick={() => { /* handle click event */ }}>Continue</Button>
        </div>
      </div>
      <div className="passkey-container">
        <form onSubmit={handlePasskeyLogin} className="space-y-4" method="post">
          <input name="state" value="" hidden></input>
          <input name="passkey" value="" hidden></input>
          {/* @ts-ignore */}
          <Button type="submit">Continue with Passkey</Button>
        </form>

      </div>
    </div>
  );
};

export default LoginIdScreen;
