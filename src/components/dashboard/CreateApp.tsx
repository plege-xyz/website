import { overpass } from "@/utils/fonts";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

const CreateApp = ({
  openCreateAppModal,
}: {
  openCreateAppModal: () => void;
}) => {
  return (
    <div
      className="flex h-48 w-96 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-[#111] bg-black p-6 px-8 transition-all hover:border-[#333]"
      onClick={openCreateAppModal}
    >
      <PlusCircleIcon className="h-10 w-10" />
      <div className={`${overpass} mt-3`}>Create App</div>
    </div>
  );
};

export default CreateApp;
