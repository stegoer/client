import dynamic from "next/dynamic";

const DynamicRTE = dynamic(() => import(`@mantine/rte`), {
  // Disable during server side rendering
  ssr: false,

  // eslint-disable-next-line unicorn/no-null
  loading: () => null,
});

export default DynamicRTE;
