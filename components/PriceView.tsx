import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";
import PriceFormatter from "./PriceFormatter";

interface Props {
  price: number | undefined;
  discount: number | undefined;
  className?: string;
}

const PriceView = ({ price, discount, className }: Props) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
        <PriceFormatter
          amount={price}
          className={cn("text-base sm:text-lg text-shop_dark_green", className)}
        />
        {price && discount && (
          <PriceFormatter
            amount={price + (discount * price) / 100}
            className={twMerge(
              "line-through text-sm sm:text-base font-normal text-zinc-500",
              className
            )}
          />
        )}
      </div>
    </div>
  );
};

export default PriceView;
