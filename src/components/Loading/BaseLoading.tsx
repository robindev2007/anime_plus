import Image from "next/image";
import React from "react";

function BaseLoading() {
  return (
    <div className="flex h-full flex-1 items-center justify-center">
      <div>
        <Image
          src={"/images/luffy-loading.gif"}
          height={500}
          width={500}
          alt="luffy-loading"
        />
      </div>
    </div>
  );
}

export default BaseLoading;
