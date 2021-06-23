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

### Styling Tips

<br/>
<br/>

스타일링 할때 도움되는 몇가지 팁!

1. `classnames` 라이브러리 사용

   - `classnames`은 클래스 이름을 쉽게 변경할 수 있는 간단한 라이브러리이다.
   - `$ npm i classnames` 명령어로 설치할 수 있다.
   - 자세한 [classnames 사용방법](https://github.com/JedWatson/classnames)
   - 만약 성공이나 오류 타입만을 허용하는 Alert 컴포넌트를 생성한다고 해보자.
   - 성공일 경우 `녹색`, 오류일 경우 `적색`으로 지정할 것이다.

```css
.success {
  color: green;
}
.error {
  color: red;
}
```

```javascript
import styles from './alert.module.css';
import cn from 'classnames';

export default function Alert({ children, type }) {
  return (
    <div
      className={cn({
        [styles.success]: type === 'success',
        [styles.error]: type === 'error',
      })}
    >
      {children}
    </div>
  );
}
```

2. PostCSS config 커스터마이징

   - Next.js는 config없이 바로 사용할 수 있는 PostCSS를 사용하여 CSS를 컴파일 한다.
   - 커스터마이징 하려면 루트디렉토리에 `postcss.config.js` 라는 설정파일을 만들면 된다. `Tailwind CSS`같은 라이브러리를 사용하는 경우 유용하다.

<br/>

3. `Tailwind CSS`

   - Next.js에서 Tailwind CSS를 사용하기 위해선 Next.js의 기본 동작과 일치하도록 `postcss-preset-env`와 `postcss-flexbugs-fixes`를 설치하는 것이 좋다.
   - `$ npm i tailwindcss postcss-preset-env postcss-flexbugs-fixes` 명령어로 해당 라이브러리들을 설치하자.
   - `postcss.config.js` 파일은 아래와 같이 작성하자.

   ```javascript
   module.exports = {
     plugins: [
       'tailwindcss',
       'postcss-flexbugs-fixes',
       [
         'postcss-preset-env',
         {
           autoprefixer: {
             flexbox: 'no-2009',
           },
           stage: 3,
           features: {
             'custom-properties': false,
           },
         },
       ],
     ],
   };
   ```

   - 사용하지 않는 CSS를 tailwind가 무시하도록 `purge`옵션을 아래와 같이 `tailwind.config.js` 파일에 작성한다.

   ```javascript
   module.exports = {
     purge: [
       // Use *.tsx if using TypeScript
       './pages/**/*.js',
       './components/**/*.js',
     ],
     // ...
   };
   ```

<br/>

4. `Sass` 사용
   - Next.js는 기본적으로 `.scss` `.sass` 파일을 import 하여 사용할 수 있다.
   - 기본으로 내장되어 있는 `Sass`를 사용하려면 먼저 `$ npm i sass` 로 설치 해야한다.
   - CSS 모듈과 마찬가지로 파일 명은 `.module.scss` 또는 `.module.sass`로 사용하면 된다.

<br/>
<br/>

---

## Pre-rendering and Data Fetching

여기서는 외부 블로그 데이터를 앱으로 가져오는 방법에 대해 알아볼 것이다. 먼저 블로그 컨텐츠를 파일 시스템에 저장할 것이고, 컨텐츠가 다른 곳 (DB, Headless CMS)에 저장되면 작동한다.

<br/>

### Pre-rendering

<br/>
<br/>

데이터 가져오기에 대해 알아보기 전에 Next.js에서 가장 중요한 개념중 하나인 `Pre-rendering`에 대해 알아보자.

Next.js는 기본적으로 모든 페이지를 미리 렌더링 한다. 즉, 클라이언트 측인 Javascript에서 모든 작업을 하는 대신 각 페이지에 대해 미리 HTML을 생성한다. 그래서 Pre-rendering은 더 나은 성능과 SEO에서 이점을 얻을 수 있다.

이렇게 생성된 HTML은 해당 페이지에 필요한 최소한의 Javascript 코드와 연결된다. 브라우저에서 페이지 로드가 완료되면 Javascript 코드가 실행된다. 이 과정을 `hydration (서버사이드 렌더링으로 만들어진 정적인 HTML과 State에 동적인 상태를 변화 시키는 행위)` 라고 한다.

<br/>
<br/>

### Check That Pre-rendering Is Happening

<br/>
<br/>

다음의 단계를 통해 `Pre-rendering`이 발생하는지 확인할 수 있다.

1. 브라우저에서 자바스크립트를 비활성화 한다. [이곳](https://www.itworld.co.kr/news/108684)에서 방법을 확인할 수 있다.
2. [이 페이지](https://next-learn-starter.vercel.app/)에 접속해본다.

그럼 어플리케이션이 자바스크립트 없이 렌더링 된 것을 볼수있다. 그 이유는 Next.js가 어플리케이션을 정적 HTML로 사전 렌더링 하여 자바스크립트를 실행하지 않고도 UI를 볼 수 있기 때문이다.

Next.js가 없는 일반 React.js 어플리케이션의 경우 사전 렌더링이 없으므로 자바스크립트를 사용중지하면 볼 수 없다.

<br/>
<br/>

### Two Forms of Pre-rendering

<br/>
<br/>

Next.js는 `Static Generation`와 `Server-side Rendering` 두가지 형태의 사전렌더링이 있다. 이 둘의 차이점은 페이지에 대한 HTML을 생성할 때이다.

- Static Generation : 빌드할 때 HTML을 생성하는 사전 렌더링 방법이다. 그 다음 미리 렌더링 된 HTML이 각 요청에서 재사용 된다.

<br/>

![static-generation](https://nextjs.org/static/images/learn/data-fetching/static-generation.png)

<br/>
<br/>

- Server-side Rendering : 각 요청에 대해 HTML을 생성하는 방법이다.

<br/>

![server-side-rendering](https://nextjs.org/static/images/learn/data-fetching/server-side-rendering.png)

개발 모드 (npm run dev, yarn dev로 실행)에서 모든 페이지는 Static Generation를 사용하는 페이지의 경우에도 각 요청에 대해 사전 렌더링 된다.

<br/>
<br/>

### Per-page Basis

<br/>
<br/>

중요한 것은 Next.js를 사용하면 각 페이지에 사용할 사전 렌더링 양식을 선택할 수 있다.
대부분의 페이지에는 Static Generation을 사용하고 다른 페이지에는 Server-side Rendering을 사용하여 `하이브리드 ` Next.js 어플리케이션을 만들 수 있다.

![per-page-basis](https://nextjs.org/static/images/learn/data-fetching/per-page-basis.png)

<br/>
<br/>

### When to Use Static Generation v.s. Server-side Rendering

<br/>
<br/>

가능한 Static Generation 방식을 사용하는 것이 좋다. 가능한 경우 페이지를 한번 빌드하고 CDN에서 제공할 수 있기 때문에 서버가 모든 요청에 대해 페이지를 렌더링하는 것보다 훨씬 빠르다.

다음과 같이 다양한 유형의 페이지에 Static Generation를 사용할 수 있다.

- 마케팅 페이지
- 블로그
- 이커머스 상품 목록
- 공식문서

반면 사용자의 요청보다 먼저 페이지를 렌더링할 수 없으면 이 방법은 좋지 않다. 페이지에 자주 업데이트 되는 데이터가 표시되고 요청 시 마다 페이지 내용이 변경될 가능성이 높다면 `Server-side Rendering`을 사용해야 한다.

서버사이드렌더링은 조금 더 느리지만 미리 렌더링 된 페이지는 항상 최신의 상태를 가지고 있다. 또는 사전 렌더링을 건너뛰고 클라이언트 측의 자바스크립트를 사용하여 자주 업데이트 되는 데이터를 채울 수 있다.

> 이 튜토리얼에서는 `Static Generation`에 초점을 맞추고 있다.

<br/>
<br/>

### Static Generation with and without Data

<br/>
<br/>

정적 생성은 데이터를 포함하거나 포함하지 않고 진행할 수 있다. 지금까지 만든 페이지들은 외부 데이터를 가져올 필요가없었다. 이러한 페이지는 어플리케이션이 프로덕션용으로 빌드 될 때 자동으로 생성된다.

그러나 일부 페이지의 경우 외부 데이터(파일 시스템 접근, 외부 API 사용, DB) 를 먼저 가져오지 않으면 HTML을 렌더링하지 못할 수도 있다. Next.js는 이 경우 데이터를 사용한 정적 생성을 지원한다.

![with-data](https://nextjs.org/static/images/learn/data-fetching/static-generation-with-data.png)

<br/>
<br/>

### Static Generation with Data using `getStaticProps`

<br/>
<br/>

`getStaticProps`는 동적으로 데이터를 가져와 이 값을 페이지에 전달해 줄 수 있다.

- getStaticProps는 프로덕션 빌드시 실행된다.
- 함수 내에서 외부 데이터를 가져와 페이지에 props로 전달할 수 있다.
- 개발 모드에서는 각 요청에서 실행된다.

```javascript
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```

기본적으로 `getStaticProps`를 사용하면 Next.js에 다음과 같이 말할 수 있다.

> 이 페이지는 데이터 종속성이 있으니 빌드시 이 페이지를 사전 렌더링 할 때는 먼저 해결해야 한다.

<br/>
<br/>

### Blog Data

<br/>
<br/>

먼저 파일 시스템을 사용하여 어플리케이션에 블로그 데이터를 추가해보겠다. 블로그 게시물은 마크다운 파일이 된다.

- 먼저 루트디렉토리에 `posts`라는 폴더를 생성한다. (pages/posts 와는 별개임)
- 해당 폴더안에 `pre-rendering.md`와 `ssg-ssr.md` 두 파일을 생성한다.

<br/>

`pre-rendering.md`

```text
---
title: 'Two Forms of Pre-rendering'
date: '2020-01-01'
---

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

- **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.

Importantly, Next.js lets you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.
```

`ssg-ssr.md`

```text
---
title: 'When to Use Static Generation v.s. Server-side Rendering'
date: '2020-01-02'
---

We recommend using **Static Generation** (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

You can use Static Generation for many types of pages, including:

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

You should ask yourself: "Can I pre-render this page **ahead** of a user's request?" If the answer is yes, then you should choose Static Generation.

On the other hand, Static Generation is **not** a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

In that case, you can use **Server-Side Rendering**. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate data.
```

> 각 마크다운 파일 맨 위에 제목과 날짜가 포함된 메타데이터 섹션이 있는것을 알 수 있다. 이 것을 `YAML Front Matter`라고 하며 `gray-matter`라는 라이브러리를 사용하여 구문 분석을 할 수 있다.

<br/>
<br/>

### Parsing the Blog Data on getStaticProps

<br/>
<br/>

이제 이 데이터를 사용하여 `pages/index.js` 를 업데이트 해보도록 하겠다.
사전 렌더링에서 이를 수행하려면 `getStaticProps`를 구현해야 한다.

![get-static-props](https://nextjs.org/static/images/learn/data-fetching/index-page.png)

먼저 마크다운에서 메타 데이터를 파싱할 수 있는 `gray-matter` 라이브러리를 설치한다.

`$ npm i gray-matter `

그 다음 파일 시스템에서 데이터를 가져오기 위한 간단한 라이브러리를 생성한다.
루트 디렉토리에 `lib` 폴더 생성 후 `posts.js`파일을 아래와 같이 작성한다.

```javascript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}
```

이제 `getSortedPostsData`를 import 하고 `pages/index.js`에서 `getStaticProps`를 호출해야 한다.

`pages/index.js`을 열고 아래와 코드를 추가해주자.

```javascript
...

import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

...
```

`getStaticProps`의 props 객체 내에서 `allPostsData`를 반환하면 블로그 게시물이 `Home` 컴포넌트의 prop으로 전달된다. 데이터를 확인하기 위해 아래와 같이 변경해보자

```javascript
export default function Home({ allPostsData }) {
  return (
    <Layout home>
      {/* Keep the existing code here */}

      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
```

그럼 사진과 같이 해당 내용을 확인할 수 있을 것이다.

![result](https://nextjs.org/static/images/learn/data-fetching/blog-data.png)

![get-static-props-finish](https://nextjs.org/static/images/learn/data-fetching/index-page.png)

<br/>
<br/>

### Fetch External API or Query Database

<br/>
<br/>

`lib/posts.js`에 파일 시스템에서 데이터를 가져오는 `getSortedPostsData`를 구현했다. 하지만 외부 API에서도 데이터를 가져올 수 있다.

```javascript
export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('..');
  return res.json();
}
```

> Next.js는 클라이언트와 서버에서 fetch()를 폴리필 하기 때문에 가져올 필요 없다.

아래와 같이 직접 데이터베이스에서 가져올 수도 있다.

```javascript
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from a database
  return databaseClient.query('SELECT posts...')
}
```

이는 `getStaticProps`가 서버사이드에서만 실행되기 때문이다. 클라이언트 측에서는 실행되지 않고 브라우저용 자바스크립트 번들에도 포함되지 않는다. 이 의미는 브라우저로 보내지 않고도 직접 데이터베이스 쿼리와 같은 코드를 작성할 수 있다는 뜻이다.

<br/>
<br/>

### Development vs. Production

<br/>
<br/>

- `개발 모드`에서 `getStaticProps`는 모든 요청에 대해 실행된다.

- `운영 모드`에서 `getStaticProps`는 빌드시 실행된다. 하지만 이 동작은 `getStaticPaths`에서 반환된 대체키를 사용하여 향상 될 수 있다.

때문에 빌드시 실행되도록 되어 있으므로 쿼리의 매개변수나 HTTP 헤더와 같이 요청시에만 사용할 수 있는 데이터를 사용할 수 없다.

- `getStaticProps`는 `page`에서만 export될 수 있다. 페이지가 아닌 파일에서는 export 할 수 없다.

<br/>
<br/>

### What If I Need to Fetch Data at Request Time?

<br/>
<br/>

만약 요청시 데이터를 가져와야하는 경우엔 어떻게 해야 할까?
사용자의 요청에 앞서 페이지를 미리 렌더링 할 수 없는 경우 정적 생성은 좋은 방법이 아니다. 이 경우 서버사이드 렌더링을 시도하거나 사전 렌더링을 건너 뛸 수 있다.

빌드시가 아니라 요청시 데이터를 가져와야 하는 경우 서버사이드 렌더링을 시도할 수 있다.

![server-side-rendering](https://nextjs.org/static/images/learn/data-fetching/server-side-rendering-with-data.png)

서버사이드 렌더링을 사용하려면 페이지에서 `getStaticProps` 대신 `getServerSideProps`를 export 해야 한다.

```javascript
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}
```

`getServerSideProps`는 요청 시 호출되므로 해당 매개변수 (context)에 요청 관련 매개변수가 포함된다.

<br/>
<br/>

### Client-side Rendering

<br/>
<br/>

사전 렌더링할 필요가 없는 경우 클라이언트 사이드 렌더링을 사용할 수 있다.

![client-side-rendering](https://nextjs.org/static/images/learn/data-fetching/client-side-rendering.png)

보통 사용자 대시보드 페이지에 적합하다. 그 이유는 대시보드 페이지는 비공개 사용자 별 페이지 이므로 SEO는 관련이 없기 때문이다.

Next.js 팀은 데이터를 가져오기 위해 `SWR` 이라는 React 훅을 만들었다. 이 는 클라이언트 측에서 데이터를 가져 오는 경우 `적극 권장`하는 방법이다.

캐싱, 재검증, 포커스 추적, refetching 등등 여기서 자세한 내용은 다루지는 않지만 아래와 같이 사용한다.

```javascript
import useSWR from 'swr';

function Profile() {
  const { data, error } = useSWR('/api/user', fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
```

[SWR 관련 문서](https://swr.vercel.app/)에서 자세한 내용을 확인하길 바란다.
