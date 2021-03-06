/* @flow */
/* eslint-disable react/no-danger */
import React from "react";

import { assets } from "../config";

type Props = {
  root: string,
  sheet: React$Element<*>[],
};

const Html = (props: Props) => (
  <html lang="en">
    <head>
      <title>Relai</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link href={assets.vendor.css} rel="stylesheet" />
      <link href={assets.bundle.css} rel="stylesheet" />
      {props.sheet}
    </head>
    <body>
      <div id="react" dangerouslySetInnerHTML={{ __html: props.root }} />

      <script src={assets.vendor.js} />
      <script src={assets.bundle.js} />
    </body>
  </html>
);

export default Html;
