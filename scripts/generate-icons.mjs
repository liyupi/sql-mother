import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import iconGenModule from "icon-gen";

const iconGen =
  typeof iconGenModule === "function" ? iconGenModule : iconGenModule.default;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const sourceSvg = path.join(rootDir, "src", "assets", "logo.svg");
const buildDir = path.join(rootDir, "build");
const workDir = path.join(buildDir, ".icon-work");
const normalizedPng = path.join(workDir, "icon-1024.png");
const iconIcoPath = path.join(buildDir, "icon.ico");
const iconIcnsPath = path.join(buildDir, "icon.icns");
const linuxIconsDir = path.join(buildDir, "icons");

const linuxSizes = [16, 24, 32, 48, 64, 96, 128, 256, 512];
const icoSizes = [16, 24, 32, 48, 64, 128, 256];
const icnsSizes = [16, 32, 64, 128, 256, 512, 1024];

const pathExists = async (targetPath) => {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
};

const ensureSourceExists = async () => {
  if (!(await pathExists(sourceSvg))) {
    throw new Error(`Icon source not found: ${sourceSvg}`);
  }
};

const prepareOutputDirs = async () => {
  await fs.mkdir(buildDir, { recursive: true });
  await Promise.all([
    fs.rm(workDir, { recursive: true, force: true }),
    fs.rm(iconIcoPath, { force: true }),
    fs.rm(iconIcnsPath, { force: true }),
    fs.rm(linuxIconsDir, { recursive: true, force: true }),
  ]);
  await fs.mkdir(workDir, { recursive: true });
  await fs.mkdir(linuxIconsDir, { recursive: true });
};

const renderNormalizedPng = async () => {
  await sharp(sourceSvg, { density: 1024 })
    .resize(1024, 1024, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toFile(normalizedPng);
};

const generateByIconGen = async () => {
  await iconGen(normalizedPng, workDir, {
    report: true,
    ico: {
      name: "icon",
      sizes: icoSizes,
    },
    icns: {
      name: "icon",
      sizes: icnsSizes,
    },
    favicon: {
      name: "icon-",
      pngSizes: linuxSizes,
      icoSizes: [16, 24, 32, 48, 64],
    },
  });
};

const assertGeneratedFiles = async () => {
  const requiredFiles = [
    path.join(workDir, "icon.ico"),
    path.join(workDir, "icon.icns"),
    ...linuxSizes.map((size) => path.join(workDir, `icon-${size}.png`)),
  ];
  for (const filePath of requiredFiles) {
    if (!(await pathExists(filePath))) {
      throw new Error(`Expected generated file missing: ${filePath}`);
    }
  }
};

const materializeFinalOutputs = async () => {
  await Promise.all([
    fs.copyFile(path.join(workDir, "icon.ico"), iconIcoPath),
    fs.copyFile(path.join(workDir, "icon.icns"), iconIcnsPath),
  ]);

  for (const size of linuxSizes) {
    const sourcePath = path.join(workDir, `icon-${size}.png`);
    const targetPath = path.join(linuxIconsDir, `${size}x${size}.png`);
    await fs.copyFile(sourcePath, targetPath);
  }
};

const cleanup = async () => {
  await fs.rm(workDir, { recursive: true, force: true });
};

const run = async () => {
  await ensureSourceExists();
  await prepareOutputDirs();
  await renderNormalizedPng();
  await generateByIconGen();
  await assertGeneratedFiles();
  await materializeFinalOutputs();
  await cleanup();
  console.log("Icon generation completed.");
  console.log(`- Windows icon: ${iconIcoPath}`);
  console.log(`- macOS icon: ${iconIcnsPath}`);
  console.log(`- Linux icon dir: ${linuxIconsDir}`);
};

run().catch(async (error) => {
  console.error("Icon generation failed.");
  console.error(error instanceof Error ? error.message : error);
  await cleanup();
  process.exit(1);
});
