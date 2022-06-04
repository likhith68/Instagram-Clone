import React, { Fragment, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { Modalstate } from "../atoms/modalAtoms";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@mui/material";
import { CameraIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "@firebase/firestore";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";
import { db, storage } from "../firebase";

function Modal() {
  const [open, setOpen] = useRecoilState(Modalstate);
  const filePickerRef = useRef(null);
  const CaptionRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  //////////////////////////////////////////////////////////////
  const uploadPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.name,
      caption: CaptionRef.current.value,
      profileImage: session.user.image,
      timestamp: serverTimestamp(),
    }); //1.
    console.log("New doc added with ID", docRef.id); //2.

    const imageRef = ref(storage, `posts/${docRef.id}/image`); //3.

    await uploadString(imageRef, selectedFile, "data_url").then(
      //4
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef); //4
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );
    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  const addImageToPost = (e) => {
    const reader = new window.FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  ////////////////////////////////////////////////////////////////////////
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-8 sm:min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-8 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg shadow-xl pt-5 px-4 pb-4 text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    onClick={() => setSelectedFile(null)}
                    className="w-full object-contain cursor-pointer"
                    alt=""
                  />
                ) : (
                  <>
                    <div
                      onClick={() => filePickerRef.current.click()}
                      className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer"
                    >
                      <CameraIcon
                        className="w-6 h-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                  </>
                )}

                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Upload a Photo
                    </Dialog.Title>
                  </div>
                  <div>
                    <input
                      ref={filePickerRef}
                      type="file"
                      hidden
                      onChange={addImageToPost}
                    />
                  </div>
                  <div className="mt-3">
                    <input
                      className="border-none focus:ring-0 w-full text-center"
                      type="text"
                      ref={CaptionRef}
                      placeholder=" Enter Caption"
                    />
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <Button
                    onClick={uploadPost}
                    disabled={!selectedFile}
                    className="items-center w-full rounded-md bg-red-600 text-white hover:bg-red-800 justify-center align-middle"
                  >
                    {loading ? "uploading..." : "Upload Post"}
                  </Button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
