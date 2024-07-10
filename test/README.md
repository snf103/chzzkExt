# 치직치지직 그리드 우회

이 문서는 그리드 우회를 뚫은 방법을 서술한 내용입니다.

## 시행착오

### 1. userAgent 우회

처음에는 userAgent를 우회하는 것만으로 간단히 성공하였지만 이후 업데이트를 통해 막혔다.

### 2. navigator 수정

`navigator.platfrom`과 같은 navigator의 값을 바꾸었으나 작동하지 않았다.

### 3. 코드 분석

치지직은 크게 2가지의 코드로 로딩된다. `desktop-media-viewer.min.js`와 `main.*.js`. 이 두 코드를 분석해가며 그리드 우회를 성공하였다.

Navigator의 수정은 먹히지 않았으므로 Chrome Devtools 기능중 하나인 Network의 Initiator를 확인하여 그리드와 관련 있을법한 코드를 모두 읽어가며 그리드의 사용유무를 결정하는 함수를 찾아, 수정하였다.

하지만 이는 치지직의 코드가 변경될경우 작동하지 않는다는 치명적인 단점이 존재한다.
