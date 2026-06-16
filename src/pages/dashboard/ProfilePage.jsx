import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { updateProfile, updatePassword } from "../../api/authApi";
import { Mail, Shield, Camera, Loader2, KeyRound } from "lucide-react";

// Backend serves uploaded files from /uploads (same host as the API, minus /api).
const UPLOADS_BASE_URL =
  import.meta.env.VITE_UPLOADS_URL || "http://localhost:3000/uploads";

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-4 py-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
    <div className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
      <Icon size={15} className="text-gray-500 dark:text-gray-400" />
    </div>
    <div>
      <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-medium mb-0.5">{label}</p>
      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{value || "—"}</p>
    </div>
  </div>
);

const ProfilePage = () => {
  const { user, refreshProfile } = useAuth();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  // instant local preview shown the moment a file is picked (no round-trip wait)
  const [preview, setPreview] = useState(null);
  const previewRef = useRef(null);

  // revoke the object URL when leaving the page
  useEffect(
    () => () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    },
    [],
  );

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  const avatarUrl =
    preview || (user?.avatar ? `${UPLOADS_BASE_URL}/${user.avatar}` : null);

  const handleSelectPhoto = () => fileInputRef.current?.click();

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file) return;

    // client-side validation mirrors the backend (jpg/jpeg/png, < 2MB)
    if (!/\.(jpg|jpeg|png)$/i.test(file.name)) {
      toast.error("Please choose a JPG, JPEG or PNG image.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be smaller than 2MB.");
      return;
    }

    // show the picked image immediately (instant, before the upload finishes)
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    const localUrl = URL.createObjectURL(file);
    previewRef.current = localUrl;
    setPreview(localUrl);

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("photo", file);
      await updateProfile(formData);
      await refreshProfile(); // user.avatar now points at the new unique filename
      toast.success("Profile photo updated.");
    } catch (err) {
      // revert to the previous avatar on failure
      URL.revokeObjectURL(localUrl);
      previewRef.current = null;
      setPreview(null);
      toast.error(
        err?.response?.data?.message || "Failed to upload profile photo.",
      );
    } finally {
      setUploading(false);
    }
  };

  // ---- change password ----
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const [savingPwd, setSavingPwd] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (pwd.next.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }
    if (pwd.next !== pwd.confirm) {
      toast.error("New passwords do not match.");
      return;
    }
    try {
      setSavingPwd(true);
      const data = await updatePassword({
        currentPassword: pwd.current,
        newPassword: pwd.next,
      });
      if (data?.token) localStorage.setItem("token", data.token); // keep session valid
      setPwd({ current: "", next: "", confirm: "" });
      toast.success("Password updated.");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to update password.",
      );
    } finally {
      setSavingPwd(false);
    }
  };

  const pwdInputCls =
    "w-full px-3 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent";

  // ---- editable profile (uncontrolled form, keyed to the loaded user) ----
  const [savingProfile, setSavingProfile] = useState(false);
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    try {
      setSavingProfile(true);
      await updateProfile({
        name: fd.get("name"),
        phone: fd.get("phone"),
        headline: fd.get("headline"),
        skills: fd.get("skills"),
      });
      await refreshProfile();
      toast.success("Profile updated.");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Profile</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage your personal information</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-emerald-500 to-emerald-700" />
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-8 mb-6">
            <button
              type="button"
              onClick={handleSelectPhoto}
              disabled={uploading}
              title="Change profile photo"
              className="group relative w-16 h-16 rounded-2xl border-4 border-white dark:border-gray-900 shadow-sm overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={user?.name || "Profile photo"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="w-full h-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-lg font-bold text-emerald-700 dark:text-emerald-300">
                  {initials}
                </span>
              )}
              <span className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                {uploading ? (
                  <Loader2 size={16} className="text-white animate-spin" />
                ) : (
                  <Camera size={16} className="text-white" />
                )}
              </span>
            </button>
            <button
              type="button"
              onClick={handleSelectPhoto}
              disabled={uploading}
              className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {uploading ? <Loader2 size={13} className="animate-spin" /> : <Camera size={13} />}
              {uploading ? "Uploading…" : "Change photo"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{user?.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize mt-0.5">{user?.role}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Personal Information</h3>
        <form key={user?._id} onSubmit={handleSaveProfile} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Full Name</label>
              <input name="name" defaultValue={user?.name || ""} required className={pwdInputCls} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Phone</label>
              <input name="phone" defaultValue={user?.phone || ""} placeholder="e.g. +63 912 345 6789" className={pwdInputCls} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Headline</label>
            <input name="headline" defaultValue={user?.headline || ""} maxLength={120} placeholder="e.g. Full-stack developer · 5 yrs" className={pwdInputCls} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Skills <span className="text-gray-400 font-normal">(comma-separated)</span></label>
            <input name="skills" defaultValue={(user?.skills || []).join(", ")} placeholder="React, Node.js, MongoDB" className={pwdInputCls} />
          </div>
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={savingProfile}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
            >
              {savingProfile && <Loader2 size={14} className="animate-spin" />}
              {savingProfile ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>

        <div className="mt-5 pt-2 border-t border-gray-100 dark:border-gray-800">
          <InfoRow icon={Mail} label="Email Address" value={user?.email} />
          <InfoRow icon={Shield} label="Account Role" value={user?.role} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
          <KeyRound size={15} className="text-gray-400" />
          Change Password
        </h3>
        <form onSubmit={handleChangePassword} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Current Password</label>
            <input
              type="password"
              autoComplete="current-password"
              value={pwd.current}
              onChange={(e) => setPwd((p) => ({ ...p, current: e.target.value }))}
              required
              className={pwdInputCls}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">New Password</label>
              <input
                type="password"
                autoComplete="new-password"
                value={pwd.next}
                onChange={(e) => setPwd((p) => ({ ...p, next: e.target.value }))}
                required
                minLength={8}
                placeholder="At least 8 characters"
                className={pwdInputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Confirm New Password</label>
              <input
                type="password"
                autoComplete="new-password"
                value={pwd.confirm}
                onChange={(e) => setPwd((p) => ({ ...p, confirm: e.target.value }))}
                required
                className={pwdInputCls}
              />
            </div>
          </div>
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={savingPwd}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
            >
              {savingPwd && <Loader2 size={14} className="animate-spin" />}
              {savingPwd ? "Updating…" : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;

