import {
  useAsyncValue,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import { useEffect } from "react";

import LoadingWrapper from "../../components/LoadingWrapper";
import ScrollToTop from "../../components/ScrollToTop";
import SearchBar from "../../components/SearchBar";
import Icons from "../../components/mdx/Icons";

const components = {
  a: (props: any) => {
    switch (props.title) {
      case "external":
        return <a href={props.href}>{props.children}</a>;
      default:
        return (
          <Link replace={props?.title === "id"} to={props.href}>
            {props.children}
          </Link>
        );
    }
  },
  ImgCenter: (props: { src: string; alt: string }) => (
    <div className="flex justify-center">
      <img src={props.src} className="rounded" alt={props.alt} />
    </div>
  ),
  DoubleCenter: (props: {
    srcA: string;
    srcB: string;
    altA: string;
    altB: string;
    textA: string;
    textB: string;
  }) => (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center">
        <div className="flex justify-center">
          <img className="rounded" src={props.srcA} alt={props.altA} />
        </div>
        <p className="text-sm italic">{props.textA}</p>
      </div>
      <div className='"flex flex-col items-center justify-center'>
        <div className="flex justify-center">
          <img className="rounded" src={props.srcB} alt={props.altB} />
        </div>
        <p className="text-sm italic">{props.textB}</p>
      </div>
    </div>
  ),
  TextCenter: (props: { text: string; children?: any }) => (
    <div className="flex justify-center text-sm italic">
      <span className="w-1/2 text-center">
        {props?.text ?? props?.children}
      </span>
    </div>
  ),
  TextImgDec: (props: any) => (
    <div className="flex gap-2">
      <p>{props.children}</p>
      <div>
        <div className="flex justify-center">
          <img style={{ marginBottom: 0 }} src={props.src} alt={props.alt} />
        </div>
        <p className="text-sm italic">{props.text}</p>
      </div>
    </div>
  ),
  ImgText: (props: any) => (
    <div className="flex w-full justify-center">
      <div className="flex items-center gap-8">
        <div>
          <img
            className="object-cover object-center"
            alt={props.src}
            src={props.src}
          />
        </div>
        <div>
          <p className="text-sm italic">{props.text}</p>
        </div>
      </div>
    </div>
  ),
  OffsetLeft: (props: any) => <div className="ml-8">{props.children}</div>,
  Header: (props: { title: string; version: string; icon?: any }) => (
    <div data-version={props?.version ?? "1.4.4"}>
      <h1 className="uppercase" style={{ marginBottom: "1rem" }}>
        {props.title}
        {props?.icon && <span className="lowercase"> [{props.icon}]</span>}
      </h1>
      <hr style={{ margin: "0" }} />
      <p className="pt-2 text-sm">
        Version:{" "}
        <span className="font-eurostile-demi text-gray-500">
          {props?.version ?? "1.4.4"}
        </span>
      </p>
    </div>
  ),
  ...Icons,
};

export default LoadingWrapper(Article);

function Article() {
  const { default: Item } = useAsyncValue() as {
    default: (props: any) => React.ReactElement;
  };
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash.length === 0) return;
    let elem = document.getElementById(location.hash.slice(1));
    if (elem)
      window.scrollTo({ top: elem.offsetTop - 100, behavior: "smooth" });
  }, [location]);

  return (
    <div className="flex-grow flex-col bg-slate-800">
      <header className="sticky top-0 z-10 flex flex-col items-center justify-center gap-2 bg-slate-900 pb-4 pt-4">
        <div className="w-11/12 md:w-8/12 lg:w-4/12">
          <SearchBar data={[]} />
        </div>
      </header>
      <main className="mx-3 mb-10 flex flex-col items-center justify-center pb-5 pt-5">
        <div className="container prose prose-invert md:prose-lg prose-headings:font-bank prose-p:font-eurostile-demi prose-em:font-eurostile prose-em:text-zinc-500 prose-ol:prose-ol:list-alpha prose-ul:prose-ul:list-circle">
          <div className="my-5">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="flex items-center gap-2 rounded bg-blue-400 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg"
            >
              <HiArrowLeft /> Back
            </button>
          </div>
          <Item components={components} />
        </div>
      </main>
      <ScrollToTop />
    </div>
  );
}
