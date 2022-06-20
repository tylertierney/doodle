import { Tabs, Stack, Group, Title } from "@mantine/core";
import { FaRegUserCircle } from "react-icons/fa";
import { BsCameraVideo } from "react-icons/bs";
import { CharacterObj } from "../characters";
import styles from "../CharacterSelect.module.css";
import { Dispatch, SetStateAction } from "react";

interface TabsMenuProps {
  charactersArr: CharacterObj[];
  handleCharacterSelect: (name: string) => void;
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
  errorText: string;
}

const TabsMenu: React.FC<TabsMenuProps> = ({
  charactersArr,
  handleCharacterSelect,
  activeTab,
  setActiveTab,
  errorText,
}) => {
  return (
    <Tabs
      active={activeTab}
      onTabChange={setActiveTab}
      variant="unstyled"
      grow
      styles={(theme) => ({
        tabControl: {
          backgroundColor: "transparent",
          color: "white",
          border: "3px solid white",
          fontSize: "1.1rem",
          fontWeight: "bold",
          padding: "0.7rem",

          "&:not(:first-of-type)": {
            borderLeft: 0,
          },

          "&:first-of-type": {
            borderTopLeftRadius: theme.radius.md,
            borderBottomLeftRadius: theme.radius.md,
          },

          "&:last-of-type": {
            borderTopRightRadius: theme.radius.md,
            borderBottomRightRadius: theme.radius.md,
          },
        },

        tabActive: {
          backgroundColor: theme.colors.orange[5],
          borderColor: "white",
          color: "white",
        },
      })}
    >
      <Tabs.Tab label="Use Avatar" icon={<FaRegUserCircle />}>
        <Stack spacing="xs">
          <Title order={2} style={{ margin: 0, color: "white" }}>
            Choose a character
          </Title>
          <Group style={{ maxWidth: "480px" }}>
            {charactersArr.map((item: CharacterObj, idx: number) => {
              return (
                <img
                  onClick={() => handleCharacterSelect(item.name)}
                  key={idx}
                  src={item.icon}
                  className={styles.characterIcons}
                  style={{
                    backgroundColor: item.color,
                    border: item.isSelected ? "4px solid white" : "none",
                    boxShadow: item.isSelected
                      ? "2px 2px 14px 1px rgba(0, 0, 0, 0.3)"
                      : "none",
                  }}
                  alt="Avatar"
                />
              );
            })}
          </Group>
        </Stack>
      </Tabs.Tab>
      <Tabs.Tab label="Use Video" icon={<BsCameraVideo />}>
        <p className={styles.errorText}>{errorText}</p>
      </Tabs.Tab>
    </Tabs>
  );
};

export default TabsMenu;
