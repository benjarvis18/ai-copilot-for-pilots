import { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem, useMantineColorScheme } from '@mantine/core';
import {
  IconHome2,
  IconPlaneTilt,
  IconSunFilled,
  IconSunHigh,
  IconSunLow
} from '@tabler/icons-react';
import classes from './Navbar.module.css';

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

const mockdata = [
  { icon: IconHome2, label: 'Home' }
];

export function Navbar() {
  const [active, setActive] = useState(2);
  const { setColorScheme } = useMantineColorScheme();

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <>
      <Center>
        <IconPlaneTilt className={classes.logo} />
      </Center>
      <Center className={classes.logo}>Copilot</Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconSunHigh} label="Light" onClick={() => setColorScheme("light")} />
        <NavbarLink icon={IconSunLow} label="Dark" onClick={() => setColorScheme("dark")} />
        <NavbarLink icon={IconSunFilled} label="Auto" onClick={() => setColorScheme("auto")} />
      </Stack>
    </>
  );
}