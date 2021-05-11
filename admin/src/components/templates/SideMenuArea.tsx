import React, { useEffect, useState } from "react";
import Link from "next/link";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { useRouter } from "next/router";

export type LinkInfo = {
  text: string;
  url: string;
};

const SideMenuArea: React.FC = (): JSX.Element => {
  const [navLinkInfos, setNavLinkInfos] = useState<
    { text: string; url: string }[]
  >([
    { text: "トップページ", url: "/" },
    { text: "ユーザー管理", url: "/users" },
  ]);
  const router = useRouter();

  return (
    <>
      <div className="pt-16">
        <List>
          {navLinkInfos.map((linkInfo) => (
            <Link href={linkInfo.url} key={linkInfo.text}>
              <div
                className={
                  router.pathname.includes(linkInfo.url) ? "bg-gray-300" : ""
                }
                key={linkInfo.text}
              >
                <ListItem button key={linkInfo.url}>
                  <ListItemText primary={linkInfo.text} />
                </ListItem>
              </div>
            </Link>
          ))}
        </List>
      </div>
    </>
  );
};

export default SideMenuArea;
