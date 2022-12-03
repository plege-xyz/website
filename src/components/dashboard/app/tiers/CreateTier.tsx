import { overpass } from "@/utils/fonts";

const CreateTier = ({
  setIsTierCreateModalOpen,
}: {
  setIsTierCreateModalOpen: (value: boolean) => void;
}) => {
  return (
    <button
      onClick={() => setIsTierCreateModalOpen(true)}
      className={`my-10 h-10 rounded bg-white px-5 text-black ${overpass} pt-0.5`}
    >
      Create
    </button>
  );
};

export default CreateTier;
