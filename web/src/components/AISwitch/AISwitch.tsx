import { Switch, rem, useMantineTheme } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useState } from 'react';

export default function AISwitch(props: { checked: boolean, onSwitch: (checked: boolean) => void}) {
  const theme = useMantineTheme();

  const onChange = (checked: boolean) => {
    props.onSwitch(checked);
  }

  return (
    <Switch
      checked={props.checked}
      onChange={(event) => onChange(event.currentTarget.checked)}
      color="teal"
      size="md"
      label="Use the AI"
      thumbIcon={
        props.checked ? (
          <IconCheck
            style={{ width: rem(12), height: rem(12) }}
            color={theme.colors.teal[6]}
            stroke={3}
          />
        ) : (
          <IconX
            style={{ width: rem(12), height: rem(12) }}
            color={theme.colors.red[6]}
            stroke={3}
          />
        )
      }
    />
  );
}
