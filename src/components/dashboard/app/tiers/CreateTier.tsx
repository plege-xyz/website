import { overpass } from "@/utils/fonts";

const CreateTier = ({
  setIsTierCreateModalOpen,
}: {
  setIsTierCreateModalOpen: (value: boolean) => void;
}) => {
  return (
    <button
      onClick={() => setIsTierCreateModalOpen(true)}
      className={`h-10 rounded bg-white px-5 text-sm text-black ${overpass} pt-0.5`}
    >
      CREATE
    </button>
  );
};

export default CreateTier;
