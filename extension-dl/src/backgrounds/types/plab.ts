export interface Root {
  actuate: string;
  adaptationSet: AdaptationSet[];
  any: any[];
  assetIdentifier: any;
  baseURL: any[];
  bitstreamSwitching: boolean;
  duration: string;
  eventStream: any[];
  href: any;
  id: string;
  otherAttributes: OtherAttributes8;
  segmentBase: any;
  segmentList: any;
  segmentTemplate: any;
  start: any;
  subset: any[];
  supplementalProperty: SupplementalProperty[];
}

export interface AdaptationSet {
  accessibility: any[];
  actuate: string;
  any: any[];
  audioChannelConfiguration: any[];
  audioSamplingRate: any;
  baseURL: any[];
  bitstreamSwitching: any;
  codecs: any;
  codingDependency: any;
  contentComponent: any[];
  contentProtection: any[];
  contentType: any;
  essentialProperty: any[];
  framePacking: any[];
  frameRate: any;
  group: any;
  height: any;
  href: any;
  id: any;
  inbandEventStream: any[];
  lang: any;
  maxBandwidth: any;
  maxFrameRate: any;
  maxHeight: number;
  maxPlayoutRate: any;
  maxWidth: number;
  maximumSAPPeriod: any;
  mimeType: string;
  minBandwidth: any;
  minFrameRate: any;
  minHeight: any;
  minWidth: any;
  otherAttributes: OtherAttributes;
  par: any;
  profiles: any;
  rating: any[];
  representation: Representation[];
  role: Role[];
  sar: any;
  scanType: any;
  segmentAlignment: string;
  segmentBase: any;
  segmentList: any;
  segmentProfiles: any;
  segmentTemplate: any;
  startWithSAP: any;
  subsegmentAlignment: string;
  subsegmentStartsWithSAP: number;
  supplementalProperty: any[];
  switching: any[];
  viewpoint: any[];
  width: any;
}

export interface OtherAttributes {
  m3u?: string;
}

export interface Representation {
  any: Any[];
  audioChannelConfiguration: any[];
  audioSamplingRate: any;
  bandwidth: number;
  baseURL: BaseUrl[];
  codecs: string;
  codingDependency: any;
  contentProtection: any[];
  dependencyId: any[];
  essentialProperty: any[];
  framePacking: any[];
  frameRate: string;
  height: number;
  id: string;
  inbandEventStream: any[];
  maxPlayoutRate: any;
  maximumSAPPeriod: any;
  mediaStreamStructureId: any[];
  mimeType?: string;
  otherAttributes: OtherAttributes3;
  profiles: any;
  qualityRanking: any;
  sar: any;
  scanType: any;
  segmentBase: any;
  segmentList: any;
  segmentProfiles: any;
  segmentTemplate?: SegmentTemplate;
  startWithSAP: any;
  subRepresentation: any[];
  supplementalProperty: any[];
  switching: any[];
  width: number;
}

export interface Any {
  kind: string;
  value: string;
}

export interface BaseUrl {
  availabilityTimeComplete: any;
  availabilityTimeOffset: any;
  byteRange: any;
  otherAttributes: OtherAttributes2;
  serviceLocation: any;
  value: string;
}

export interface OtherAttributes2 {}

export interface OtherAttributes3 {
  m3u?: string;
}

export interface SegmentTemplate {
  any: any[];
  availabilityTimeComplete: any;
  availabilityTimeOffset: any;
  bitstreamSwitching: any;
  bitstreamSwitchingAttr: any;
  duration: any;
  index: any;
  indexRange: any;
  indexRangeExact: boolean;
  initialization: any;
  initializationAttr: any;
  media: string;
  otherAttributes: OtherAttributes4;
  presentationTimeOffset: any;
  representationIndex: any;
  segmentTimeline: SegmentTimeline;
  startNumber: number;
  timescale: number;
}

export interface OtherAttributes4 {}

export interface SegmentTimeline {
  any: any[];
  otherAttributes: OtherAttributes5;
  s: GeneratedType[];
}

export interface OtherAttributes5 {}

export interface GeneratedType {
  d: number;
  n: any;
  otherAttributes: OtherAttributes6;
  r: number;
  t: number;
}

export interface OtherAttributes6 {}

export interface Role {
  any: Any2[];
  id: any;
  otherAttributes: OtherAttributes7;
  schemeIdUri: string;
  value: any;
}

export interface Any2 {
  contentEncoding: string;
  contentType: string;
  enable: boolean;
  property: Property[];
  source: Source;
  version: string;
}

