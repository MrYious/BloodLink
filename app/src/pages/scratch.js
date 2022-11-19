import {useState} from "react";

export default function Modal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-pink-500 rounded shadow outline-none active:bg-pink-600 hover:shadow-lg focus:outline-none"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Open regular modal
      </button>
      {showModal && (
        <>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
          >
            <div className="relative w-auto max-w-3xl mx-auto my-6">
              {/*content*/}
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                  <h3 className="text-xl font-semibold">
                    Modal Title
                  </h3>
                  <FaTimes onClick={() => setShowModal(false)} className='text-xl cursor-pointer ' />
                </div>
                {/*body*/}
                <div className="flex flex-col p-6 text-sm">
                  <p className="leading-relaxed text-slate-500">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae minima sed nemo assumenda veritatis, sit quaerat consectetur. At, dolores. Facilis quidem aperiam unde quod nesciunt ullam, amet adipisci est quae quo libero! Aspernatur ut nisi quidem vero culpa facere inventore vitae eligendi provident? Quasi, cupiditate, magnam, numquam labore tenetur quo iure deleniti amet veniam inventore consequatur accusamus veritatis nam adipisci? Provident, ex ducimus ab, consequuntur sit, nihil perspiciatis veritatis voluptates laborum asperiores dolorum. Placeat nam eum quidem quos sed perferendis dolor illum a! Reprehenderit perferendis, at facilis suscipit ipsam commodi porro similique eaque a doloremque earum. Eius atque ab fuga!
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                  <button
                    className="px-6 py-2 mb-1 mr-1 text-xs font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none hover:underline background-transparent focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="px-6 py-3 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 hover:bg-emerald-700 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      )}
    </>
  );
}