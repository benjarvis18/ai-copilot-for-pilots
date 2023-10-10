import { Badge } from "@mantine/core";
import { IconFile } from "@tabler/icons-react";
import classes from "./DocumentBadge.module.css";

interface DocumentBadgeProps {
  documentName: string;
  documentUrl: string;
}

export default function DocumentBadge(props: DocumentBadgeProps) {
  return (
    <Badge component="a" href={props.documentUrl} target="_blank" color="blue" p="md" size="lg" leftSection={<IconFile />} className={classes.documentBadge}>
      {props.documentName}
    </Badge>
  );
}
