import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { formattedDate } from "../../../utils/dateFormatter";
import IconBtn from "../../common/IconBtn";

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const initials =
    `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase() ||
    "U";
  const hasImage = user?.image && !imgError;

  const goToSettings = () => navigate("/dashboard/settings");

  const Field = ({ label, value, muted }) => (
    <div>
      <p className="mb-1 text-xs uppercase tracking-wide text-richblack-400">
        {label}
      </p>
      <p
        className={`text-sm font-medium ${
          muted ? "text-richblack-400" : "text-richblack-5"
        }`}
      >
        {value}
      </p>
    </div>
  );

  return (
    <>
      <h1 className="mb-10 text-3xl font-semibold text-richblack-5">
        My Profile
      </h1>

      {/* Hero / Identity card */}
      <div className="relative overflow-hidden glass-card">
        {/* gradient banner */}
        <div className="h-28 w-full bg-brand-gradient opacity-90" />

        <div className="flex flex-col items-start gap-6 px-8 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
            {/* Avatar overlapping the banner */}
            <div className="-mt-12">
              {hasImage ? (
                <img
                  src={user.image}
                  alt={`profile-${user?.firstName}`}
                  onError={() => setImgError(true)}
                  className="aspect-square w-[96px] rounded-full border-4 border-richblack-800 object-cover shadow-purple-glow"
                />
              ) : (
                <div className="grid aspect-square w-[96px] place-items-center rounded-full border-4 border-richblack-800 bg-brand-gradient text-3xl font-semibold text-white shadow-purple-glow">
                  {initials}
                </div>
              )}
            </div>
            <div className="space-y-1 pb-1">
              <p className="text-xl font-semibold text-richblack-5">
                {user?.firstName + " " + user?.lastName}
              </p>
              <p className="text-sm text-richblack-300">{user?.email}</p>
              {user?.accountType && (
                <span className="inline-block rounded-full border border-purple-300/40 bg-purple-300/10 px-3 py-0.5 text-xs font-medium text-purple-200">
                  {user.accountType}
                </span>
              )}
            </div>
          </div>
          <div className="pb-1">
            <IconBtn text="Edit Profile" onclick={goToSettings}>
              <RiEditBoxLine />
            </IconBtn>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="my-8 flex flex-col gap-y-5 glass-card p-8">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconBtn text="Edit" onclick={goToSettings}>
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-100"
              : "text-richblack-400"
          } text-sm leading-relaxed`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>

      {/* Personal Details */}
      <div className="my-8 flex flex-col gap-y-6 glass-card p-8">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <IconBtn text="Edit" onclick={goToSettings}>
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="First Name" value={user?.firstName} />
          <Field label="Last Name" value={user?.lastName} />
          <Field label="Email" value={user?.email} />
          <Field
            label="Phone Number"
            value={
              user?.additionalDetails?.contactNumber ?? "Add Contact Number"
            }
            muted={!user?.additionalDetails?.contactNumber}
          />
          <Field
            label="Gender"
            value={user?.additionalDetails?.gender ?? "Add Gender"}
            muted={!user?.additionalDetails?.gender}
          />
          <Field
            label="Date Of Birth"
            value={
              user?.additionalDetails?.dateOfBirth
                ? formattedDate(user?.additionalDetails?.dateOfBirth)
                : "Add Date Of Birth"
            }
            muted={!user?.additionalDetails?.dateOfBirth}
          />
        </div>
      </div>
    </>
  );
}
