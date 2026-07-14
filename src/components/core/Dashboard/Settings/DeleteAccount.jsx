import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteProfile } from "../../../../services/operations/SettingsAPI";
import ConfirmationModal from "../../../common/ConfirmationModal";

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  }

  return (
    <>
      <div className="my-10 flex flex-row items-center gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900/40 p-6 px-8">
        <div className="flex aspect-square h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-700">
          <FiTrash2 className="text-2xl text-pink-200" />
        </div>
        <div className="flex flex-col space-y-1">
          <h2 className="text-base font-semibold text-richblack-5">
            Delete Account
          </h2>
          <p className="text-sm text-pink-25">
            Deleting your account is permanent and will remove all content
            associated with it.
          </p>
          <button
            type="button"
            className="w-fit cursor-pointer text-sm font-medium italic text-pink-300 transition-all duration-200 hover:text-pink-200"
            onClick={() =>
              setConfirmationModal({
                text1: "Delete Account?",
                text2:
                  "Your account will be permanently deleted along with all your courses and data. This action cannot be undone.",
                btn1Text: "Delete",
                btn2Text: "Cancel",
                btn1Handler: handleDeleteAccount,
                btn2Handler: () => setConfirmationModal(null),
              })
            }
          >
            I want to delete my account.
          </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
