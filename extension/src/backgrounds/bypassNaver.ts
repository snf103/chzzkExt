import { applyRandomAgent } from "@n/index";
import { disable } from "@n/steps/apply";
import configInstance, { defaultConfig } from "@config";
import { isElectron } from "@/utils/browserInfo";

export default async function applyBypassNaver() {
  const apply = async (enable: boolean) => {
    if (!enable) {
      await disable();
      return;
    }
    const ua = await applyRandomAgent();
    configInstance.set("userAgent", ua);
  };
  await apply(
    !isElectron && configInstance.get("bypassNaver", defaultConfig.bypassNaver)
  );
}
