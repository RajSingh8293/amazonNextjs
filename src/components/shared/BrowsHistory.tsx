"use client";
import { useProductHistoryStore } from "@/lib/hooks/useBrowsHistory";
import ProductCarousal from "./ProductCarousal";

const BrowsHistory = ({
  title,
  className,
  grid,
  size,
}: {
  title?: string;
  className?: string;
  grid?: string;
  size?: string;
}) => {
  const history = useProductHistoryStore((state) => state.history);

  return (
    <div>
      {history.length > 0 && (
        <div className="my-12">
          <ProductCarousal
            hideDetail
            urlLink="/brower-history"
            link="View or edit your browsing history"
            title={title}
            data={history}
            className={className}
            size={size}
            grid={grid}
            hideAddBtn
          />
        </div>
      )}
    </div>
  );
};

export default BrowsHistory;
