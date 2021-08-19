import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaLinkedin
} from "react-icons/fa";

import { Logo } from "../Logo";
import styles from "./styles.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.containerFooter}>
      <div className={styles.container}>

        <div className={styles.containerFooterWrapper_1}>      
          <Logo height={50} width={110} />

          <div className={styles.containerSocialLink}>
            <a href="https://www.facebook.com/will.keyboard.1" target="_blank">
              <FaFacebook className={styles.facebook} />
            </a>

            <a href="https://www.instagram.com/willcruz_k07/" target="_blank">
              <FaInstagram className={styles.instagram} />
            </a>

            <a href="https://twitter.com/WillCruzZ07" target="_blank">
              <FaTwitter className={styles.twitter} />
            </a>

            <a href="https://github.com/willcruz07" target="_blank">
              <FaGithub className={styles.github} />
            </a>

            <a href="https://www.linkedin.com/in/wellen-cruz-0a6758156/" target="_blank">
              <FaLinkedin className={styles.linkedin} />
            </a>
          </div>

        </div>

        <div className={styles.containerFooterWrapper_2}>
          <small>
            © 2021 <a href="/">Blog Will-Dev.</a>
          </small>
        </div>
        
      </div>
    </footer>
  )
}