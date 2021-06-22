# Next.js 기본

## Navigate Between Pages

<br/>

### Code splitting & prefetching

<br/>
<br/>

Next.js 는 자동으로 `Code splitting`을 수행한다. 그렇기 때문에 각 페이지는 필요한 것만 로드하기 때문에 홈페이지가 렌더링 될 때 다른 페이지의 코드가 처음에 제공되지 않는다.

이렇게 되면 수백개의 페이지가 존재하더라도 빠르게 로드된다.

요청한 페이지의 코드만 로드하면 페이지가 분리되는데, 이 의미는 만약 특정 다른 페이지에서 오류가 발생하여도 나머지 프로그램은 계속 작동한다는 것이다.

또한 Next.js의 프로덕션 빌드에서 `Link` 컴포넌트가 브라우저의 뷰포트에 나타나면 백그라운드에서 연결된 페이지의 코드를 자동으로 `prefetching` 한다.

그래서 링크를 클릭하여 대상 페이지로 이동할 경우 이미 백그라운드에서 `prefetching` 했기 때문에 페이지 전환이 즉시 이루어진다.

<br/>
<br/>

### 요약

Next.js는 Code splitting, client-navigation, prefetching을 통하여 어플리케이션을 자동으로 최적화하여 최상의 성능을 제공한다. (`production` 에서)

단지 `pages` 경로 아래 파일로 route를 만들고 기본으로 제공되는 `Link` 컴포넌트를 사용하면 별도의 라우팅 라이브러리 없이 라우팅을 사용할 수 있다.

