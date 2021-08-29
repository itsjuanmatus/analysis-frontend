import { useRouter } from "next/router";

interface Props {
  name: string;
  icon: any;
  link: string;
}

export default function SidebarItem({ name, icon, link }: Props) {
  const router = useRouter();
  return (
    <a
      href={link}
      className={`flex items-center dark:text-white text-purple-dark hover:no-underline py-4 hover:text-blue-light ${
        router.pathname == `${link}`
          ? "visited:text-white bg-gray-blueish py-1.5 px-3 rounded-md hover:visited:text-white my-2"
          : ""
      }`}
    >
      <i className="p-1 px-3 font-bold">{icon}</i>
      <span className="break-normal w-36 font-semibold">{name}</span>
    </a>
  );
}