export interface Property {
  name: string;
  value: string;
}

export interface Source {
  type: string;
  value: string;
}

export interface OtherAttributes7 {}

export interface OtherAttributes8 {}

export interface SupplementalProperty {
  any: Any3[];
  id: any;
  otherAttributes: OtherAttributes9;
  schemeIdUri: string;
  value: any;
}

export interface Any3 {
  channel: any;
  cover?: Cover[];
  description: any;
  homeUrl: any;
  lang?: string;
  relationUrl: any;
  title?: string;
  url: any;
  casting?: any[];
  creator?: Creator[];
  provider?: Provider[];
  seekingThumbnail?: SeekingThumbnail[];
  thumbnailSet?: ThumbnailSet[];
  tid: any;
  tracking?: Tracking[];
  enable: any;
  info: any;
  source: any;
}

export interface Cover {
  recommended: any;
  type: string;
  value: string;
}

export interface Creator {
  id: string;
  name: string;
  type: any;
}

export interface Provider {
  id: any;
  name: string;
}

export interface SeekingThumbnail {
  page: Page;
  piece: Piece;
  source: Source2;
  type: string;
}

export interface Page {
  column: number;
  row: number;
  total: number;
  totalPieceSize: number;
}

export interface Piece {
  height: number;
  interval: number;
  intervalType: string;
  width: number;
}

export interface Source2 {
  patternType: string;
  value: string;
}

export interface ThumbnailSet {
  size: number;
  thumbnail: Thumbnail[];
  type: string;
}

export interface Thumbnail {
  source: Source3;
  targetTime: string;
}

export interface Source3 {
  type: string;
  value: string;
}

export interface Tracking {
  callbackData: string;
  event: string;
  param: Param;
  timeTable: string;
  type: string;
  url: string;
}

export interface Param {
  contentProvider: string;
}

export interface OtherAttributes9 {}

