const Skeleton = () => {
  return (
    <div className="h-48 w-96 cursor-pointer rounded-lg border-2 border-[#111] bg-black p-6 px-8 transition-all hover:border-[#333]">
      <div className="h-8 w-2/3 animate-pulse rounded bg-[#111]"></div>
      <div className="mt-2 h-8 w-1/3 animate-pulse rounded bg-[#111]"></div>
    </div>
  );
};

const SkeletalLoader = () => {
  return (
    <>
      {Array(15)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i} />
        ))}
    </>
  );
};

export default SkeletalLoader;
