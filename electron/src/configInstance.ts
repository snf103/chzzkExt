import fs from "fs";
class Config {
  filePath: string;
  data: any;
  constructor(filePath: string) {
    this.filePath = filePath;
    this.data = {};
    this.load();
  }
  load() {
    if (fs.existsSync(this.filePath)) {
      this.data = JSON.parse(fs.readFileSync(this.filePath, "utf-8"));
    } else {
      this.save();
    }
  }
  save() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
  }

  get(key: string) {
    return this.data[key];
  }

  set(key: string, value: any) {
    this.data[key] = value;
    this.save();
  }

  delete(key: string) {
    delete this.data[key];
    this.save();
  }
}

export default Config;
