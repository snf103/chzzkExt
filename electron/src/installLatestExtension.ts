import axios from "axios";
import fs from "fs";
import { cfg, configDir, setLoadingMessage } from "./index";
import { join } from "path";
import extractZip from "extract-zip";

const installLatestExtension = async () => {
  try {
    setLoadingMessage("업데이트 확인중...");
    // check latest update from https://github.com/poikr/chzzkExt/releases/latest
    const latest = await axios.get(
      "https://api.github.com/repos/poikr/chzzkExt/releases/latest",
    );
    const latestVersion = latest.data.tag_name;
    setLoadingMessage(`업데이트(${latestVersion}) 다운로드중...`);

    // download file with name electron.zip
    const downloadUrl = latest.data.assets
      .filter((asset: any) => asset.name == "electron.zip")
      .map((asset: any) => asset.browser_download_url)[0];

    const response = await axios.get(downloadUrl, {
      responseType: "arraybuffer",
    });

    setLoadingMessage("파일 쓰는중...");

    const filePath = join(configDir, "electron.zip");
    fs.writeFileSync(filePath, Buffer.from(response.data, "binary"), "binary");

    setLoadingMessage("기존 파일 삭제중...");
    if (fs.existsSync(join(configDir, "extension")))
      fs.rmSync(join(configDir, "extension"), { recursive: true, force: true });

    setLoadingMessage("압축 풀기중...");

    await extractZip(filePath, {
      dir: join(configDir, "extension"),
    });

    setLoadingMessage("압축 파일 삭제중...");
    fs.rmSync(filePath);

    cfg.set("version", latestVersion);
  } catch (e) {
    console.error(e);
  }
};

export default installLatestExtension;
