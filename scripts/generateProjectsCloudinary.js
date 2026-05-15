// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";
// import dotenv from "dotenv";

// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const categoryMap = {
//   illustration: "illustration",
//   sketches: "sketches",
//   motion_graphics: "motion",
//   "3d": "3d",
// };

// async function generateProjects() {
//   const result = await cloudinary.search
//     .expression("folder:benjamin/*")
//     .max_results(500)
//     .execute();

//   const projects = result.resources.map((item, index) => {
//     const publicIdParts = item.public_id.split("/");
//     const folder = publicIdParts[1];

//     return {
//       id: index + 1,
//       src: item.secure_url,
//       category: categoryMap[folder] || "illustration",
//     };
//   });

//   const content = `
// // ============================================================
// // AUTO GENERATED PROJECTS
// // ============================================================

// export const PROJECTS = ${JSON.stringify(projects, null, 2)};
// `;

//   fs.writeFileSync("./src/data/projectData.js", content);

//   console.log("projectData.js generated successfully");
// }

// generateProjects();

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const folders = [
  {
    cloudinaryFolder: "benjamin/illustration",
    category: "illustration",
  },
  {
    cloudinaryFolder: "benjamin/sketches",
    category: "sketches",
  },
  {
    cloudinaryFolder: "benjamin/motion_graphics",
    category: "motion",
  },
  {
    cloudinaryFolder: "benjamin/3d",
    category: "3d",
  },
];

async function generateProjects() {
  let allProjects = [];
  let currentId = 1;

  for (const folderData of folders) {
    const result = await cloudinary.search
      .expression(`folder="${folderData.cloudinaryFolder}"`)
      .max_results(500)
      .execute();

    const projects = result.resources.map((item) => ({
      id: currentId++,
      src: item.secure_url,
      category: folderData.category,
    }));

    allProjects.push(...projects);
  }

  const content = `
// ============================================================
// AUTO GENERATED PROJECTS
// ============================================================

export const PROJECTS = ${JSON.stringify(allProjects, null, 2)};
`;

  fs.writeFileSync("./src/data/projectData.js", content);

  console.log("projectData.js generated successfully");
}

generateProjects();
