import bypassData from "#e/bypassData";

export default function bypassNaver() {
  const overload = <T>(
    t: T,
    prop: T extends Navigator ? keyof T | "oscpu" : keyof T,
    value: unknown,
    options: { force?: boolean; configurable?: boolean; writable?: boolean } = {
      force: false,
      configurable: false,
      writable: false,
    }
  ): void => {
    let target: T = t;

    try {
      while (target !== null) {
        const descriptor = Object.getOwnPropertyDescriptor(target, prop);

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
        if (descriptor && descriptor.configurable) {
          const newAttributes: PropertyDescriptor = {
            configurable: options.configurable,
            enumerable: true,
          };

          // respect the original value getting method
          if (descriptor.get) {
            newAttributes.get = () => value;
          } else {
            newAttributes.value = value;
            newAttributes.writable = options.writable;
          }

          Object.defineProperty(target, prop, newAttributes);
        } else if (
          options.force &&
          Object.getPrototypeOf(t) === Object.getPrototypeOf(target)
        ) {
          Object.defineProperty(target, prop, {
            value,
            configurable: options.configurable,
            enumerable: true,
            writable: options.writable,
          });
        }

        target = Object.getPrototypeOf(target);
      }
    } catch (_) {
      // do nothing
    }
  };

  const n = navigator;
  overload(n, "userAgent", bypassData.bypassAgent);
  overload(n, "appVersion", bypassData.appVersion);
  overload(n, "platform", bypassData.platform, { force: true });
  overload(n, "oscpu", bypassData.oscpu);
  overload(n, "product", bypassData.product);
  overload(n, "appName", bypassData.appName);

  const na = (navigator as any).userAgentData;
  if (na) {
    overload(na.userAgentData, "mobile", false, { force: true });
    overload(na.userAgentData, "platform", "macOS", { force: true });
    overload(na.userAgentData, "brands", [
      {
        brand: "Chromium",
        version: "125",
      },
      {
        brand: "Not.A/Brand",
        version: "24",
      },
    ]);
    overload(
      na.userAgentData,
      "toJSON",
      new Proxy(na.toJSON, {
        apply(target, self, args) {
          return {
            ...Reflect.apply(target, self, args),
            brands: [
              {
                brand: "Chromium",
                version: "125",
              },
              {
                brand: "Not.A/Brand",
                version: "24",
              },
            ],
            mobile: false,
            platform: "macOS",
          };
        },
      })
    );

    overload(
      na,
      "getHighEntropyValues",
      new Proxy(na.getHighEntropyValues, {
        apply(target, self, args) {
          return new Promise(
            (resolve: (v: any) => void, reject: () => void): void => {
              // @ts-ignore
              Reflect.apply(target, self, args)
                .then((values: any): void => {
                  const data: any = {
                    ...values,
                    brands: [
                      {
                        brand: "Chromium",
                        version: "125",
                      },
                      {
                        brand: "Not.A/Brand",
                        version: "24",
                      },
                    ],
                    fullVersionList: [
                      {
                        brand: "Chromium",
                        version: "125",
                      },
                      {
                        brand: "Not.A/Brand",
                        version: "24",
                      },
                    ],
                    mobile: false,
                    model: "",
                    platform: "macOS",
                    platformVersion: ((): string => {
                      return "";
                    })(),
                  };

                  if ("uaFullVersion" in values) {
                    data.uaFullVersion = bypassData.chromeVersion;
                  }

                  resolve(data);
                })
                .catch(reject);
            }
          );
        },
      })
    );
  }
}
