// fsolauncher
// \src\components\Download\index.tsx

import * as React from "react";
import IProperties from "./IProperties";

/**
 * Component that represents a single download.
 * @param param0 Props.
 */
const Download: React.SFC<IProperties> = ({
   item,
   location,
   details,
   progress,
   date
}) => (
   <div className={"Download"}>
      <h1>{item}</h1>
      <p>{location}</p>
      <p style={{ marginBottom: "20px" }}>
         {details} {progress < 100 ? "(" + progress + "%)" : ""}
      </p>
      <div
         style={{
            marginBottom: "20px",
            overflow: "hidden",
            width: "50%"
         }}
      >
         <div
            style={{
               background: "rgba(0,0,0,0.1)",
               borderRadius: "999px",
               overflow: "hidden"
            }}
         >
            <div
               className={"ProgressBar " + (progress == 100 ? "Stopped" : "")}
               style={{ width: progress + "%" }}
            />
         </div>
      </div>
      <div>
         <div style={{ float: "left", color: "rgba(0,0,0,0.3)" }}>
            {progress == 100 ? "Finished" : "Started"} {date}
         </div>
      </div>
   </div>
);

export default Download;
