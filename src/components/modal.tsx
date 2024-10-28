const Modal = ({ status, children, closeModal, title }) => {
  console.log(status);
  return (
    <>
      <div
        className={
          status
            ? "flex fixed z-50 max-sm:px-2 max-md:p-10 px-20 pt-10 pb-20 w-full h-full left-0 top-0 bg-black bg-opacity-35"
            : "hidden"
        }
      >
        <div className="flex w-full max-lg:h-full flex-col px-2 rounded-md bg-white h-full">
          <div className="flex w-full">
            <span className="w-full flex justify-start">{title}</span>
            <span className="flex w-full justify-end px-1">
              <button onClick={closeModal}>X</button>
            </span>
          </div>
          <div className="flex overflow-y-auto max-sm:h-fit">{children}</div>
          <div className="flex w-full justify-end p-1">
            <button
              onClick={closeModal}
              className="flex px-4 rounded-md text-white py-1 justify-end bg-pink-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
