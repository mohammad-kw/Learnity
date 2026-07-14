const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const { getVideoDurationInSeconds } = require("get-video-duration");
const ffprobeStatic = require("ffprobe-static");

// Directory where local uploads are stored (server/uploads)
const UPLOAD_DIR = path.join(__dirname, "..", "uploads");

// Make sure the uploads directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Save the uploaded file to the local filesystem and return a Cloudinary-like
// object so the rest of the codebase (which reads `.secure_url`) keeps working.
async function uploadToLocal(file, folder) {
  const safeFolder = (folder || "misc").replace(/[^a-zA-Z0-9-_]/g, "");
  const destDir = path.join(UPLOAD_DIR, safeFolder);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const ext = path.extname(file.name) || "";
  const uniqueName = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;
  const destPath = path.join(destDir, uniqueName);

  // express-fileupload provides `.mv()` to move the temp file to a destination
  await file.mv(destPath);

  const isVideo = file.mimetype?.startsWith("video");

  // For videos, probe the actual duration (in seconds) so course length is
  // calculated correctly. Cloudinary used to provide this automatically.
  let duration;
  if (isVideo) {
    try {
      duration = await getVideoDurationInSeconds(destPath, ffprobeStatic.path);
    } catch (err) {
      console.error("Could not read video duration:", err.message);
      duration = 0;
    }
  }

  const baseUrl =
    process.env.SERVER_URL || `http://localhost:${process.env.PORT || 4000}`;
  const publicUrl = `${baseUrl}/uploads/${safeFolder}/${uniqueName}`;

  return {
    secure_url: publicUrl,
    url: publicUrl,
    public_id: `${safeFolder}/${uniqueName}`,
    resource_type: isVideo ? "video" : "image",
    duration,
  };
}

// Upload to Cloudinary (original behaviour) — used when STORAGE=cloudinary
async function uploadToCloudinary(file, folder, height, quality) {
  const options = { folder };
  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";

  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  // Defaults to local disk storage so uploads work without Cloudinary.
  // Set STORAGE=cloudinary in the .env to use Cloudinary instead.
  if (process.env.STORAGE === "cloudinary") {
    return uploadToCloudinary(file, folder, height, quality);
  }
  return uploadToLocal(file, folder);
};
