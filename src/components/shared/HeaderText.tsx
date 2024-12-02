import { cn } from "@/lib/utils";

type HeaderTextProps = {
  text: string;
  className?: string;
};

const HeaderText = ({ text, className }: HeaderTextProps) => {
  return (
    <div className={cn("w-full  ", className)}>
      <h1 className="text-primary-grey-700">{text}</h1>
    </div>
  );
};

export default HeaderText;
