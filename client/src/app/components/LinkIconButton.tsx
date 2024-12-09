import { IconButton, Tooltip } from "@mui/joy";
import Link from "next/link";

/**
 * A button that navigates to a client side route when clicked.
 * @param children The icon to display in the button.
 * @param linkPath The path to navigate to in the client side.
 * @param tooltipText The text to display in the tooltip.
 * @returns
 */
export default function LinkIconButton({
  children,
  linkPath,
  tooltipText,
}: {
  children: React.ReactNode;
  linkPath: string;
  tooltipText: string;
}) {
  return (
    <>
      <Tooltip title={tooltipText} variant="plain">
        <Link href={linkPath}>
          <IconButton>{children}</IconButton>
        </Link>
      </Tooltip>
    </>
  );
}
