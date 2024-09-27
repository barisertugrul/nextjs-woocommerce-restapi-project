import DOMPurify from "isomorphic-dompurify";
import { isArray, isEmpty } from "lodash";
import Link from "next/link";
import Image from "../image";
import parse, { domToReact } from 'html-react-parser';

const Products = ({ products }) => {
  if (isEmpty(products) || !isArray(products)) {
    return (
      <div className="flex flex-wrap -mx-2 overflow-hidden">
        <div className="my-2 px-2 w-full overflow-hidden sm:w-1/2 md:w-1/3 xl:w-1/4">
          No products found
        </div>
      </div>
    );
  }

  console.log("LOG PRODUCTS", products);

  // const cleanHtmlContent = (htmlContent) => DOMPurify.sanitize(htmlContent);
  const cleanHtmlContent = (htmlContent) => {
    // screen-reader-text sınıfına sahip içerikleri çıkarıyoruz
    const htmlWithoutScreenReaderText = htmlContent.replace(/<span class="screen-reader-text">.*?<\/span>/g, '');
  
    // Kalan içeriği sanitize ediyoruz
    return DOMPurify.sanitize(htmlWithoutScreenReaderText);
  };

  return (
    <>
      {/* <div className="flex flex-wrap -mx-2 overflow-hidden">

            {products.length ? products.map(product => {
                const img = product?.images?.[0] ?? {};
                return (
                    <div key={product?.id} className="my-2 px-2 w-full overflow-hidden sm:w-1/2 md:w-1/3 xl:w-1/4">
                        <div className="bg-white rounded-lg shadow-lg h-auto">
                            
                            <div className="p-4">
                                <Link legacyBehavior href={product?.permalink.replace( process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL, process.env.NEXT_PUBLIC_FRONTEND_URL ) ?? '/' }>
                                    <a>
                                        <div className="flex relative overflow-hidden w-full h-[250px] items-center justify-center">
                                            <Image
                                                sourceUrl={img.src ?? ''}
                                                altText={img?.alt ?? ''}
                                                title= {product?.name ?? ''}
                                                width={250}
                                                height={250}
                                            />
                                        </div>
                                        <h3 className=" text-gray-800 hover:text-blue-500 font-bold uppercase">{product.name}</h3>
                                    </a>
                                </Link>
                                <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: cleanHtmlContent(product.price_html) }} />
                            </div>
                        </div>
                    </div>
            )}): null}
        
        </div> */}
      <div className="flex max-[550px]:flex-wrap -mx-2 overflow-hidden justify-center">
        {products.length
          ? products.map((product) => {
              const img = product?.images?.[0] ?? {};
              return (
                <div
                  key={product?.id}
                  className="relative max-[300px]:m-1 m-5 flex max-[400px]:w-full sm:w-1/2 md:w-1/3 xl:w-1/4 max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
                >
                    <Link legacyBehavior href={product?.permalink.replace( process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL, process.env.NEXT_PUBLIC_FRONTEND_URL ) ?? '/' }>
                  <a
                    className="relative mx-3 mt-3 flex h-60 max-[550px]:h-30 overflow-hidden rounded-xl"
                  >
                    <Image
                                                sourceUrl={img.src ?? ''}
                                                altText={img?.alt ?? ''}
                                                title= {product?.name ?? ''}
                                                width={300}
                                                height={300}
                                                className="md:shrink-0"
                                            />
                    {product?.sale_price && (product?.regular_price !== product?.price) && <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                      {100-((product?.sale_price/product?.regular_price)*100)}% OFF
                    </span>}
                  </a>
                  </Link>
                  <div className="mt-4 px-5 pb-5">
                  <Link legacyBehavior href={product?.permalink.replace( process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL, process.env.NEXT_PUBLIC_FRONTEND_URL ) ?? '/' }>
                  <a>
                      <h5 className="text-xl tracking-tight text-slate-900">
                        {product?.name}
                      </h5>
                    </a>
                    </Link>
                    <div className="mt-2 mb-5 flex items-center justify-between h-9">
                    <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: cleanHtmlContent(product.price_html) }} />
                      <div className="flex items-center">
                        <svg
                          aria-hidden="true"
                          className={product?.average_rating >= 1 ? "h-5 w-5 text-yellow-300" : "h-5 w-5 text-gray-300"}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          aria-hidden="true"
                          className={product?.average_rating >= 2 ? "h-5 w-5 text-yellow-300" : "h-5 w-5 text-gray-300"}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          aria-hidden="true"
                          className={product?.average_rating >= 3 ? "h-5 w-5 text-yellow-300" : "h-5 w-5 text-gray-300"}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          aria-hidden="true"
                          className={product?.average_rating >= 4 ? "h-5 w-5 text-yellow-300" : "h-5 w-5 text-gray-300"}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          aria-hidden="true"
                          className={product?.average_rating === 5 ? "h-5 w-5 text-yellow-300" : "h-5 w-5 text-gray-300"}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                          {product?.average_rating}
                        </span>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Add to cart
                    </a>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
};

export default Products;
