import Skeleton from "react-loading-skeleton";

const ReelSkeleton = () => {
  return (
    <div className="feed-card">
      <Skeleton height="100%" />

      <div
        style={{
          position: "absolute",
          left: 20,
          bottom: 20,
          width: "70%",
          zIndex: 10,
        }}
      >
        <Skeleton width={150} height={20} />
        <Skeleton count={2} />
      </div>

      <div
        style={{
          position: "absolute",
          right: 16,
          bottom: 150,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <Skeleton circle width={55} height={55} />
        <Skeleton circle width={40} height={40} />
        <Skeleton circle width={40} height={40} />
        <Skeleton circle width={40} height={40} />
      </div>
    </div>
  );
};

export default ReelSkeleton;