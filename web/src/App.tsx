import '@mantine/core/styles.css';
import { useDisclosure } from '@mantine/hooks';
import { MantineProvider, AppShell, Container, createTheme, Burger, Group, Text, Tooltip, UnstyledButton, rem, useMantineColorScheme } from '@mantine/core';
import { Router } from './Router';
import classes from './App.module.css';

import Header from './components/Header/Header';

const theme = createTheme({});

export default function App() {
  const [opened, { toggle }] = useDisclosure();
  

  return (
    <MantineProvider theme={theme}>
      <AppShell header={{ height: 60 }} padding="md">
        <AppShell.Header className={classes.navbar}>
          <Header />
        </AppShell.Header>

        <AppShell.Main>
          <Container fluid>
            <Router />
          </Container>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

function Demo() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

      <AppShell.Main>Main</AppShell.Main>
    </AppShell>
  );
}
