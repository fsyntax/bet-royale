import discord from "../images/discord.svg";
import reddit from "../images/reddit.svg";
import twitter from "../images/twitter.svg";
import telegram from "../images/telegram.svg";
import facebook from "../images/facebook.svg";
import instagram from "../images/instagram.svg";
import fandom from "../images/fandom.svg";
import viperswap from "../images/viperswap.svg";
import harmony from "../images/harmony.svg";

const Footer = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center w-100 p-4">
      <a href="https://discord.gg/rg9KUUSqfc" target="_blank" rel="noreferrer">
        <img
          style={{ height: "25px", marginRight: "10px" }}
          src={discord}
          alt="discord"
        />
      </a>
      <a
        href="https://www.reddit.com/r/CryptoRoyale/"
        target="_blank"
        rel="noreferrer"
      >
        <img
          style={{ height: "25px", marginRight: "10px" }}
          src={reddit}
          alt="reddit"
        />
      </a>
      <a
        href="https://twitter.com/cryptoroyaleone"
        target="_blank"
        rel="noreferrer"
      >
        <img
          style={{ height: "25px", marginRight: "10px" }}
          src={twitter}
          alt="twitter"
        />
      </a>
      <a href="https://t.me/cryptoroyaleone" target="_blank" rel="noreferrer">
        <img
          style={{ height: "25px", marginRight: "10px" }}
          src={telegram}
          alt="telegram"
        />
      </a>
      <a
        href="https://www.facebook.com/Crypto-Royale-101492479020568"
        target="_blank"
        rel="noreferrer"
      >
        <img
          style={{ height: "25px", marginRight: "10px" }}
          src={facebook}
          alt="facebook"
        />
      </a>
      <a
        href="https://www.instagram.com/cryptoroyaleofficial/"
        target="_blank"
        rel="noreferrer"
      >
        <img
          style={{ height: "25px", marginRight: "10px" }}
          src={instagram}
          alt="instagram"
        />
      </a>
      <a
        href="https://unofficialcryptoroyale.fandom.com/wiki/UnofficalCryptoroyale_Wiki"
        target="_blank"
        rel="noreferrer"
      >
        <img
          style={{ height: "25px", marginRight: "10px" }}
          src={fandom}
          alt="fandom"
        />
      </a>
      <a
        href="https://viper.exchange/#/swap?inputCurrency=ONE&outputCurrency=0xfe1b516A7297eb03229A8B5AfAD80703911E81cB"
        target="_blank"
        rel="noreferrer"
      >
        <img
          style={{ height: "25px", marginRight: "10px" }}
          src={viperswap}
          alt="viperswap"
        />
      </a>
      <a
        href="https://explorer.harmony.one/address/0xfe1b516a7297eb03229a8b5afad80703911e81cb"
        target="_blank"
        rel="noreferrer"
      >
        <img
          style={{ height: "25px", marginRight: "10px" }}
          src={harmony}
          alt="harmony"
        />
      </a>
    </div>
  );
};

export default Footer;