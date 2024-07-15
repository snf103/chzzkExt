export interface ActivityBadge {
  badgeNo: number;
  badgeId: string;
  imageUrl: string;
  activated: boolean;
}
export interface Badge {
  imageUrl: string;
}
export interface Subscription {
  accumulativeMonth: number;
  tier: number;
  badge: Badge;
}
export interface NicknameColor {
  colorCode: string;
}
export interface StreamingProperty {
  subscription: Subscription;
  nicknameColor: NicknameColor;
}
export interface Sender {
  userIdHash: string;
  nickname: string;
  profileImageUrl: string;
  userRoleCode: string;
  badge?: any;
  title?: any;
  verifiedMark: boolean;
  activityBadges: ActivityBadge[];
  streamingProperty: StreamingProperty;
}
export interface Color {
  dark: string;
  light: string;
}
export type ExpendedSender = Sender & {
  color: Color;
};
export interface ChatItem {
  content: string;
  sender: ExpendedSender;
}
