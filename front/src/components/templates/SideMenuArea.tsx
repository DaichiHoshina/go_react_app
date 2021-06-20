import React, { useState } from "react";
import Link from "next/link";
import { List, ListItem, ListItemText } from "@material-ui/core";

export type LinkInfo = {
  text: string;
  url: string;
};

const SideMenuArea: React.FC = (): JSX.Element => {
  const [navLinkInfos] = useState<{ text: string; url: string }[]>([
    { text: "トップページ", url: "/" },
    { text: "ユーザー管理", url: "/users" },
  ]);

  return (
    <div className="pt-16">
      <List>
        {navLinkInfos.map((linkInfo) => (
          <Link href={linkInfo.url} key={linkInfo.text}>
            <div key={linkInfo.text}>
              <ListItem button key={linkInfo.url}>
                <ListItemText primary={linkInfo.text} />
              </ListItem>
            </div>
          </Link>
        ))}
      </List>
    </div>
  );
};

export default SideMenuArea;
