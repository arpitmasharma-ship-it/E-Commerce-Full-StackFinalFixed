import multer from "multer"; /* 👉 multer ek middleware hai👉 jo file upload handle karta hai (form-data) */
/* cb = callback */
/* null = koi error nahi */
const storage = multer.diskStorage({
  /* 👉 Hum multer ko bol rahe: 👉 "File ko disk (server storage) me save karna hai" */
  destination: function (req, file, cb) {  /* destination: Ye decide karta hai: 👉 file kis folder me save hogi */
    cb(null, "uploads/"); // 🔥 folder required /// "uploads/" = folder name
  },
  filename: function (req, file, cb) { /// 👉 File ka naam custom bana rahe ho
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage }); /* 👉 multer ko bol rahe:👉 "Ye jo storage config hai use karo" */

export default upload;