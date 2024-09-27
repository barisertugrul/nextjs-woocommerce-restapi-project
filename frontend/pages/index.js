import { Inter } from "next/font/google";
import Header from "@/src/components/layouts/header";
import Footer from "@/src/components/layouts/footer";
import axios from "axios";
import { FOOTER_ENDPOINT, GET_PRODUCTS_ENDPOINT, HEADER_ENDPOINT } from "@/src/utils/constants/endpoints";
import Products from "@/src/components/products";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {

  const {header, footer, products} = props.data || {};
  return (
    <>
    <Header data={header} />
    <main
      className="container mx-auto px-4"
    >
      <Products products={products} />
    </main>
    <Footer data={footer} />
    </>
  );
}

export async function getStaticProps() {
  const headerData = await axios.get(HEADER_ENDPOINT);
  const footerData = await axios.get(FOOTER_ENDPOINT);
  const { data: productsData } = await axios.get(GET_PRODUCTS_ENDPOINT);

  const data = {
    header: headerData.data.header ?? {},
    footer: footerData.data.footer ?? {},
    products: productsData?.products ?? {},
  };
  
  return {
    props: {
      data: data || {},
    },
    revalidate: 1,
  };
}
