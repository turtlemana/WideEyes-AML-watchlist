
interface Props {
  onClose: () => void;
  onLogout: () => void;
  onOpenContactModal: () => void;
}

const UserModal = ({ onClose, onLogout, onOpenContactModal }: Props) => {
  return (
    <main className="z-10 py-3 px-2 absolute  top-12 shadow-[0_0_12px_0_rgba(121,120,132,0.15)] bg-white w-[150px] rounded-20 overflow-hidden">

      {/* <p
        className="px-3 py-1.5 text-sm cursor-pointer hover:bg-[#F3F4F6]"
        onClick={onOpenContactModal}
      >
        Contact
      </p> */}
      <p
        className="px-3 py-1.5 text-sm cursor-pointer hover:bg-[#F3F4F6]"
        onClick={onLogout}
      >
        Logout
      </p>
    </main>
  );
};

export default UserModal;
