import { Group, Text, Tooltip, UnstyledButton, rem, useMantineColorScheme } from '@mantine/core';
import { IconHome2, IconPlaneTilt, IconSunHigh, IconSunLow } from '@tabler/icons-react';

import classes from './Header.module.css';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

export default function Header() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  const setLight = <NavbarLink icon={IconSunHigh} label="Light" onClick={() => setColorScheme('light')} />
  const setDark = <NavbarLink icon={IconSunLow} label="Dark" onClick={() => setColorScheme('dark')} />

  return (
    <>
      <Group h="100%" w="100%" pl="md">
        <Group justify="left">
          <IconPlaneTilt size="40px" color="white" />
          <Text size="lg" c="white">
            Copilot4Pilots
          </Text>
        </Group>
        <Group justify="right">
          {colorScheme === "dark" ? setLight : null}
          {colorScheme === "light" ? setDark : null}
        </Group>
      </Group>
    </>
  );
}