Link 컴포넌트 관련 내용은 [이곳](https://nextjs.org/docs/api-reference/next/link) 에서 확인하길 바란다.

> 만약 Next.js 앱 외부 페이지에 연결해야 하는 경우 `<Link>` 태그 없이 `<a>` 태그를 사용하면 된다.

<br/>
<br/>

---

## Assets, Metadata, and CSS

<br/>

Next.js는 `CSS` 및 `Sass`를 기본적으로 지원한다. 예제코드에서는 CSS를 사용해보도록 하겠다.

<br/>
<br/>

### Assets

<br/>
<br/>

Next.js는 프로젝트 최 상위 경로에서 `public` 경로에 이미지와 같은 정적 자원들을 제공할 수 있다. `public`경로 내부에 있는 파일들은 프로젝트 루트 경로에서 참조할 수 있다.

또한 `robots.txt`나 `Google Site Verification` 같은 어떤 정적 자원들에 유용하다. 자세한 내용은 [이곳](https://nextjs.org/docs/basic-features/static-file-serving)에서 확인하길 바란다.

<br/>
<br/>

### 프로필 사진 다운로드

<br/>
<br/>

먼저 프로필 사진을 검색해 보겠다.

1. `.jpg` 형식의 프로필 사진을 다운로드 한다.
2. `public` 경로에 `images` 디렉토리를 생성한다.
3. 다운로드한 사진을 `public/images` 경로에 `profile.jpg`로 저장한다.

<br/>
<br/>

### Unoptimized Image

<br/>
<br/>

일반 HTML을 사용할 경우 아래와 같이 프로필 사진을 추가할 것이다.

```html
<img src="/images/profile.jpg" alt="Your Name" />
```

그러나 이 방식은 아래의 과정을 수동으로 처리해 주어야 한다.

1. 스크린 크기별 반응형 처리
2. 서드파티 라이브러리나 툴을 사용하여 이미지 최적화
3. 이미지가 뷰포트에 들어올 때만 로드

하지만 Next.js에서는 `Image` 컴포넌트를 사용하여 간단하게 처리할 수 있다.

<br/>
<br/>

### Image Component and Image Optimization

<br/>
<br/>

`next/image`는 최신 웹을 위해 개선된 HTML의 `<img>` 태그의 확장이다.

브라우저가 `WebP`와 같은 효율적인 이미지 포맷을 지원할 경우 Next.js는 기본적으로 이미지의 최적화를 지원한다. 이렇게 하면 뷰포트가 더 작은 장치로 큰 이미지가 전송되는 것을 방지할 수 있다.

또한 Next.js가 향후 이미지 포맷을 자동으로 선택하고 해당 포맷을 지원하는 브라우저에 제공할 수 있다.

자동 이미지 최적화는 CMS와 같은 외부 데이터 소스에서 호스팅 되는 경우도 포함하여 모든 이미지 소스에서 작동한다.

<br/>
<br/>

### Using the Image Component

<br/>
<br/>

빌드시에 이미지를 최적화 하는 대신에 Next.js는 사용자가 이미지를 요청할 때 최적화 한다. 그렇기 때문에 `static site generators`와 `static-only solutions`과 달리 빌드 시간은 이미지 10개를 전송하든 천만개 이미지를 전송하든 증가하지 않는다.

이미지는 기본으로 `lazy loading`된다.

<br/>
<br/>

### Metadata

<br/>
<br/>

그렇다면 `<title>` 태그와 같은 메타데이터를 수정하려면 어떻게 해야 할까?

```html
<head>
  <title>Create Next App</title>
  <link rel="icon" href="/favicon.ico" />
</head>
```

위 코드를 보면 소문자 `<head>`가 아니라 Next.js에 내장된 `<Head>`를 사용하여 페이지의 `<head>`를 수정할 수 있다.

컴포넌트에서 사용하려면 `next/head` 모듈에서 `Head` 컴포넌트를 import 하여 사용한다.

```javascript
import Link from 'next/link';
```

<br/>
<br/>

### CSS Styling

<br/>
<br/>

기본으로 생성된 index.js코드를 보면 아래와 같은 코드가 있을 것이다. 이것은 CSS-in-JS 라이브러리중 하나인 `styled-jsx`를 사용한 것이다. `styled-components`처럼 리액트 컴포넌트에서 CSS를 작성할 수 있다.

Next.js에서는 기본적으로 내장되어 있고 개발자가 원하는 다른 CSS-in-JS 라이브러리를 사용할 수도 있다.

```javascript
<style jsx>{`
...
`}</style>
```

또한 기본적으로 `css`와 `scss`파일을 import 할 수 있게 지원하고, `Tailwind CSS`같은 인기있는 CSS 라이브러리를 사용하는 것도 지원된다.

<br/>
<br/>

### Layout Component

<br/>
<br/>

먼저 모든 페이지에서 공유할 레이아웃 컴포넌트를 아래와 같이 작성해보자.

1. 루트디렉토리에 `components` 폴더를 생성한다.
2. 그 안에 `layout.jsx` 라는 파일을 아래와 같이 생성한다.

```javascript
const Layout = ({ children }) => {
  return <div>{children}</div>;
};

export default Layout;
```

3. 그다음 이 레이아웃을 사용할 컴포넌트에서 import 후 가장 바깥쪽에서 감싸준다.

```javascript
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';

const FirstPost = () => {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href='/'>
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  );
};

export default FirstPost;
```

4. Layout 컴포넌트에 스타일을 추가하기위해 CSS 모듈을 사용해보자. 해당 파일은 `components/layout.module.css` 여기에 생성한다.

> CSS 모듈을 사용하기 위해선 파일명이 `.module.css`로 끝나도록 해야 한다.

```css
.container {
  max-width: 36rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
}
```

5. 해당 스타일은 아래와 같이 사용한다.

```javascript
import styles from './layout.module.css';

const Layout = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Layout;
```

6. 아래 사진과 같이 고유한 클래스 이름을 자동으로 생성해주기 때문에 다른 모듈에서 같은 이름을 사용하더라도 충돌하지 않는다. 이것이 CSS 모듈이 해주는 일이다. 또한 `Code splitting` 기능은 CSS 모듈에서도 작동하기 때문에 각 페이지에 대해 최소한의 CSS가 로드되고 그 결과 번들 크기가 작아진다.

![image](https://user-images.githubusercontent.com/52060742/122906245-eb360400-d38c-11eb-8f6e-0eff04b9cc43.png)

<br/>
<br/>

CSS 모듈은 컴포넌트 레벨의 스타일을 작성하는 데에 유용하다. 하지만! 모든 페이지에 공통으로 쓰일 CSS(global style)를 로드하는것 또한 Next.js에서 지원한다.

먼저 global style을 불러오기 위해 `pages/_app.js` 파일을 아래와 같이 생성해 준다.

```javascript
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

이 App 컴포넌트는 다른 페이지에서 공통으로 쓰일 최상위 컴포넌트이다. 예를 들어 App 컴포넌트를 사용하여 페이지간 이동할 때 상태를 유지할 수 있다.

> `pages/_app.js`를 추가하면 개발서버를 다시 시작해야 한다.

<br/>
<br/>

### Adding Global CSS

<br/>
<br/>

**Next.js에서는 `pages/_app.js`에서만 global style을 import할 수 있고** 다른 곳에서는 할 수 없다. 그 이유는 global style이 페이지의 모든 요소에 영향을 주기 때문이다.

global CSS 파일은 개발자가 원하는 곳에 위치시키고, 이름도 원하는 이름을 사용할 수 있다.

프로젝트 루트 경로에 `styles` 폴더를 생성하고 그 안에 `global.css`를 아래와 같이 작성해보자.

```css
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
    Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  line-height: 1.6;
  font-size: 18px;
}

* {
  box-sizing: border-box;
}

a {
  color: #0070f3;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  max-width: 100%;
  display: block;
}
```

그 후 `pages/_app.js`파일에서 아래와 같이 import 하면 바로 적용된다.

```javascript
import '../styles/global.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

<br/>
<br/>

### Polishing Layout