/* 
{
    "actuate": "ON_REQUEST",
    "adaptationSet": [
        {
            "accessibility": [],
            "actuate": "ON_REQUEST",
            "any": [],
            "audioChannelConfiguration": [],
            "audioSamplingRate": null,
            "baseURL": [],
            "bitstreamSwitching": null,
            "codecs": null,
            "codingDependency": null,
            "contentComponent": [],
            "contentProtection": [],
            "contentType": null,
            "essentialProperty": [],
            "framePacking": [],
            "frameRate": null,
            "group": null,
            "height": null,
            "href": null,
            "id": null,
            "inbandEventStream": [],
            "lang": null,
            "maxBandwidth": null,
            "maxFrameRate": null,
            "maxHeight": 1080,
            "maxPlayoutRate": null,
            "maxWidth": 1920,
            "maximumSAPPeriod": null,
            "mimeType": "video/mp4",
            "minBandwidth": null,
            "minFrameRate": null,
            "minHeight": null,
            "minWidth": null,
            "otherAttributes": {},
            "par": null,
            "profiles": null,
            "rating": [],
            "representation": [
                {
                    "any": [
                        {
                            "kind": "fps",
                            "value": "60"
                        },
                        {
                            "kind": "resolution",
                            "value": "1080"
                        }
                    ],
                    "audioChannelConfiguration": [],
                    "audioSamplingRate": null,
                    "bandwidth": 8384512,
                    "baseURL": [
                        {
                            "availabilityTimeComplete": null,
                            "availabilityTimeOffset": null,
                            "byteRange": null,
                            "otherAttributes": {},
                            "serviceLocation": null,
                            "value": "https://b01-kr-naver-vod.pstatic.net/glive/c/read/v2/VOD_ALPHA/glive_2024_07_06_0/97612c23-3aee-11ef-9a62-80615f0bcec6.mp4?_lsu_sa_=6015c8fdd19162164dd3756e6c751fbede3e3fa8820bff5137670dc067df3505e520fa4c67c5620c70073d029c395b3165095810e47666e8fbb59e300903f767f814dd5a287841feb5e1dbfc6565d317"
                        }
                    ],
                    "codecs": "avc1.640028,mp4a.40.2",
                    "codingDependency": null,
                    "contentProtection": [],
                    "dependencyId": [],
                    "essentialProperty": [],
                    "framePacking": [],
                    "frameRate": "60",
                    "height": 1080,
                    "id": "PD_1080P_1920_8000_192",
                    "inbandEventStream": [],
                    "maxPlayoutRate": null,
                    "maximumSAPPeriod": null,
                    "mediaStreamStructureId": [],
                    "mimeType": "video/mp4",
                    "otherAttributes": {},
                    "profiles": null,
                    "qualityRanking": null,
                    "sar": null,
                    "scanType": null,
                    "segmentBase": null,
                    "segmentList": null,
                    "segmentProfiles": null,
                    "segmentTemplate": null,
                    "startWithSAP": null,
                    "subRepresentation": [],
                    "supplementalProperty": [],
                    "switching": [],
                    "width": 1920
                },
                {
                    "any": [
                        {
                            "kind": "fps",
                            "value": "30"
                        },
                        {
                            "kind": "resolution",
                            "value": "144"
                        }
                    ],
                    "audioChannelConfiguration": [],
                    "audioSamplingRate": null,
                    "bandwidth": 166912,
                    "baseURL": [
                        {
                            "availabilityTimeComplete": null,
                            "availabilityTimeOffset": null,
                            "byteRange": null,
                            "otherAttributes": {},
                            "serviceLocation": null,
                            "value": "https://b01-kr-naver-vod.pstatic.net/glive/c/read/v2/VOD_ALPHA/glive_2024_07_06_2/97641254-3aee-11ef-9a62-80615f0bcec6.mp4?_lsu_sa_=6165c2f9018e6436cad6c50568c5bbb87eba3cf8980fdf9a3fe7e5cad7243b85af2d8a0f6f25d104c0a53742d9322b18dc3135252112615dfc53bd332a0ffb3a85cca2b3444fa09acf700bc25e3139dc"
                        }
                    ],
                    "codecs": "avc1.4dc00c,mp4a.40.2",
                    "codingDependency": null,
                    "contentProtection": [],
                    "dependencyId": [],
                    "essentialProperty": [],
                    "framePacking": [],
                    "frameRate": "30",
                    "height": 144,
                    "id": "PD_144P_256_128_64",
                    "inbandEventStream": [],
                    "maxPlayoutRate": null,
                    "maximumSAPPeriod": null,
                    "mediaStreamStructureId": [],
                    "mimeType": "video/mp4",
                    "otherAttributes": {},
                    "profiles": null,
                    "qualityRanking": null,
                    "sar": null,
                    "scanType": null,
                    "segmentBase": null,
                    "segmentList": null,
                    "segmentProfiles": null,
                    "segmentTemplate": null,
                    "startWithSAP": null,
                    "subRepresentation": [],
                    "supplementalProperty": [],
                    "switching": [],
                    "width": 256
                },
                {
                    "any": [
                        {
                            "kind": "fps",
                            "value": "60"
                        },
                        {
                            "kind": "resolution",
                            "value": "720"
                        }
                    ],
                    "audioChannelConfiguration": [],
                    "audioSamplingRate": null,
                    "bandwidth": 4290560,
                    "baseURL": [
                        {
                            "availabilityTimeComplete": null,
                            "availabilityTimeOffset": null,
                            "byteRange": null,
                            "otherAttributes": {},
                            "serviceLocation": null,
                            "value": "https://b01-kr-naver-vod.pstatic.net/glive/c/read/v2/VOD_ALPHA/glive_2024_07_06_3/975e45f2-3aee-11ef-9a62-80615f0bcec6.mp4?_lsu_sa_=68650cfee1be61a6add8f5c2605520b62eab3688c304bfde387771c8f7b63a9514287acf6ed5a903801a3952bc319b52e338e3ff81869b4046124d3e04ed902a0539b4830a758ee78ff3612848aba659"
                        }
                    ],
                    "codecs": "avc1.4d401f,mp4a.40.2",
                    "codingDependency": null,
                    "contentProtection": [],
                    "dependencyId": [],
                    "essentialProperty": [],
                    "framePacking": [],
                    "frameRate": "60",
                    "height": 720,
                    "id": "PD_720P_1280_4000_192",
                    "inbandEventStream": [],
                    "maxPlayoutRate": null,
                    "maximumSAPPeriod": null,
                    "mediaStreamStructureId": [],
                    "mimeType": "video/mp4",
                    "otherAttributes": {},
                    "profiles": null,
                    "qualityRanking": null,
                    "sar": null,
                    "scanType": null,
                    "segmentBase": null,
                    "segmentList": null,
                    "segmentProfiles": null,
                    "segmentTemplate": null,
                    "startWithSAP": null,
                    "subRepresentation": [],
                    "supplementalProperty": [],
                    "switching": [],
                    "width": 1280
                }
            ],
            "role": [
                {
                    "any": [
                        {
                            "contentEncoding": "BASE_64_SAFE",
                            "contentType": "application/octet-stream",
                            "enable": true,
                            "property": [
                                {
                                    "name": "targetLoudness",
                                    "value": "-16.0"
                                },
                                {
                                    "name": "mode",
                                    "value": "youtube-like"
                                }
                            ],
                            "source": {
                                "type": "STRING",
                                "value": "AQAAAAEAIT8BPQEAvwZ3LAAgWzB3LAQMUaISDQGaAQLvBAPRCASkDgWYEAm7YhCFwQEV2BIg3BFAgziAAYxAgAKcEYEEygEBAAAAAQAAAwHBDP____8="
                            },
                            "version": "1.1.4"
                        }
                    ],
                    "id": null,
                    "otherAttributes": {},
                    "schemeIdUri": "urn:naver:vod:loudnessnormalize:2019-0",
                    "value": null
                }
            ],
            "sar": null,
            "scanType": null,
            "segmentAlignment": "false",
            "segmentBase": null,
            "segmentList": null,
            "segmentProfiles": null,
            "segmentTemplate": null,
            "startWithSAP": null,
            "subsegmentAlignment": "false",
            "subsegmentStartsWithSAP": 0,
            "supplementalProperty": [],
            "switching": [],
            "viewpoint": [],
            "width": null
        },
        {
            "accessibility": [],
            "actuate": "ON_REQUEST",
            "any": [],
            "audioChannelConfiguration": [],
            "audioSamplingRate": null,
            "baseURL": [],
            "bitstreamSwitching": null,
            "codecs": null,
            "codingDependency": null,
            "contentComponent": [],
            "contentProtection": [],
            "contentType": null,
            "essentialProperty": [],
            "framePacking": [],
            "frameRate": null,
            "group": null,
            "height": null,
            "href": null,
            "id": null,
            "inbandEventStream": [],
            "lang": null,
            "maxBandwidth": null,
            "maxFrameRate": null,
            "maxHeight": 1080,
            "maxPlayoutRate": null,
            "maxWidth": 1920,
            "maximumSAPPeriod": null,
            "mimeType": "video/mp2t",
            "minBandwidth": null,
            "minFrameRate": null,
            "minHeight": null,
            "minWidth": null,
            "otherAttributes": {
                "m3u": "https://b01-kr-naver-vod.pstatic.net/glive/c/read/v2/VOD_ALPHA/glive_2024_07_06_3/hls/37194836-3b2f-11ef-99b8-48df37e302ae.m3u8?_lsu_sa_=6cf5d2f6a1e96a9623d6c52a6df515b91e0b3f389a013fae33e7d9c9f7d13bf5112cca8767a54c0a902f3f42b4324b35455547fc1004691a1dc68571ad036d467c0b5c9e395f5cac827929cd6e5a8097f93600829fa908d974d5e4ac6431c07a5ed5fb69455968066515817d208e9f7653f53e2eaadc3d4be45a29239d97c1ad"
            },
            "par": null,
            "profiles": null,
            "rating": [],
            "representation": [
                {
                    "any": [
                        {
                            "kind": "fps",
                            "value": "60"
                        },
                        {
                            "kind": "resolution",
                            "value": "1080"
                        }
                    ],
                    "audioChannelConfiguration": [],
                    "audioSamplingRate": null,
                    "bandwidth": 8384512,
                    "baseURL": [
                        {
                            "availabilityTimeComplete": null,
                            "availabilityTimeOffset": null,
                            "byteRange": null,
                            "otherAttributes": {},
                            "serviceLocation": null,
                            "value": "https://b01-kr-naver-vod.pstatic.net/glive/c/read/v2/VOD_ALPHA/glive_2024_07_06_3/hls/"
                        }
                    ],
                    "codecs": "avc1.640028,mp4a.40.2",
                    "codingDependency": null,
                    "contentProtection": [],
                    "dependencyId": [],
                    "essentialProperty": [],
                    "framePacking": [],
                    "frameRate": "60",
                    "height": 1080,
                    "id": "89ff1bb7-3b29-11ef-bb41-a0369ffb34e8",
                    "inbandEventStream": [],
                    "maxPlayoutRate": null,
                    "maximumSAPPeriod": null,
                    "mediaStreamStructureId": [],
                    "mimeType": null,
                    "otherAttributes": {
                        "m3u": "https://b01-kr-naver-vod.pstatic.net/glive/c/read/v2/VOD_ALPHA/glive_2024_07_06_3/hls/89ff1bb7-3b29-11ef-bb41-a0369ffb34e8.m3u8?_lsu_sa_=6cf5d2f6a1e96a9623d6c52a6df515b91e0b3f389a013fae33e7d9c9f7d13bf5112cca8767a54c0a902f3f42b4324b35455547fc1004691a1dc68571ad036d467c0b5c9e395f5cac827929cd6e5a8097f93600829fa908d974d5e4ac6431c07a5ed5fb69455968066515817d208e9f7653f53e2eaadc3d4be45a29239d97c1ad"
                    },
                    "profiles": null,
                    "qualityRanking": null,
                    "sar": null,
                    "scanType": null,
                    "segmentBase": null,
                    "segmentList": null,
                    "segmentProfiles": null,
                    "segmentTemplate": {
                        "any": [],
                        "availabilityTimeComplete": null,
                        "availabilityTimeOffset": null,
                        "bitstreamSwitching": null,
                        "bitstreamSwitchingAttr": null,
                        "duration": null,
                        "index": null,
                        "indexRange": null,
                        "indexRangeExact": false,
                        "initialization": null,
                        "initializationAttr": null,
                        "media": "$RepresentationID$-$Number%06d$.ts?_lsu_sa_=6cf5d2f6a1e96a9623d6c52a6df515b91e0b3f389a013fae33e7d9c9f7d13bf5112cca8767a54c0a902f3f42b4324b35455547fc1004691a1dc68571ad036d467c0b5c9e395f5cac827929cd6e5a8097f93600829fa908d974d5e4ac6431c07a5ed5fb69455968066515817d208e9f7653f53e2eaadc3d4be45a29239d97c1ad",
                        "otherAttributes": {},
                        "presentationTimeOffset": null,
                        "representationIndex": null,
                        "segmentTimeline": {
                            "any": [],
                            "otherAttributes": {},
                            "s": [
                                {
                                    "d": 4000,
                                    "n": null,
                                    "otherAttributes": {},
                                    "r": 5991,
                                    "t": 0
                                },
                                {
                                    "d": 3100,
                                    "n": null,
                                    "otherAttributes": {},
                                    "r": 0,
                                    "t": 23968000
                                }
                            ]
                        },
                        "startNumber": 0,
                        "timescale": 1000
                    },
                    "startWithSAP": null,
                    "subRepresentation": [],
                    "supplementalProperty": [],
                    "switching": [],
                    "width": 1920
                },
                {
                    "any": [
                        {
                            "kind": "fps",
                            "value": "30"
                        },
                        {
                            "kind": "resolution",
                            "value": "144"
                        }
                    ],
                    "audioChannelConfiguration": [],
                    "audioSamplingRate": null,
                    "bandwidth": 166912,
                    "baseURL": [
                        {
                            "availabilityTimeComplete": null,
                            "availabilityTimeOffset": null,
                            "byteRange": null,
                            "otherAttributes": {},
                            "serviceLocation": null,
                            "value": "https://b01-kr-naver-vod.pstatic.net/glive/c/read/v2/VOD_ALPHA/glive_2024_07_06_3/hls/"
                        }
                    ],
                    "codecs": "avc1.4dc00c,mp4a.40.2",
                    "codingDependency": null,
                    "contentProtection": [],
                    "dependencyId": [],
                    "essentialProperty": [],
                    "framePacking": [],
                    "frameRate": "30",
                    "height": 144,
                    "id": "91840483-3b08-11ef-b38d-a0369ffdb06c",
                    "inbandEventStream": [],
                    "maxPlayoutRate": null,
                    "maximumSAPPeriod": null,
                    "mediaStreamStructureId": [],
                    "mimeType": null,
                    "otherAttributes": {
                        "m3u": "https://b01-kr-naver-vod.pstatic.net/glive/c/read/v2/VOD_ALPHA/glive_2024_07_06_3/hls/91840483-3b08-11ef-b38d-a0369ffdb06c.m3u8?_lsu_sa_=6cf5d2f6a1e96a9623d6c52a6df515b91e0b3f389a013fae33e7d9c9f7d13bf5112cca8767a54c0a902f3f42b4324b35455547fc1004691a1dc68571ad036d467c0b5c9e395f5cac827929cd6e5a8097f93600829fa908d974d5e4ac6431c07a5ed5fb69455968066515817d208e9f7653f53e2eaadc3d4be45a29239d97c1ad"
                    },
                    "profiles": null,
                    "qualityRanking": null,
                    "sar": null,
                    "scanType": null,
                    "segmentBase": null,
                    "segmentList": null,
                    "segmentProfiles": null,
                    "segmentTemplate": {
                        "any": [],
                        "availabilityTimeComplete": null,
                        "availabilityTimeOffset": null,
                        "bitstreamSwitching": null,
                        "bitstreamSwitchingAttr": null,
                        "duration": null,
                        "index": null,
                        "indexRange": null,
                        "indexRangeExact": false,
                        "initialization": null,
                        "initializationAttr": null,
                        "media": "$RepresentationID$-$Number%06d$.ts?_lsu_sa_=6cf5d2f6a1e96a9623d6c52a6df515b91e0b3f389a013fae33e7d9c9f7d13bf5112cca8767a54c0a902f3f42b4324b35455547fc1004691a1dc68571ad036d467c0b5c9e395f5cac827929cd6e5a8097f93600829fa908d974d5e4ac6431c07a5ed5fb69455968066515817d208e9f7653f53e2eaadc3d4be45a29239d97c1ad",
                        "otherAttributes": {},
                        "presentationTimeOffset": null,
                        "representationIndex": null,
                        "segmentTimeline": {
                            "any": [],
                            "otherAttributes": {},
                            "s": [
                                {
                                    "d": 4000,
                                    "n": null,
                                    "otherAttributes": {},
                                    "r": 5991,
                                    "t": 0
                                },
                                {
                                    "d": 3100,
                                    "n": null,
                                    "otherAttributes": {},
                                    "r": 0,
                                    "t": 23968000
                                }
                            ]
                        },
                        "startNumber": 0,
                        "timescale": 1000
                    },
                    "startWithSAP": null,
                    "subRepresentation": [],
                    "supplementalProperty": [],
                    "switching": [],
                    "width": 256
                },
                {
                    "any": [
                        {
                            "kind": "fps",
                            "value": "60"
                        },
                        {
                            "kind": "resolution",
                            "value": "720"
                        }
                    ],
                    "audioChannelConfiguration": [],
                    "audioSamplingRate": null,
                    "bandwidth": 4290560,
                    "baseURL": [
                        {
                            "availabilityTimeComplete": null,
                            "availabilityTimeOffset": null,
                            "byteRange": null,
                            "otherAttributes": {},
                            "serviceLocation": null,
                            "value": "https://b01-kr-naver-vod.pstatic.net/glive/c/read/v2/VOD_ALPHA/glive_2024_07_06_3/hls/"
                        }
                    ],
                    "codecs": "avc1.4d401f,mp4a.40.2",
                    "codingDependency": null,
                    "contentProtection": [],
                    "dependencyId": [],
                    "essentialProperty": [],
                    "framePacking": [],
                    "frameRate": "60",
                    "height": 720,
                    "id": "dad4f1c3-3b22-11ef-99b8-48df37e302ae",
                    "inbandEventStream": [],
                    "maxPlayoutRate": null,
                    "maximumSAPPeriod": null,
                    "mediaStreamStructureId": [],
                    "mimeType": null,
                    "otherAttributes": {
                        "m3u": "https://b01-kr-naver-vod.pstatic.net/glive/c/read/v2/VOD_ALPHA/glive_2024_07_06_3/hls/dad4f1c3-3b22-11ef-99b8-48df37e302ae.m3u8?_lsu_sa_=6cf5d2f6a1e96a9623d6c52a6df515b91e0b3f389a013fae33e7d9c9f7d13bf5112cca8767a54c0a902f3f42b4324b35455547fc1004691a1dc68571ad036d467c0b5c9e395f5cac827929cd6e5a8097f93600829fa908d974d5e4ac6431c07a5ed5fb69455968066515817d208e9f7653f53e2eaadc3d4be45a29239d97c1ad"
                    },
                    "profiles": null,
                    "qualityRanking": null,
                    "sar": null,
                    "scanType": null,
                    "segmentBase": null,
                    "segmentList": null,
                    "segmentProfiles": null,
                    "segmentTemplate": {
                        "any": [],
                        "availabilityTimeComplete": null,
                        "availabilityTimeOffset": null,
                        "bitstreamSwitching": null,
                        "bitstreamSwitchingAttr": null,
                        "duration": null,
                        "index": null,
                        "indexRange": null,
                        "indexRangeExact": false,
                        "initialization": null,
                        "initializationAttr": null,
                        "media": "$RepresentationID$-$Number%06d$.ts?_lsu_sa_=6cf5d2f6a1e96a9623d6c52a6df515b91e0b3f389a013fae33e7d9c9f7d13bf5112cca8767a54c0a902f3f42b4324b35455547fc1004691a1dc68571ad036d467c0b5c9e395f5cac827929cd6e5a8097f93600829fa908d974d5e4ac6431c07a5ed5fb69455968066515817d208e9f7653f53e2eaadc3d4be45a29239d97c1ad",
                        "otherAttributes": {},
                        "presentationTimeOffset": null,
                        "representationIndex": null,
                        "segmentTimeline": {
                            "any": [],
                            "otherAttributes": {},
                            "s": [
                                {
                                    "d": 4000,
                                    "n": null,
                                    "otherAttributes": {},
                                    "r": 5991,
                                    "t": 0
                                },
                                {
                                    "d": 3100,
                                    "n": null,
                                    "otherAttributes": {},
                                    "r": 0,
                                    "t": 23968000
                                }
                            ]
                        },
                        "startNumber": 0,
                        "timescale": 1000
                    },
                    "startWithSAP": null,
                    "subRepresentation": [],
                    "supplementalProperty": [],
                    "switching": [],
                    "width": 1280
                }
            ],
            "role": [
                {
                    "any": [
                        {
                            "contentEncoding": "BASE_64_SAFE",
                            "contentType": "application/octet-stream",
                            "enable": true,
                            "property": [
                                {
                                    "name": "targetLoudness",
                                    "value": "-16.0"
                                },
                                {
                                    "name": "mode",
                                    "value": "youtube-like"
                                }
                            ],
                            "source": {
                                "type": "STRING",
                                "value": "AQAAAAEAIT8BPQEAvwZ3LAAgWzB3LAQMUaISDQGaAQLvBAPRCASkDgWYEAm7YhCFwQEV2BIg3BFAgziAAYxAgAKcEYEEygEBAAAAAQAAAwHBDP____8="
                            },
                            "version": "1.1.4"
                        }
                    ],
                    "id": null,
                    "otherAttributes": {},
                    "schemeIdUri": "urn:naver:vod:loudnessnormalize:2019-0",
                    "value": null
                }
            ],
            "sar": null,
            "scanType": null,
            "segmentAlignment": "false",
            "segmentBase": null,
            "segmentList": null,
            "segmentProfiles": null,
            "segmentTemplate": null,
            "startWithSAP": null,
            "subsegmentAlignment": "false",
            "subsegmentStartsWithSAP": 0,
            "supplementalProperty": [],
            "switching": [],
            "viewpoint": [],
            "width": null
        }
    ],
    "any": [],
    "assetIdentifier": null,
    "baseURL": [],
    "bitstreamSwitching": true,
    "duration": "P0Y0M0DT6H39M31.136S",
    "eventStream": [],
    "href": null,
    "id": "26F8F68C7EAB2AF82B67C2262953FCCA04AD",
    "otherAttributes": {},
    "segmentBase": null,
    "segmentList": null,
    "segmentTemplate": null,
    "start": null,
    "subset": [],
    "supplementalProperty": [
        {
            "any": [
                {
                    "channel": null,
                    "cover": [
                        {
                            "recommended": null,
                            "type": "URL",
                            "value": "https://video-phinf.pstatic.net/20240706_19/1720198194317RrXjz_JPEG/QFFG2iwpHo_03.jpg"
                        }
                    ],
                    "description": null,
                    "homeUrl": null,
                    "lang": "en-US",
                    "relationUrl": null,
                    "title": "포켓로그 풀타입 챌린지ㅇㅅㅇ;;",
                    "url": null
                },
                {
                    "casting": [],
                    "creator": [
                        {
                            "id": "6e06****************************",
                            "name": "6e06****************************",
                            "type": null
                        }
                    ],
                    "provider": [
                        {
                            "id": null,
                            "name": "NAVER"
                        }
                    ]
                },
                {
                    "seekingThumbnail": [
                        {
                            "page": {
                                "column": 10,
                                "row": 10,
                                "total": 24,
                                "totalPieceSize": 2399
                            },
                            "piece": {
                                "height": 180,
                                "interval": 10000,
                                "intervalType": "MILLISECOND",
                                "width": 320
                            },
                            "source": {
                                "patternType": "SEQUENCE_PATTERN",
                                "value": "https://resources-rmcnmv.pstatic.net/glive/c/read/v2/VOD_ALPHA/glive_2024_07_06_2/dae21125-3b22-11ef-99b8-48df37e302ae/sprite_69fff15a-3b23-11ef-8609-48df375b65a4_#.jpg"
                            },
                            "type": "L_10_X_10"
                        }
                    ],
                    "thumbnailSet": [
                        {
                            "size": 10,
                            "thumbnail": [
                                {
                                    "source": {
                                        "type": "URL",
                                        "value": "https://video-phinf.pstatic.net/20240706_244/1720198194242akDLc_JPEG/QFFG2iwpHo_01.jpg?type=s80"
                                    },
                                    "targetTime": "P0Y0M0DT0H0M0.000S"
                                },
                                {
                                    "source": {
                                        "type": "URL",
                                        "value": "https://video-phinf.pstatic.net/20240706_268/1720198194277kO4xr_JPEG/QFFG2iwpHo_02.jpg?type=s80"
                                    },
                                    "targetTime": "P0Y0M0DT0H39M57.000S"
                                },
                                {
                                    "source": {
                                        "type": "URL",
                                        "value": "https://video-phinf.pstatic.net/20240706_19/1720198194317RrXjz_JPEG/QFFG2iwpHo_03.jpg?type=s80"
                                    },
                                    "targetTime": "P0Y0M0DT1H19M54.000S"
                                },
                                {
                                    "source": {
                                        "type": "URL",
                                        "value": "https://video-phinf.pstatic.net/20240706_198/1720198194360aap1g_JPEG/QFFG2iwpHo_04.jpg?type=s80"
                                    },
                                    "targetTime": "P0Y0M0DT1H59M51.000S"
                                },
                                {
                                    "source": {
                                        "type": "URL",
                                        "value": "https://video-phinf.pstatic.net/20240706_141/1720198194432e3509_JPEG/QFFG2iwpHo_05.jpg?type=s80"
                                    },
                                    "targetTime": "P0Y0M0DT2H39M48.000S"
                                },
                                {
                                    "source": {
                                        "type": "URL",
                                        "value": "https://video-phinf.pstatic.net/20240706_163/172019819450595l2l_JPEG/QFFG2iwpHo_06.jpg?type=s80"
                                    },
                                    "targetTime": "P0Y0M0DT3H19M46.000S"
                                },
                                {
                                    "source": {
                                        "type": "URL",
                                        "value": "https://video-phinf.pstatic.net/20240706_96/1720198194583lJDL4_JPEG/QFFG2iwpHo_07.jpg?type=s80"
                                    },
                                    "targetTime": "P0Y0M0DT3H59M43.000S"
                                },
                                {
                                    "source": {
                                        "type": "URL",
                                        "value": "https://video-phinf.pstatic.net/20240706_95/1720198194664aD1BB_JPEG/QFFG2iwpHo_08.jpg?type=s80"
                                    },
                                    "targetTime": "P0Y0M0DT4H39M40.000S"
                                },
                                {
                                    "source": {
                                        "type": "URL",
                                        "value": "https://video-phinf.pstatic.net/20240706_252/1720198194701KcNSA_JPEG/QFFG2iwpHo_09.jpg?type=s80"
                                    },
                                    "targetTime": "P0Y0M0DT5H19M37.000S"
                                },
                                {
                                    "source": {
                                        "type": "URL",
                                        "value": "https://video-phinf.pstatic.net/20240706_128/1720198194786Mm0oO_JPEG/QFFG2iwpHo_10.jpg?type=s80"
                                    },
                                    "targetTime": "P0Y0M0DT5H59M34.000S"
                                }
                            ],
                            "type": "SCENE"
                        }
                    ]
                },
                {
                    "tid": null,
                    "tracking": [
                        {
                            "callbackData": "{\"cpn\":\"NAVER\",\"cpid\":\"NAVER\",\"tid\":null}",
                            "event": "COUNT",
                            "param": {
                                "contentProvider": "NAVER"
                            },
                            "timeTable": "[0]",
                            "type": "NORMAL",
                            "url": "https://apis.naver.com/rmcnmv/rmcnmv/PlayCount.json?v=1&refCode=https://chzzk.naver.com/video/2381432&key=V122f121ca9a6d01c7b8904cc676647dae467d6cc2691a9b5b5a68486313024caed2e04cc676647dae467&tid=null&vid=26F8F68C7EAB2AF82B67C2262953FCCA04AD&cc=KR&sid=0&inout=in"
                        },
                        {
                            "callbackData": "{\"cpn\":\"NAVER\",\"cpid\":\"NAVER\",\"tid\":null}",
                            "event": "TIME",
                            "param": {
                                "contentProvider": "NAVER"
                            },
                            "timeTable": "[0]",
                            "type": "NORMAL",
                            "url": "https://apis.naver.com/videostat/videostat/PlayTime.json?v=1&tid=null"
                        }
                    ]
                },
                {
                    "enable": null,
                    "info": null,
                    "source": null
                }
            ],
            "id": null,
            "otherAttributes": {},
            "schemeIdUri": "urn:naver:vod:information:2019",
            "value": null
        }
    ]
}
    */
