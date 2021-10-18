import React from "react";
import Header from "next/head";
import { NextPage } from "next";
export interface HeaderControllerProps {
  title?: string;
  embed?: { hexColor?: string; image?: string };
  owner?: string;
  additionalKeywords?: string[];
  description?: string;
}

export const HeaderController: NextPage<HeaderControllerProps> = ({
  title,
  description = "PutForm",
  owner,
  additionalKeywords = [],
  embed,
}) => {
  return (
    <Header>
      {title ? <title>{title} | PutForm</title> : <title>PutForm</title>}
      <meta name="description" content={description} />
      {owner ? <meta name="author" content={owner} /> : ""}
      <meta
        name="keywords"
        content={`PutForm, ${additionalKeywords?.map((k) => `, ${k}`)}`}
      />
      <meta name="theme-color" content={embed?.hexColor || "#EFE7DD"} />
      {embed ? (
        <>
          <meta name="og:title" content={title || "PutForm"} />
          <meta
            name="og:type"
            content={owner ? "music.radio_station" : "website"}
          />
          <meta name="og:description" content={description} />
          <meta name="og:site_name" content="PutForm" />
        </>
      ) : (
        ""
      )}
    </Header>
  );
};