# 치직치지직 src

## 소개

- components

  > 각 기능들은 각 파일로 분리되어 있습니다. 자세한 구현 방법은 components 폴더를 참고해주세요.

- content_script.tsx

  > 치지직 window안에서 실행되는 파일입니다. `여기에 적용할 기능을 추가하세요` 라는 주석이 있는 곳에 기능을 추가하세요.

- options.tsx

  > 확장 프로그램 설정 페이지입니다.

- injecter.ts

  > 치지직 window에 스크립트를 주입하는 파일입니다.
  > 또한 치지직 window에 주입된 스크립트와 백그라운드 스크립트간의 통신을 담당합니다.

# 정적 데이터 불러오기

`*.static.txt`, `*.static.css`, `*.static.html`, `*.static.data`로 구성된 파일들을 import 하여 string 형태로 사용하실 수 있습니다.
`src/static` 폴더에 배치하는 것을 권장합니다.

# Alias

`@`는 root 로써, `#`은 shortcut으로써 사용합니다.

- `@config` : `src/config.ts`
- `@log` : `src/log.ts`
- `@/*` : `src/*"`
- `#c/*` : `src/components/*`
- `#u/*` : `src/utils/*`
- `#s/*` : `src/static/*`
