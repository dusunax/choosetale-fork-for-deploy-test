import { StarFilledIcon } from "@radix-ui/react-icons";

const Stars = ({ count, className }: { count: number; className?: string }) => {
  return new Array(count)
    .fill("")
    .map((_) => <StarFilledIcon key={`star${count}`} className={className} />);
};

export default Stars;
