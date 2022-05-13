import styles from "./Footer.module.css";
import KadoodleKSVG from "../KadoodleKSVG/KadoodleKSVG";
import { Text } from "@mantine/core";

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <KadoodleKSVG style={{ height: "100px", opacity: 0.5 }} />
      <Text color="white" size="xl" weight="bold" style={{ opacity: 0.5 }}>
        made by&nbsp;
        <a
          href="https://tylertierney.com"
          target="_blank"
          rel="noreferrer"
          style={{
            color: "inherit",
            textDecoration: "none",
            cursor: "pointer",
            borderBottom: "1px solid white",
          }}
        >
          Tyler Tierney
        </a>
      </Text>
    </div>
  );
};

export default Footer;
