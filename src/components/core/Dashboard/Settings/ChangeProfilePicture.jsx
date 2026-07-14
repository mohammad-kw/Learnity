import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI";
import IconBtn from "../../../common/IconBtn";

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const [imgError, setImgError] = useState(false);

  const fileInputRef = useRef(null);

  const initials =
    `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase() ||
    "U";
  const displaySrc = previewSource || user?.image;
  const hasImage = displaySrc && !imgError;

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // console.log(file)
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      setImgError(false);
    };
  };

  const handleFileUpload = () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("displayPicture", imageFile);
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false);
      });
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);
  return (
    <>
      <div className="flex items-center justify-between glass-card p-8 px-12 text-richblack-5">
        <div className="flex items-center gap-x-4">
          {hasImage ? (
            <img
              src={displaySrc}
              alt={`profile-${user?.firstName}`}
              onError={() => setImgError(true)}
              className="aspect-square w-[78px] rounded-full border border-purple-400/40 object-cover"
            />
          ) : (
            <div className="grid aspect-square w-[78px] place-items-center rounded-full bg-brand-gradient text-2xl font-semibold text-white">
              {initials}
            </div>
          )}
          <div className="space-y-2">
            <p>Change Profile Picture</p>
            <div className="flex flex-row gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                onClick={handleClick}
                disabled={loading}
                className="flex h-10 w-[110px] cursor-pointer items-center justify-center rounded-md bg-richblack-700 text-sm font-semibold text-richblack-50 transition-all duration-200 hover:scale-[0.98]"
              >
                Select
              </button>
              <IconBtn
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
                customClasses="h-10 w-[110px] justify-center !p-0 text-sm !shadow-none"
              >
                {!loading && (
                  <FiUpload className="text-lg text-richblack-900" />
                )}
              </IconBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
