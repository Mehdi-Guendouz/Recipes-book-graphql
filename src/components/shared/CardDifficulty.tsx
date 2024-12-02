import { cn } from "@/lib/utils";

type cardDifficultyProps = {
  difficulty: string;
};

const CardDifficulty = ({ difficulty }: cardDifficultyProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center px-3  w-fit bg-primary-green rounded-[10px] text-[12px] text-white font-normal",
        {
          "bg-primary-green-dark": difficulty === "easy",
          "bg-yellow-500": difficulty === "medium",
          "bg-primary-red": difficulty === "hard",
        }
      )}
    >
      {difficulty}
    </div>
  );
};

export default CardDifficulty;
