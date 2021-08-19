import React from "react";

import { ActiveLink } from "../../../components/ActiveLink";

import styles from "./styles.module.scss";

import { FaHome, FaDesktop, FaMobileAlt, FaDatabase } from "react-icons/fa";

export const MenuNav = React.forwardRef<HTMLDivElement>((props, ref) => {  
  return (      
      <nav ref={ref}  className={styles.navContainer}>
        <ActiveLink href="/" activeClassName={styles.active}>
          <a>                        
            <FaHome/>
            Home
          </a>
        </ActiveLink>
        
        <ActiveLink href="/front-end" activeClassName={styles.active}>
          <a>
            <FaDesktop/>
            Front-End
          </a>
        </ActiveLink>

        <ActiveLink href="/mobile" activeClassName={styles.active}>
          <a className={styles.active}>
            <FaMobileAlt/>
            Mobile
          </a>
        </ActiveLink>

        <ActiveLink href="/backend" activeClassName={styles.active}>
          <a>
            <FaDatabase/>
            Backend
          </a>
        </ActiveLink>
      </nav>      
    )
  }
)