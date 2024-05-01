# 치직치지직 components

## 소개

각 파일은 자신의 기능을 아래와 같이 구현 합니다.

```ts
// 상황에 따라 async function으로 구현할 수 있습니다.
export default function initComponentName(enable: boolean) {
  if (!enable) {
    // 기능을 비활성화 할 때 실행할 코드
    return;
  }
  // 기능을 활성화 할 때 실행할 코드
}
```
