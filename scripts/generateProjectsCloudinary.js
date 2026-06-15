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

    //checking response from cloudinary
    /*  console.log(
      result.resources.map((item) => ({
        display_name: item.display_name,
        filename: item.filename,
        public_id: item.public_id,
      })),
    ); */

    const projects = result.resources
      .sort((a, b) =>
        a.display_name.localeCompare(b.display_name, undefined, {
          numeric: true,
          sensitivity: "base",
        }),
      )
      .map((item) => ({
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

generateProjects().catch(console.error);
