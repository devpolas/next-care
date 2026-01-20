import SpinnerCustom from "../spinner/loading-spinner";
import { Button } from "../ui/button";

export default function ButtonWithSpinner({
  children,
  isLoading,
  type,
}: {
  children: React.ReactNode;
  isLoading: boolean;
  type: "button" | "submit" | "reset" | undefined;
}) {
  return (
    <Button
      disabled={isLoading}
      type={type}
      className='w-full hover:cursor-pointer'
    >
      {isLoading && <SpinnerCustom />} {children}
    </Button>
  );
}
